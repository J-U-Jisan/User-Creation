import React from 'react'

export default function Users(props) {

  const data = props.data
  return (
    <div className='my-3'>
        <h3>Users List</h3>
        <div className='m-auto col-md-11'>
            <p className='text-danger'>{data.length===0 ? 'No User': ''}</p>
        
            <div className='col-4 col-sm-3 float-end'>
                <select className='form-select'>
                    <option value="">Sort By</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="dateOfBirth">Date of Birth</option>
                </select>
            </div>
            <div className='my-2'>
                <table className='table table-hover'>
                    
                </table>
            </div>
        </div>
    </div>
  )
}
