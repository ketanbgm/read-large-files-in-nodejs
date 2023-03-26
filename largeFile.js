const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const splitFile = require('split-file');

app.get('/', (req, res) => {
const readStream = fs.createReadStream('10mb.txt');
  readStream.on('data', chunk => {
    // process the data chunk
    console.log("chunk",chunk.toString());
  });


  readStream.on('end', () => {
    console.log('file has been read completely');
  });

})

app.get('/splitFile', (req, res) => {
splitFile.splitFileBySize('10mb.txt', 1024 * 1024 * 1) // 1MB
    .then((chunks) => {
    chunks.forEach((chunk, idx) => {
      console.log(`Chunk ${idx + 1}:`);
      console.log(chunk);
      //perforn the readoperation
      fs.unlink(chunk, (err) => {
        if (err) throw err;
        console.log(`Chunk ${idx + 1} deleted`);
      });
    });
  })

})

app.get('/asyncAwait',async (req, res) => {
try {
        const data = await fs.promises.readFile('10mb.txt');
        console.log(data.toString());
    } catch (err) {
        console.error(err);
    }

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
