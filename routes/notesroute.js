const express = require('express');
const router = express.Router();

const noteController = require('./../noteMgmtController/notescontoller');

router.route('/')
    .get(noteController.getAllNotes)
    .post(noteController.postNote);

router.route('/:noteId')
    .get(noteController.getNoteById)
    .put(noteController.updateNote)
    .delete(noteController.deleteNote);

module.exports = router;