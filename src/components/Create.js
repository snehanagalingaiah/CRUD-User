import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusLg } from 'react-bootstrap-icons';
import './Create.css';

const Create = ({created, setCreated}) =>{
   
   const [newUser, setNewUser] = useState({
    name:'',
    email:'',
    contact:'',
    city : ''
   })

//called on change of the input component values
   const setNewVal =(e) => 
   {
     setNewUser({...newUser, [e.target.name]:e.target.value})
   }

//called on the click of the save btn of the create modal, hits the api and creates the user
    async function createData()
   {
     let createdItem;

    if(newUser.name ==="")
      alert("Enter name");
    else if(newUser.email==="")
      alert("Enter email")
    else if(newUser.contact === "")
      alert("Enter contact number")
    else if(newUser.city === "")
      alert("Enter city")
    else{
     createdItem = await axios.post(`https://64b5f579f3dbab5a95c7c6fd.mockapi.io/user/users`,newUser);
     console.log("status of creation", createdItem.status )
     setNewUser({name:'', email:'', contact:'', city : ''})
     setCreated(!created)
         if(createdItem)
             alert(`User ${createdItem.data.name} created`)
       }
   }

	return(
		<div>
    <button type="button" id="create-btn" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#createModal" > <PlusLg /> New </button>

         <div>
    <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Create New User</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={newUser.name} onChange = {setNewVal} /><br/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={newUser.email} onChange = {setNewVal}/><br/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="text" className="form-control" id="phone" name="contact" value={newUser.contact} onChange = {setNewVal}/><br/>
            </div>
             <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" className="form-control" id="city" name="city" value={newUser.city} onChange = {setNewVal}/><br/>
            </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick = {createData}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>

    </div>
	);
}

export default Create;