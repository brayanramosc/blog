const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const databaseName = 'testBlog'
const password = process.argv[2]

const dbUrl = `mongodb+srv://brayanrcaicedo:${password}@cluster0.vsupxh6.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(dbUrl)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

if (process.argv.length > 3) {
    const title = process.argv[3]
    const author = process.argv[4]
    const url = process.argv[5]
    const likes = process.argv[6]

    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes,
    })
    blog.save().then(() => {
        console.log(`added ${title} - autor: ${author} to blog`)
        mongoose.connection.close()
    })
} else {
    Blog.find({}).then(res => {
        console.log('Blogs:')
        res.forEach(blog => {
            console.log(blog.title, ' ', blog.author)
        })
        mongoose.connection.close()
    })
}

