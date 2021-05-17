import multer from 'multer';
import express from 'express';  //because this is a router
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');     //1st param, error, 2nd param is folder file saved to
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);  //ensure a unique name, can be changed later
    },
});

const upload = multer({storage});   //define uploadMiddleware



//apis that saves a file in uploads folder and sets the filename to the timestamp
uploadRouter.post('/', isAuth, upload.single('image'), (req, res)=> {
    res.send(`/${req.file.path}`);
});   //this path represents /api/uploads   //NOTE: use multer to handle files being uploaded by user


export default uploadRouter;