import React, {useState, useEffect} from "react";
import './App.css';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // When the app loads, we need to listen to database and fetch new todos as they add/remove
  // useEffect(function,dependency)
  
  useEffect(() => {
    // this code fires when App.js loads
    db.collection("todos").orderBy("timestamp","desc").onSnapshot(snapshot => {
      // doc => doc.data().todo will return Array of Object
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
    })
  },[])


  const addTodo = (event => {
    event.preventDefault();
    
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput("");
  }) 

  return (
    <div className="App">
      <h1>Hello Users 🚀!</h1>
     
      <form>
        <FormControl>
          <InputLabel>✅ Add your todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        <Button type="submit" disabled={!input} variant="contained" color="primary" onClick={addTodo}>
            Add Todo
        </Button>
      </form>
      
      <ul>
        {todos.map(todo => (
           <Todo todo={todo} />
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
