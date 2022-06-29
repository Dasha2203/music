const Router = require('express');
const controller = require('./playlistController');
const router = Router();
const multer = require('multer');
const imageUploadPath = '/images';

// const upload = multer({dest:"images"});
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/images");
    },
    filename: (req, file, cb) =>{
        let mimeTypeArr = file.mimetype.split('/');
        let typeImg = mimeTypeArr[mimeTypeArr.length-1];
        cb(null, `${Date.now()}.${typeImg}`);
    }
});
// const imageUpload = multer({storage: storage})

const upload = multer({storage: storageConfig})
router.get('/', controller.getPlaylists)

router.post('/create', controller.createPlaylist)


// router.get('/artists', controller.getArtists);
// router.post('/createArtist', controller.createArtist);

// router.post('/uploadImage',upload.single('file'), controller.uploadImage );
// router.post('/createGenre', controller.createGenre);
// router.get('/tracksGenre', controller.getAllTrack);

module.exports = router;