const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

fsPromises.readdir(path.join(__dirname, 'secret-folder'), 
{withFileTypes: true}).then(parametrs => {
   parametrs.forEach(param => {
      if(!param.isDirectory()) {
         const pathToFile = path.join(__dirname, 'secret-folder', param.name);
         const nameFile = path.basename(pathToFile);
         const extenFile = path.extname(pathToFile);
         fsPromises.stat(pathToFile).then(par => {
            console.log(`${nameFile.replace(extenFile, '')} : ${extenFile.replace('.', '')} : ${Number(par.size / 1024).toFixed(3)} KB`);
            
         })
      }
   })
})