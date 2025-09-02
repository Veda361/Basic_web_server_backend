const fs = require('fs');

const http = require('http')

const index = fs.readFileSync('index.html', 'utf-8');
const jsonData = JSON.parse(fs.readFileSync('dummy.json', 'utf-8'));
const products = jsonData.products;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method)

  // Handle /product/:id route  
  if (req.url.startsWith('/product')) {
    const id = req.url.split('/')[2];
    //req.url is the URL path from the HTTP request (e.g., /product/3).

    // .split('/') splits the string into an array using / as the separator.
    
    // [2] gets the third element of the array (arrays are zero-indexed).


    // Example:

    // If req.url is /product/3:

    // req.url.split('/') gives ['', 'product', '3']
    // [2] gets '3'
    // So:
    // This line extracts the product ID from a URL like /product/3.
    const prd = products.find(p => p.id == id); // match both string or number
    console.log("Requested URL:", req.url);
    console.log("Extracted ID:", id);
    console.log("Matched Product:", prd);

    res.setHeader('Content-Type', 'text/html');
    if (prd) {
      let modifiedIndex = index
        .replace('**HeadPhones**', prd.title)
        .replace('**price**', prd.price)
      res.end(modifiedIndex);
    } else {
      res.writeHead(404);
      res.end('Product not found');
    }
    return; // Prevents further response
  }

  switch (req.url) {
    case '/':
      res.setHeader('content-Type', 'text/html')
      res.end(index)
      break
    case '/api':
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(jsonData))
      break
    default:
      res.writeHead(404)
      res.end()
  }

  console.log('server started')

})

server.listen(8080);