const express=require("express");
 const app=express();
const PORT=5001;
const { v4: uuidv4 } = require('uuid');
const pool=require("./db")

// middle to create data using server
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/books",async(req,res)=>{
    try {
        const books=await pool.query("SELECT * FROM book;")
        res.status(200).json({message:`Books are retrieved successfully`,data:books.rows})
    } catch (error) {
        res.json({message:res.message})
    }
})
app.post("/books",async(req,res)=>{
    try {
        const {title,description}=req.body;
        const id=uuidv4();
        const createBook=await pool.query("INSERT INTO book(id,title, description) VALUES($1,$2,$3) Returning *",[id,title,description])//Returning * na dile kono value respond/show korbe na
        res.status(201).json({message:`Book is created successfully`,data:createBook.rows})
    } catch (error) {
        res.json({message:res.message})
    }
})
app.get("/books/:id",async(req,res)=>{
    try {
        const bookId=req.params.id;
        const specificBook=await pool.query("Select id,title from book where id=$1",[bookId])
        res.status(200).json({message:`Book is retrieved by ID`,data:specificBook.rows})
    } catch (error) {
        res.json({message:res.message})
    }
})
app.put("/books/:id",async(req,res)=>{
    try {
        const bookId=req.params.id;
        const {title,description}=req.body;
        const updatedBook=await pool.query("update book set title=$1, description=$2 where id=$3 Returning id,title",[title,description,bookId])
        res.status(200).json({message:`Book is updated by ID successfully`,data:updatedBook.rows})
    } catch (error) {
        res.json({message:res.message})
    }
})
app.delete("/books/:id",async(req,res)=>{
    try {
        const bookId=req.params.id;
        await pool.query("Delete from book where id=$1",[bookId])
        res.status(200).json({message:`Book is deleted by ID successfully`,})
    } catch (error) {
        res.json({message:res.message})
    }
})


app.get("/",(req,res)=>{
    res.json({success:true,message:`Book Server is running successfully!`})
})

app.listen(PORT,()=>{
console.log(`Books Api is listening on Port:http://localhost:${PORT}`);
})

module.exports=app