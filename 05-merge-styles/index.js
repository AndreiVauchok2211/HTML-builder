const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const pathToStules = path.join(__dirname, 'styles');
const pathToBundle = path.join(__dirname, 'project-dist/bundle.css');
const stream = fs.createWriteStream(pathToBundle);

fsPromises.readdir(pathToStules).then((files) => {
for(let file of files) {
   const pathToFile = path.join(pathToStules, file);
   const nameFile = path.basename(pathToFile);
   const fileExtname = path.extname(nameFile);
   
   console.log(fileExtname);
   if(fileExtname === '.css') {
   
const readerFiles = fs.createReadStream(path.join(pathToStules, nameFile));
readerFiles.on('data', data => {
   stream.write(data);
})
   }
}
})