import React, { useState, useEffect, Fragment } from "react";
import {StatusCodes} from 'http-status-codes';
import constants from './constants';
import Column from './components/column';
import apiUser from './api/user/user';
import apiTask from './api/task/task';
import './App.css';

const {user, task, remove, update, create} = constants

export default function App() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskStates, setTaskStates] = useState([]);
  const [idSelected, setIdSelected] = useState(null);

  const addToArray = (type, data) => {
    let [array, setArray] = type === user ? [Array.from(users), setUsers] : [Array.from(tasks), setTasks];
    array.splice(0, 0, data);
    setArray(array);
  }

  const deleteFromArray = (type, id) => {
    if(type === user) {
      let arrayU = Array.from(users)
      let arrayT = Array.from(tasks)
      arrayU.splice(arrayU.findIndex(elm => elm.id === id), 1);
      setUsers(arrayU);
      setTasks(arrayT.filter(elm => elm.user_id !== id))
    } else {
      let [array, setArray] = [Array.from(tasks), setTasks];
      array.splice(array.findIndex(elm => elm.id === id), 1);
      setArray(array);
    }
  }

  const updateFromArray = (type, data) => {
    let [array, setArray] = type === user ? [Array.from(users), setUsers] : [Array.from(tasks), setTasks];
    array.splice(array.findIndex(elm => elm.id === data.id), 1, data);
    setArray(array);
  }

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

  const createResource = async (type, resource) => {
    let response;
    if(type === user) {
      response = await apiUser.createUser(resource);
    } else {
      response = await apiTask.createTask(resource);
    }

    if (response.statusCode === StatusCodes.CREATED) {
      resource.id = response.data.id
      addToArray(type, resource);
    }
  }

  const deleteResource = async (type, resource_id) => {
    let response;
    if(type === user) {
      response = await apiUser.deleteUser(resource_id);
    } else {
      response = await apiTask.deleteTask(resource_id);
    }

    if (response === StatusCodes.OK) {
      deleteFromArray(type, resource_id);
    }
  }

  const updateResource = async (type, resource) => {
    let response;
    if(type === user) {
      response = await apiUser.updateUser(resource);
    } else {
      response = await apiTask.updateTask(resource);
    }

    if(response === StatusCodes.OK) {
      updateFromArray(type, resource);
    }
  }

  const actions = (type, action, data) => {
    switch (action) {
      case remove:
        deleteResource(type, data)
        break;
      case update:
        updateResource(type, data)
        break;
      case create:
        createResource(type, data)
        break;
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
        <Column array={users} type={user} idSelected={idSelected} 
        selectUserID={selectUserID} actions={actions}
        taskStates={taskStates} dragEndFunc={dragEndFunc}/>
        <Column array={idSelected ? tasks.filter(tsk => tsk.user_id == idSelected) : tasks} 
        type={task} idSelected={idSelected} taskStates={taskStates} actions={actions}
        dragEndFunc={dragEndFunc}/>
      </div>
      <div className="footer">

      </div>
    </div>
  );
}
