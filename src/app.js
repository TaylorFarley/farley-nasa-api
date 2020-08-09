const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const fetch = require('node-fetch')
app.use(express.static(publicDirectoryPath))


app.get('/', function (req, res) {
    res.render('index');
})




someFunction = (req, res) => {
    const x = process.env.API
    fetch('https://api.nasa.gov/planetary/apod?api_key='+x)
        .then(result => {
            return result.json()
        })
        .then(data => {
            const foo = {
                image: data.url,
                descript: data.explanation,
            }
            res.send({
                foo
            });
        })
        .catch(error => console.log(error))
}


app.get('/request', someFunction);



app.listen(process.env.PORT)