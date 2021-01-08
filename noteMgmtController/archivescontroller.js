const Archive = require('./../models/archives');
const Note = require('./../models/notes');



exports.getAllArchives = async (req, res, next) => {
    const archives = await Archive.find({ createdBy: req.user.id });
    res.status(200).json(archives);
};

exports.postArchive = async (req, res, next) => {
    const newArchive = new Archive(req.body);
    newArchive.createdBy = req.user.id;
    const { noteId } = req.params;
    try {
        const archive = await newArchive.save();
        res.status(201).json(archive);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getArchiveById = async (req, res, next) => {
    const { archiveId } = req.params;
    try {
        const archive = await Archive.findById(archiveId);
        user=res.status(200).json(archive);   
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


exports.deleteArchive = async (req, res, next) => {
    const { archiveId } = req.params;
    const newNote = new Note(req.body);
    newNote.createdBy = req.user.id;
    try {
        const archive = await Archive.findById(archiveId);
        res.status(200).json(archive);
        const note = await newNote.save();
        res.status(201).json(note);
        await Archive.findByIdAndRemove(archiveId);
        res.status(200).json({ success: true });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

