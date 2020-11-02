import React, { useState, useEffect, Fragment } from "react";
import Column from './components/column';
import apiUser from './api/user/user';
import apiTask from './api/task/task';
import './App.css';

const[user, task] = ['Users', 'Tasks']

export default function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskStates, setTaskStates] = useState([]);
  const [idSelected, setIdSelected] = useState(null);

  const getAllUsers = async () => {
    const newUsers = await apiUser.getAllUsers()
    if(newUsers.length) {
      setUsers(newUsers);
    }
  }

  const getAllTasks = async () => {
    const newTasks = await apiTask.getAllTasks()
    if(newTasks.length) {
      setTasks(newTasks);
    }
  }

  const getAllTaskStates = async () => {
    const newTaskStates = await apiTask.getAllTaskStates()
    if(newTaskStates.length) {
      setTaskStates(newTaskStates);
    }
  }

  const dragEndFunc = ({destination, source, draggableId, type}) => {
    const [array, oldArray, set] = type == user ? [Array.from(users), users, setUsers] : [Array.from(tasks),tasks, setTasks];
    array.splice(source.index, 1)
    array.splice(destination.index, 0, oldArray[draggableId])
    set(array)
  }

  const selectUserID = (id) => {
    if(idSelected && idSelected == id){
      setIdSelected(null)
    } else{
      setIdSelected(id)
    }
  }
  
  useEffect(() => {
    getAllTasks()
    getAllUsers()
    getAllTaskStates()
  }, [])

  return (
    <div className="app">
      <div className="header">
        TODO Bunny App
      </div>
      <div className="content">
        <Column array={users} type={user} idSelected={idSelected} selectUserID={selectUserID} user={user} task={task} taskStates={taskStates} dragEndFunc={dragEndFunc}/>
        <Column array={idSelected ? tasks.filter(tsk => tsk.user_id == idSelected) : tasks} type={task} idSelected={idSelected} user={user} task={task} taskStates={taskStates} dragEndFunc={dragEndFunc}/>
      </div>
      <div className="footer">

      </div>
    </div>
  );
}
