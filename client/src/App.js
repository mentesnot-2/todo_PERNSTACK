
import { Fragment } from 'react';
import './App.css';
import InputTodo from './component/inputtodo';
import ListToDos from './component/listtodo';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo/>
        <ListToDos/>
      </div>
      
      </Fragment>
  );
}

export default App;
