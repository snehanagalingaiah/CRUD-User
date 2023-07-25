import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from "./Create"
import Delete from "./Delete"

const View = () =>{

const [tableData, setTableData] = useState([]) // to display the initial data fetched from the mock api in the table
const [deleteData, setDeleteData] = useState('') // when this state changes on deletion of a user the useEffect func executes and re renders the components
const [updated, setUpdated] = useState(false); // when this state changes on updation of user details, the useEffect re renders the components
const [created, setCreated] = useState(false) // when this state changes on creation of user details, the useEffect re renders the components
const [toEditData, setToEditData] = useState({
    name:'',
    email:'',
    contact:'',
    city : ''
   }); // holds the details of the user that is going to be edited

//will execute on first render of the screen, when user is deleted, or created or edited
   useEffect(()=>{

    async function getData(){
       const mockApiData = await axios.get("https://64b5f579f3dbab5a95c7c6fd.mockapi.io/user/users");
       console.log(mockApiData.data);
       setTableData(mockApiData.data)
    }
    getData();
   }, [deleteData,updated, created])


//called when edit btn is clicked, updates the state which will be displayed in the input tags
   async function handleEdit(user)
   {
      console.log("user id to edit", user.id)
      setToEditData(user);
   }

//called when input tag values are changed
   function setEditedVal(e)
   {
      const {name,value} = e.target
      setToEditData({...toEditData, [name]:value})
   }

//called on the click of save btn in the edit modal, hits the api and updates the user
   async function updateData()
   {
     let updatedItem
      if(toEditData.name ==="")
         alert("Enter name");
      else if(toEditData.email==="")
         alert("Enter email")
      else if(toEditData.contact === "")
         alert("Enter contact number")
      else if(toEditData.city === "")
         alert("Enter city")
      else{
       updatedItem = await axios.put(`https://64b5f579f3dbab5a95c7c6fd.mockapi.io/user/users/${toEditData.id}`,toEditData);
       setUpdated(!updated)
           if(updatedItem.status===200)
             alert(`User ${updatedItem.data.name} edited`)
       }
   }

 

  return(
    <div>
    <table className="table table-success table-striped table-bordered table-responsive">
    <thead>
    <tr>
       <th> NAME </th>
       <th> EMAIL </th>
       <th> CONTACT NUMBER </th>
       <th> CITY </th>
       <th> EDIT </th>
       <th> DELETE </th>
     </tr>
    </thead>
    <tbody>
    { 
      tableData.map((data, index)=>(
        <tr key = {data.id}>
           <td> {data.name} </td>
           <td> {data.email} </td>
           <td> {data.contact} </td>
           <td> {data.city} </td>
           <td> <button type="button" className="btn btn-primary"  onClick = {() => handleEdit(data)} data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>  </td>
           <td> <Delete user={data} setDeleteData = {(v) => setDeleteData(v)}/>  </td>
         </tr>
      )) 
    }
    </tbody>
        </table>  
        <Create created = {created} setCreated = {(v) => setCreated(v)}/>

        <div>
    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={toEditData.name} onChange = {setEditedVal} /><br/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" name="email" defaultValue={toEditData.email} onChange = {setEditedVal}/><br/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="text" className="form-control" id="phone" name="contact" defaultValue={toEditData.contact} onChange = {setEditedVal}/><br/>
            </div>
             <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" className="form-control" id="city" name="city" defaultValue={toEditData.city} onChange = {setEditedVal}/><br/>
            </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick = {updateData}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>

    </div>
  );
}

export default View;