
const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const stileBundle = path.join(projectDist, 'style.css');
const newHtml = path.join(projectDist, 'index.html');
const assetsFolder = path.join(__dirname, 'assets');
const components = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');

fs.promises.mkdir(projectDist, { recursive: true });

async function createStyles() {
   const stylesFolfer = path.join(__dirname, 'styles');
 
     await fs.promises.writeFile(stileBundle, '');
     let files = await fs.promises.readdir(stylesFolfer, { withFileTypes: true });
 
     files.forEach(async file => {
       if (file.isFile()) {
         let filesName = path.join(stylesFolfer, file.name);
         let ext = path.extname(filesName);
         if (ext === '.css') {
           let result = await fs.promises.readFile(filesName, 'utf8');
           await fs.promises.appendFile(stileBundle, result);
         }
       }
     });
  
 }

 createStyles();



 async function copyFolder(src, target) {
  
     let srcFolderIt = await fs.promises.readdir(src, { withFileTypes: true });
     srcFolderIt.forEach(async item => {
       if (item.isDirectory()) {
         let srcChild = path.join(src, item.name);
         let targetChil = path.join(target, item.name);
         await fs.promises.mkdir(targetChil, { recursive: true });
         await copyFolder(srcChild, targetChil)
       }
       else if (item.isFile) {
         let srcFile = path.join(src, item.name);
         let targetF = path.join(target, item.name);
         await fs.promises.copyFile(srcFile, targetF);
       }
     });
 
 }

 async function newAssets() {

   const assetsNew = path.join(projectDist, 'assets');
 
   copyFolder(assetsFolder, assetsNew);
 }

 newAssets();

 async function createHtml() {
 
   let tempConnt = await content(templatePath);
 
   await fs.promises.writeFile(newHtml, '');
   await fs.promises.copyFile(templatePath, newHtml);
 
   let filesHtml = await fs.promises.readdir(components, { withFileTypes: true });
 
   for (f of filesHtml) {
     let ext = path.extname(f.name);
     if (ext === '.html') {
       let nameComp = path.parse(f.name).name;
       let pathComp = path.join(components, f.name);
 
       let cnt = await content(pathComp);
       let regExp = `{{${nameComp}}}`;
       tempConnt = tempConnt.replace(regExp, cnt);
 
     }
   }
   await fs.promises.writeFile(newHtml, tempConnt);
 }

 createHtml();

 async function content(pathToFile) {
   let cont = await fs.promises.readFile(pathToFile, 'utf8');
   return cont;
 }

