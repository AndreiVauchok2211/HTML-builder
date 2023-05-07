const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;


const createFile = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(createFile);
stdout.write('Введите текст\n');
stdin.on('data', data => {
   if(data.toString().trim() === 'exit') {
   
   outFn();
   } else {
      stream.write(data);
   }
});

process.on( 'SIGINT', outFn);

function outFn() {
   stdout.write('\nВы покинули нас, удачи)');
   exit();
}