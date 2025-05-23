import express from 'express'
import * as db from "./util/database.js"

const PORT = 5000
const app = express()
app.use(express.json())

app.get("/users", (req, res) => {
    try{
        const users = db.getUsers()
    res.status(200).json(users)
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`})
    }
})

app.get("/users/:id", (req, res) => {
    try{
        const user = db.getUser(req.params.id)
        if(!user)
        {
            return res.status(404).json({message: "user not found"})
        }
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`})
    }
})

app.post("/users", (req, res) => {
    try{
        const {name} = req.body
        if(!name)
        {
            return res.status(400).json({message: "Invalid credentials"})
        }
        const savedUser = db.saveUser(name)
        if(savedUser.changes != 1)
        {
            return res.status(501).json({message: "User save falied"})
        }
        res.status(201).json({id: savedUser.lastInsertRowid, name});
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`})
    }
})

app.put("/users/:id", (req, res) => {
    try{
        const {name} = req.body
        if(!name)
        {
            return res.status(400).json({message: "Invalid credentials"})
        }
        const id = +req.params.id
        const updatedUser = db.updateUser(id, name)
        if(updatedUser.changes != 1)
        {
            return res.status(501).json({message: "User update falied"})
        }
        res.status(200).json({id, name});
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`})
    }
})

app.delete("/users/:id", (req, res) => {
    try{
        const deleteUser = db.deleteUser(req.params.id)
        if(deleteUser.changes != 1)
        {
            return res.status(501).json({message: "User delete falied"})
        }
        res.status(200).json({message : "Delete succesful"});
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`})
    }
})

app.get("/blogs", (req, res) => {
    try{
        const blogs = db.getBlogs()
    res.status(200).json(blogs)
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`})
    }
})

app.get("/blogs/:id", (req, res) => {
    try{
        const blog = db.getBlog(req.params.id)
        if(!blog)
        {
            return res.status(404).json({message: "blog not found"})
        }
        res.status(200).json(user);
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`})
    }
})

app.post("/blogs", (req, res) => {
    try{
        const {userId, title,category,content,created, lastModified} = req.body
        if(!userId || !title || !category || !content ||!created || !lastModified)
        {
            return res.status(400).json({message: "Invalid credentials"})
        }
        const savedBlog = db.saveBlog(userId, title,category,content,created, lastModified)
        if(savedBlog.changes != 1)
        {
            return res.status(501).json({message: "Blog save falied"})
        }
        res.status(201).json({id: savedBlog.lastInsertRowid, userId, title,category,content,created, lastModified});
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`})
    }
})

app.put("/blogs/:id", (req, res) => {
    try{
        const {userId, title,category,content,created, lastModified} = req.body
        if(!userId || !title || !category || !content ||!created || !lastModified)
        {
            return res.status(400).json({message: "Invalid credentials"})
        }
        const id = +req.params.id
        const updatedBlog = db.updateBlog(userId, title,category,content,created, lastModified, id)
        if(updatedBlog.changes != 1)
        {
            return res.status(501).json({message: "Blog update falied"})
        }
        res.status(200).json({id, userId, title,category,content,created, lastModified});
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`})
    }
})

app.delete("/blogs/:id", (req, res) => {
    try{
        const deleteBlog = db.deleteUser(req.params.id)
        if(deleteBlog.changes != 1)
        {
            return res.status(501).json({message: "Blog delete falied"})
        }
        res.status(200).json({message : "Delete succesful"});
    }
    catch(err)
    {
        res.status(500).json({message : `${err}`})
    }
})


app.listen(PORT, () => {
    console.log(`Server fut a ${PORT}-on`)
})