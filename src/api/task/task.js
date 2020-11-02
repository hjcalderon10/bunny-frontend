import axios from 'axios';

const server = 'http://localhost:8080/api/v1';//'http://ec2-3-15-12-241.us-east-2.compute.amazonaws.com:8080/api/v1';

const getAllTasks = async () => {
  try {
    const tasks = await axios.get(`${server}/tasks`);
    return tasks.data;
  } catch (err) {
    console.log(`[getAllTasks:${err}]`);
    return [];
  }
};

const getAllTaskStates = async () => {
  try {
    const taskStates = await axios.get(`${server}/tasks/states`);
    return taskStates.data;
  } catch (err) {
    console.log(`[getAllTaskStates:${err}]`);
    return [];
  }
};

const createTask = async (task) => {
  try {
    const response = await axios.post(`${server}/users/${task.userID}/tasks'`, task);
    return response.status;
  } catch (err) {
    console.log(err.response);
    return err.response.status;
  }
};

const updateTask = async (task) => {
  try {
    const response = await axios.put(`${server}/tasks/${task.id}`, task);
    return response.status;
  } catch (err) {
    console.log(err.response);
    return err.response.status;
  }
};

const deleteTask = async (taskID) => {
  try {
    const response = await axios.delete(`${server}/tasks/${taskID}`);
    return response.status;
  } catch (err) {
    console.log(err.response);
    return err.response.status;
  }
};

const apiTask = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getAllTaskStates,
};

export default apiTask;
