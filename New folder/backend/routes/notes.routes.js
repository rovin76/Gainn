const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { NoteModel } = require("../models/Note.model");
const fileUpload = require("express-fileupload");


const notesController = Router();

notesController.use(fileUpload());

notesController.get("/", async (req, res) => {
	const { tag } = req.query;
	const notes = await NoteModel.find({ userId: req.body.userId, tag });
	res.send(notes);
});


notesController.post("/create", async (req, res) => {
	const { Heading, Note, Tag, userId } = req.body;
	console.log(req.files)
	const note = new NoteModel({
		Heading,
		Note,
		Tag,
		userId,
	});
	try {
		await note.save();
		res.send("note created");
	} catch (err) {
		res.send("something went wrong");
	}
});

// notesController.post("/create", upload.single("avatar"), (req, res, next) => {
// 	console.log(req.files);
// 	try {
// 		res.send("note created");
// 	} catch (err) {
// 		res.send("something went wrong");
// 	}
// });

notesController.delete("/delete/:noteId", async (req, res) => {
	const { noteId } = req.params;
	console.log(noteId);
	const deletedNote = await NoteModel.findOneAndDelete({
		_id: noteId,
		userId: req.body.userId,
	});
	if (deletedNote) {
		res.status(200).send("Deleted");
	} else {
		res.send("couldn't delete");
	}
});

notesController.patch("/edit/:noteId", async (req, res) => {
	const { noteId } = req.params;
	const updateNote = await NoteModel.findOneAndUpdate(
		{ _id: noteId, userId: req.body.userId },
		req.body
	);
	if (updateNote) {
		res.send("Updated");
	} else {
		res.send("couldn't Updated");
	}
});

module.exports = {
	notesController,
};
