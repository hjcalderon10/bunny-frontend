import React, { useState, useEffect, Fragment } from "react";
import Column from './components/column';
import apiUser from './api/user/user';
import apiTask from './api/task/task';
import './App.css';

const arrayToMap = (array) => array.reduce((accm, value) => {
  accm[value.id] = value;
  return  accm;
}, {})

const[user, task] = ['Users', 'Tasks']

export default function App() {
  const [users, setUsers] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [tasks, setTasks] = useState([]);
  const [tasksMap, setTasksMap] = useState({});

  const getAllUsers = async () => {
    const newUsers = await apiUser.getAllUsers()
    if(newUsers.length) {
      setUsers(newUsers);
      setUsersMap(arrayToMap(newUsers))
    }
  }

  const getAllTasks = async () => {
    const newTasks = await apiTask.getAllTasks()
    if(newTasks.length) {
      setTasks(newTasks);
      setTasksMap(arrayToMap(newTasks))
    }
  }
  
  useEffect(() => {
    getAllTasks()
    getAllUsers()
  }, [])

  return (
    <div className="App">
      <Column array={users} map={usersMap} type={user} user={user} task={task}/>
      <Column array={tasks} map={tasksMap} type={task} user={user} task={task}/>
    </div>
  );
}
