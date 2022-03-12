import { useState } from 'react';
import './App.css';
import CreateUser from "./components/CreateUser"
import Users from './components/Users'
// import axios from 'axios'

const height = {
  height: window.innerHeight
}

function App() {

  const [menu, setMenu] = useState('Create User')
  // const [users, setUsers] = useState('')
  
  const handleMenu = async (value) => {
    // await loadUsers()
    setMenu(value)
  }
 
  const users = JSON.parse(localStorage.getItem("users"))
  
  // const loadUsers = async () => {
  //   const res = await axios.get(`https://localhost:7191/users`)
  //   const data = await res.data
  //   await setUsers(data)
  // }

  
  let data = []
  if(users !== null){
    for(let i=0; i<users.length;i++){
      data.push({
        'FirstName' : users[i].firstName,
        'LastName' : users[i].lastName,
        'Gender' : users[i].gender,
        'DateOfBirth' : users[i].dateOfBirth,
        'Email' : users[i].email,
        'Phone' : users[i].phone,
      })
    }
  }


  return (
    <div className="col-md-8 m-auto text-center App overflow-auto" style={height}>
      <div className='py-3'>
        <button className={menu==="Users"? "btn btn-primary mx-2": "btn btn-secondary mx-2"} value="Users" onClick={() => handleMenu("Users")}>Users</button>
        <button className={menu==="Create User"? "btn btn-primary mx-2": "btn btn-secondary mx-2"} value="Create User" onClick={() => handleMenu("Create User")}>Create User</button>
      </div>
      
      { 
        menu === "Users" 
        ? <Users data = {data} /> 
        : <CreateUser handleMenu = {handleMenu} />
      }

    </div>
  );
}

export default App;
