const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const directoryPath = path.join(__dirname, 'files');

// Create HTTP server
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type','text/plain');
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const fileName = path.join(directoryPath, parsedUrl?.query?.name??'');
  
  try{

    //home page
    if(pathname == '//'){
      res.end('welcome to homepage');
    }

    // List files
    else if (pathname == '/list') {
      fs.readdir(directoryPath, (err, files) => {
        const fileList = files.join('\n');
        res.end(fileList);
      });
    }

    // Serve file content
    else if (pathname == '/file' && parsedUrl.query.name) {
      if(parsedUrl.query.name == ''){res.end('incomplete query')}
      if(parsedUrl.query.name.includes(".txt")){
        fs.readFile(fileName, 'utf8', (err, data) => {
          res.end(data);
        });
      }
      res.end('not readable format');

    } 

    // Create a new file
    else if (pathname == '/create' && parsedUrl.query.name && (parsedUrl.query.content??'')) {
      if(parsedUrl.query.name == ''){res.end('incomplete query')}
      if(fs.existsSync()){
        res.end('this file already exists');
      }
      fs.writeFile(fileName, parsedUrl.query.content, 'utf8', (err) => {
        res.end(`File ${parsedUrl.query.name} created successfully`);
      });

    }
    
    // Append content to an existing file
    else if (pathname == '/append' && parsedUrl.query.name && (parsedUrl.query.content??'')) {
      if(parsedUrl.query.name == ''){res.end('incomplete query')}
      fs.appendFile(fileName, `\n${parsedUrl.query.content}`, 'utf8', (err) => {
        res.end(`Content appended to ${parsedUrl.query.name}`);
      });

    }

    // Delete a file
    else if (pathname == '/delete' && parsedUrl.query.name) {
      if(parsedUrl.query.name == ''){res.end('incomplete query')}
      if(fs.existsSync(parsedUrl.query.name)){
        fs.unlink(fileName, (err) => {
          res.end(`File ${parsedUrl.query.name} deleted successfully`);
        });
      }
      res.end('no such file exists');
    } 

    else {
      res.end('Route not found');
    }
  } 
  
  catch (error) {
    res.end(error);
    return;
  }
  
});

// Start the server
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});