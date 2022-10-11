const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note');

// import validators
const { body, validationResult } = require('express-validator');

// Route 1: Get all the notes at /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ userid: req.user.id });
        // console.log(req.user.id); // userid coming from the middleware modified req object
        res.json(notes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add Note at /api/notes/addnote
// router.post(path, middlewware, validators, callback)
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid Title").isLength({ min: 3 }),
    body('description', "Enter a valid Description").isLength({ min: 5 }),
], async (req, res) => {
    try {
        // check for errors in input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const note = new Note({
            title, description, tag, userid: req.user.id,
        });

        // Save note to collections in database
        const savedNote = await note.save();

        // Sending response is compulsory
        res.json(savedNote);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});



// Route 3: Update Note (any of the method can be used for updation) at /api/notes/update/:id
// router.put(path, middlewware, validators, callback)
// router.patch(path, middlewware, validators, callback)
router.put('/updatenote/:id', fetchuser, [
    body('title', "Enter a valid Title").isLength({ min: 3 }),
    body('description', "Enter a valid Description").isLength({ min: 5 }),
], async (req, res) => {
    try {
        // check for errors in input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        let newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        // Check if the note requested for updation exists or not
        let note = await Note.findById(req.params.id);
        // console.log(note);

        // If note not found
        if (!note) return res.status(404).send("Not Found");

        // Check if the correct user is modifying the note
        if (note.userid.toString() !== req.user.id) return res.status(404).send("Not Allowed");

        // If the user is valid and note is also valid then update the note
        // findByIdAndUpdate(id, {$set: NewNote}, {new: true})  => $set is used for updating the parameters and {new: true} implies that if note not present then make new note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});


// Route 3: Delete Note using: Delete /api/notes/update/:id
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Check if the note requested for deletion exists or not
        let note = await Note.findById(req.params.id);
        // console.log(note);

        // If note not found
        if (!note) return res.status(404).send("Not Found");

        // Check if the correct user is deleting the note or not
        if (note.userid.toString() !== req.user.id) return res.status(404).send("Not Allowed");

        // If the user is valid and note is also valid then delete the note
        await Note.findByIdAndDelete(req.params.id);
        res.json({"success": "Note have been deleted successfully", note});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;