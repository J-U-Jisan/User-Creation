import { useState } from 'react';
import './App.css';
import CreateUser from "./components/CreateUser"
import Users from './components/Users'

const height = {
  height: window.innerHeight
}

function App() {

  const [menu, setMenu] = useState('Create User')
  
  const handleMenu = (value) => {
    setMenu(value)
  }

 
  let data = JSON.parse(localStorage.getItem("users"))
  if(!data)
    data = []
  

  console.log('Menu:', menu)
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
