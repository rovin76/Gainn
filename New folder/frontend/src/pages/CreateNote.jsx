import React from "react";
import Formdata from "form-data";
import { useState } from "react";
import { postNotes } from "../API/notes";

const CreateNote = () => {
	const [file,setFile]=useState(null);
	const [userNote, setNote] = useState({});
	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setNote({ ...userNote, [name]: value });
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		let formdata=new Formdata();
		formdata.append("screenshot",file);
		postNotes(userNote,formdata).then(res => {
			// console.log(userNote)
			alert("Note is Created")
		})
	};
	console.log(file)
	return (
		<div>
			<h2>Create Your Notes Here</h2>
			<form onSubmit={onSubmitHandler}>
				<input type='text' name='Heading' onChange={onChangeHandler} placeholder="Heading" />
				<br />
				<input type='text' name='Note' onChange={onChangeHandler} placeholder="Note" />
				<br />
				<input type='text' name='Tag' onChange={onChangeHandler} placeholder="Tag" />
				<br />
				<input type="file" encType="multipart/form-data"  name="avatar" onChange={(e)=>setFile(e.target.files[0])}></input><br/>
				<input type='submit' />
			</form>
		</div>
	);
}; 

export default CreateNote;
