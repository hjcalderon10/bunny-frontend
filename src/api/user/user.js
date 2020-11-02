import axios from 'axios';

const server = 'http://localhost:8080/api/v1';//'http://ec2-3-15-12-241.us-east-2.compute.amazonaws.com:8080/api/v1';

const getAllUsers = async () => {
  try {
    const users = await axios.get(`${server}/users`);
    return users.data;
  } catch(err) {
    console.log(`[getAllUsers:${err}]`);
    return [];
  }
};


const createUser = async (user) => {
  try {
    const response = await axios.post(`${server}/users'`, user);
    return response.status;
  } catch(err) {
    console.log(err.response)
    return err.response.status;
  }
};

const updateUser = async (user) => {
  try {
    const response = await axios.put(`${server}/users/${user.id}`, user);
    return response.status;
  } catch(err) {
    console.log(err.response)
    return err.response.status;
  }
};

const deleteUser = async (userID) => {
  try{
    const response = await axios.delete(`${server}/users/${userID}`);
    return response.status;
  } catch(err) {
    console.log(err.response)
    return err.response.status
  }
};

const apiUser = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default apiUser;
