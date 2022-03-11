import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

export default function CreateUser(props) {

    const initialUser = {
        'firstName': '',
        'lastName': '',
        'gender': '',
        'dateOfBirth': '',
        'city': '',
        'email': ''
    }

    const today = new Date()
    const yy = today.getFullYear() - 100;
    
    const dob = {
        min: yy + '-' + String(today.getMonth()+1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0'),
        max: today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0')
    }
   
    const [phone, setPhone] = useState('')
    const [user, setUser] = useState(initialUser)
    const [error, setError] = useState({
        'firstName': false,
        'lastName': false,
        'gender': false,
        'phone': false,
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
   
  
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isValidPhoneNumber(phone) === false || phone === ""){
            setError({ ...error, ['phone']: true })
            return false
        }
        else if(error.phone){
            setError({ ...error, ['phone']: false })
        }
        
        
        console.log('Phone: ' + phone + ' ' + 'User: ' + user.phone)
        if(user.firstName.length<2 || user.firstName.length>50){
            setError({ ...error, ['firstName']: true })
            return false
        }
        else if(error.firstName){
            setError({ ...error, ['firstName']: false })
        }

        if(user.lastName.length<2 || user.lastName.length>50){
            setError({ ...error, ['lastName']: true })
            return false
        }
        else if(error.lastName){
            setError({ ...error, ['lastName']: false })
        }

        if(user.gender.length === 0){
            setError({ ...error, ['gender']: true })
            return false
        }
        else if(error.gender){
            setError({ ...error, ['gender']: false })
        } 
        addUser() 
        props.handleMenu("Users")  
    }

    const addUser = () => {
        const users = loadUsers()
        // const users= []
        const temp = {
            'firstName': user.firstName,
            'lastName': user.lastName,
            'gender': user.gender,
            'dateOfBirth': user.dateOfBirth,
            'city': user.city,
            'phone': phone,
            'email': user.email
        }
        users.push(temp)
        localStorage.setItem("users",JSON.stringify(users))
        
        const user1 = JSON.parse(localStorage.getItem("users"))
        console.log("Local: ",user1)
    }
    
    const loadUsers = () => {
        const data = JSON.parse(localStorage.getItem("users"))
        if(data)
            return data
        else return []
    }

    return (
        <div className='my-3 px-2'>
            <h3>Create User</h3>
            <form className='text-start col-md-10 m-auto my-2' onSubmit={handleSubmit}>
                <div className='form-group my-2'>
                    <label className='form-label' htmlFor="firstName">First Name<sup className='text-danger'>*</sup></label>
                    <input type="text" className='form-control' onChange={handleChange} name="firstName" id="firstName" placeholder='Enter First Name' required />
                    <p className={error.firstName? 'text-danger': 'd-none'}>Length must be 2 to 50</p>
                </div>
                <div className='form-group my-2'>
                    <label className='form-label' htmlFor="lastName">Last Name<sup className='text-danger'>*</sup></label>
                    <input type="text" className='form-control' onChange={handleChange} name="lastName" id="lastName" placeholder='Enter Last Name' required />
                    <p className={error.lastName? 'text-danger': 'd-none'}>Length must be 2 to 50</p>
                </div>
                <div className='form-group my-2'>
                    <label className='form-label' htmlFor="gender">Gender<sup className='text-danger'>*</sup></label>
                    <select className='form-select' onChange={handleChange} name="gender" id="gender" required>
                        <option vlaue="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <p className={error.gender? 'text-danger': 'd-none'}>Gender is required</p>
                </div>
                <div className='form-group my-2'>
                    <label className='form-label' htmlFor="dateOfBirth">Date of Birth<sup className='text-danger'>*</sup></label>
                    <input type="date" className="form-control" onChange={handleChange} name="dateOfBirth" id="dateOfBirth" min={dob.min} max={dob.max} required />
                </div>
                <div className='form-group my-2'>
                    <label className='form-label' htmlFor="city">City</label>
                    <input type="text" className='form-control'onChange={handleChange} name="city" id="city" placeholder='Enter City' />
                </div>
                <div className='form-group my-2'>
                    <label className='form-label' htmlFor="phone">Phone<sup className='text-danger'>*</sup></label>
                    <PhoneInput
                        id="phone"
                        
                        placeholder="Enter phone number"
                        value={phone}
                        defaultCountry="BD"
                        onChange={setPhone}
                        required />
                    <p className={error.phone? 'text-danger': 'd-none'}>Invalid Phone Number</p>
                </div>
                <div className='form-group my-2'>
                    <label className='form-label' htmlFor="email">Email<sup className='text-danger'>*</sup></label>
                    <input type="email" onChange={handleChange} className='form-control' name="email" id="email" placeholder='Enter Email' />
                </div>
                <input type="submit" value="Create" className='btn btn-primary my-2' />
            </form>
        </div>
    )
}
