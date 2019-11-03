const app = require('../app');
const config = require('../utils/config');

app.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

app.post('/', (req, res) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => {
            res.status(201).json(result)
        })
})

const PORT = config.MONGO_URI || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`)
})
