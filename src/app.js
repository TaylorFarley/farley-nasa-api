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
    fetch('https://api.nasa.gov/planetary/apod?api_key=' + x)
        .then(result => {
            return result.json()
        })
        .then(data => {
            const foo = {
                image: data.url,
                descript: data.explanation,
            }
            var n = foo.image.includes('jpg')
            if (n) {
                res.send({
                    foo
                });
            } else {
                foo.image = "https://apod.nasa.gov/apod/image/1906/OrionDeep_Klinger_960.jpg"
                foo.descript = "The constellation of Orion is much more than three stars in a row. It is a direction in space that is rich with impressive nebulas. To better appreciate this well-known swath of sky, a new  long exposure image was taken over several clear nights in January, February and March. After 23 hours of camera time and untold hours of image processing, the featured collage in the light of hydrogen, oxygen, and sulfur was produced spanning over 40 times the angular diameter of the Moon.  Of the many interesting details that have become visible, one that particularly draws the eye is Barnard's Loop."
                res.send({
                    foo
                })
            }
        })
        .catch(error => console.log(error))
}


app.get('/request', someFunction);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});