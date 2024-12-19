const express = require('express')


const app = express()

app.get('/', (req, res) => {
    return res.send("welcome")
})

app.get('/ab', (req, res) => {
    return res.send("test")
})


app.listen(4000, () => {
    console.log('server listening 4000');
})