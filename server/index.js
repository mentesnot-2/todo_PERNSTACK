const express=require('express')
const cors=require("cors")
const pool=require("./db")
const app=express()
app.use(cors())
app.use(express.json())

// Post request to out database
app.post("/todos",async (req,res)=>{
    try {
        const {description}=req.body
        const newTodo=await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description])
        res.json(newTodo.rows[0])

    } catch (err) {
        console.error(err.message)
        // res.end("error")
    }
})

// get all todo

app.get("/todos",async (req,res)=>{
    
    try {
        const allTodos=await pool.query("SELECT * FROM todo") 
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
        
    }
    
})
// get specific todo with its id

app.get("/todos/:id",async (req,res)=>{
    try {
        const {id}=req.params
        const todo=await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id])
        
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
    
})


// updating to do 
app.put("/todos/:id",async (req,res)=>{
    try {
        const {id}=req.params
        const {description}=req.body
        const updatetodo=await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id])
        res.json("todo Updated")

    } catch (err) {
        console.error(err.message)
    }
})


app.delete("/todos/:id",async (req,res)=>{
    try {
        const {id}=req.params
        const deletetodo= await pool.query("DELETE FROM todo WHERE todo_id=$1",[id])
        res.json("todo was deleted")
    } catch (err) {
        console.error(err.message)
    }
})





app.listen(80,()=>{
    console.log("server has started at port 500")
})