const { readFileSync } = require('fs');
const express = require('express');

const index = readFileSync('index.html', 'utf-8');
const data = JSON.parse(readFileSync('dummy.json', 'utf-8'));
const products = data.products;

const server = express();
const morgan = require('morgan');



//custom middleware
server.use(express.json())
// server.use(express.urlencoded())

server.use(express.static('public'))

server.use(morgan('default'))


//middleware
// server.use((req, res, next) => {
//     console.log(
//         req.get('User-Agent'),
//         req.method,
//         req.pipe,
//         req.hostname,
//         new Date())
//     next()
// })

const auth = (req, res, next) => {
    console.log()
    if (req.body.password == '123') {
        next()
    } else {
        res.sendStatus(401)
    }

}


//API END-POINT 

server.get('/', auth, (req, res) => {
    res.json({ type: 'GET' })
})

server.post('/', auth, (req, res) => {
    res.json({ type: 'POST' })
})

server.put('/', auth, (req, res) => {
    res.json({ type: 'PUT' })
})

server.delete('/', auth, (req, res) => {
    res.json({ type: 'DELETE' })
})

server.patch('/', auth, (req, res) => {
    res.json({ type: 'PATCH' })
})


server.get('/', auth, (req, res) => {  //this is how an any api shoul be made through
    // res.status(201).send('<h1>hello</h1>')
    // res.sendStatus(404)
    // res.send('<h1>hello<./h1>')
    //  res.sendFile(path.join('/Users/Dev%20Sahu/Desktop/Node_app/index.html'));
    // res.json(products)

})

server.listen(8080, () => {
    console.log('server started')
});