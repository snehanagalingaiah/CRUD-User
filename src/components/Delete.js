import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Delete = ({user, setDeleteData}) => {

//will be called when the delete btn is clicked, hits the api and deletes the user
	 async function handleDelete(user)
   {
      console.log("item to be deleted",user )
      alert(`User data for ${user.name} will be deleted`)
      await axios.delete(`https://64b5f579f3dbab5a95c7c6fd.mockapi.io/user/users/${user.id}`);
      setDeleteData(user);
   }
	return(
		<button type="button" className="btn btn-primary" onClick = {()=>handleDelete(user)}>Delete</button>
		);
}

export default Delete;