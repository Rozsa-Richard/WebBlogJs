import Database from 'better-sqlite3'

const db = new Database('./data/database.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT,userId INTEGER FOREIGN KEY, title STRING, category STRING, content STRING, created DATE, lastModified DATE )`).run()
db.prepare(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT FOREIGN KEY, name STRING)`).run()


export const getUsers = () => db
    .prepare('SELECT * FROM users').all()

export const getUser = (id) => db
    .prepare('SELECT * FROM users WHERE id =?').get(id)

export const saveUser = (name) => db
    .prepare('INSERT INTO users (name) VALUES (?)').run(name)

export const updateUser = (id, name) => db
    .prepare('UPDATE users SET name = ? WHERE id = ?').run(name, id)

export const deleteUser = (id) => db
    .prepare('DELETE FROM users WHERE id =?').run(id)

    export const getBlogs = () => db
    .prepare('SELECT * FROM blogs').all()

export const getBlog = (id) => db
    .prepare('SELECT * FROM blogs WHERE id =?').get(id)

export const saveBlog = (userId, title,category,content,created, lastModified) => db
    .prepare('INSERT INTO blogs (userId, title,category,content,created, lastModified) VALUES (?,?,?,?,?,?)').run(userId, title,category,content,created, lastModified)

export const updateBlog = (id, userId, title,category,content,created, lastModified) => db
    .prepare('UPDATE blogs SET userId = ?, title = ?,category = ?,content = ?,created = ?, lastModified = ? WHERE id = ?').run(userId, title,category,content,created, lastModified, id)

export const deleteBlog = (id) => db
    .prepare('DELETE FROM blogs WHERE id =?').run(id)


const users = [
    { name: 'Ann'},
    { name: 'Bob'},
    { name: 'Géza'}
]

const blogs = [
    {userId : 1, title : "valami1", category: "category1", content: "hosszú szöveg1", created : `${Date.now()}`, lastModified:`${Date.now()}`},
    {userId : 1, title : "valami2", category: "category2", content: "hosszú szöveg2", created : `${Date.now()}`, lastModified:`${Date.now()}`},
    {userId : 2, title : "valami3", category: "category3", content: "hosszú szöveg3", created : `${Date.now()}`, lastModified:`${Date.now()}`},
    {userId : 2, title : "valami4", category: "category4", content: "hosszú szöveg4", created : `${Date.now()}`, lastModified:`${Date.now()}`},
    {userId : 3, title : "valami5", category: "category5", content: "hosszú szöveg5", created : `${Date.now()}`, lastModified:`${Date.now()}`},
    {userId : 3, title : "valami6", category: "category6", content: "hosszú szöveg6", created : `${Date.now()}`, lastModified:`${Date.now()}`}
]

for(const user of users) saveUser(user.name, user.age)
for(const blog of blogs) saveBlog(blog.userId, blog.title, blog.category, blog.content, blog.created, blog.lastModified)