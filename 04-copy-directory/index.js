const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const { stdout } = process;

 (async function copyDir() {
   fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true, }, err => {
      if(err) {
         throw new Error ('problem') 
      } else {
         console.log('folder created');
      }
   } )

  await fsPromises.readdir(path.join(__dirname, 'files-copy')).then( async files =>  {
      for(let file of files) {
      await  fsPromises.rm(path.join(__dirname, 'files-copy', file), {force: true, recursive: true})
      }})
  
   fsPromises.readdir(path.join(__dirname, 'files')).then( files =>  {
      for(let file of files) {
         const pathToFile = path.join(__dirname, 'files', file);
         fsPromises.copyFile(pathToFile, path.join(__dirname, 'files-copy', file));
         stdout.write(`${file}\n`);
      }
    
   } )
})();
