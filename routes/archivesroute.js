const express = require('express');
const router = express.Router();

const archiveController = require('./../noteMgmtController/archivescontroller');

router.route('/')
    .get(archiveController.getAllArchives)
    .post(archiveController.postArchive);

router.route('/:zipNoteId')
    .get(archiveController.getArchiveById)
    .delete(archiveController.deleteArchive);

module.exports = router;