import React ,{Fragment,useState,useEffect}from "react";
import EditTodo from "./edit";


const ListToDos=()=>{
    const [todos,setTodos]=useState([])

    const deleteTodo=async (id)=>{
        try {
          const deleteTodo=await fetch(`http://localhost:80/todos/${id}`,{method: "DELETE"})
          setTodos(todos.filter(todo=>todo.todo_id!==id))
        } catch (err) {
            console.error(err.message)
        }
    }
    const getTodo=async ()=>{
        try {
            const response=await fetch("http://localhost:80/todos")
            const jsonData=await response.json()
            setTodos(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(()=>{
        getTodo()
    },[])
    console.log(todos)
    return <Fragment>
        <table class="table mt-5 text-center">
        <thead>
            <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
            </tr>
            <tr> */}
            {todos.map(todo=>(
                <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td><EditTodo todo={todo}/></td>
                    <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>Delete</button></td>
                </tr>
            ))}
            
        </tbody>
  </table>
    </Fragment>
}

export default ListToDos