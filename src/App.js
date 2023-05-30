import React, { useState } from 'react';
import './App.css';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      setTaskList([...taskList, { text: newTask, completed: false, added: Date.now() }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    const index = taskList.findIndex((task) => task.added === taskId);
    if (index !== -1) {
      const newList = [...taskList];
      newList.splice(index, 1);
      setTaskList(newList);
    }
  };
  

  const handleEditTask = (taskId, newText) => {
    const index = taskList.findIndex(task => task.added === taskId);
    if (index !== -1) {
      const newList = [...taskList];
      newList[index].text = newText;
      setTaskList(newList);
    }
  };
  

  const handleCompleteTask = (taskId) => {
    const index = taskList.findIndex((task) => task.added === taskId);
    if (index !== -1) {
      const newList = [...taskList];
      newList[index].completed = !newList[index].completed;
      setTaskList(newList);
    }
  };
  

  const countIncompleteTasks = () => {
    let count = 0;
    taskList.forEach((task) => {
      if (!task.completed) {
        count++;
      }
    });
    return count;
  };

  const countCompletedTasks = () => {
    let count = 0;
    taskList.forEach((task) => {
      if (task.completed) {
        count++;
      }
    });
    return count;
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTaskList = taskList.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="wrapper">
    <div className="container">
    <h1>React TODO LIST APP</h1>
    <div className="search" style={{ textAlign: 'right', width: '100%'}}>
      <input type="text"  style={{  border: '2px solid black', width: '100%' }} placeholder="Search something..." value={searchQuery} onChange={handleSearch} />
    </div>
    <br></br>
    <form onSubmit={handleAddTask}>
      <div style={{width: '100%'}}>
        <input type="text"  style={{  border: '2px solid black',width: '100%' }} placeholder="Add some task...." value={newTask} onChange={(event) => setNewTask(event.target.value)} />
      </div>
      <div style={{width: '100%'}}>
          <button type="submit" style={{width: '100%'}} className="btn_add">Add</button>
      </div>
    </form>
      <ul>
        {filteredTaskList.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <label>
            <input type="checkbox" style={{  width: '20px', height: '20px' }} checked={task.completed} onChange={() => handleCompleteTask(task.added)}/>
              <span className="checkmark"></span>
              <span>{task.completed ? <del>{task.text}</del> : task.text}</span>
            </label>
            <div>
              <button className="edit" style={{  background: 'green' }} onClick={() => handleEditTask(task.added, prompt('Edit task:', task.text))}>Edit</button>
              <button onClick={() => handleDeleteTask(task.added)} style={{  background: 'red' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="task-count">
        <span>{countIncompleteTasks()}</span> pending task{countIncompleteTasks() === 1 ? '' : 's'},{' '}
        <span>{countCompletedTasks()}</span> task{countCompletedTasks() === 1 ? '' : 's'} completed

      </div>
    </div>
     </div>
  );
}

export default App;