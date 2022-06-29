const Router = require('express');
const controller = require('./musicController');
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
router.get('/genres', controller.getGenres)
router.get('/albums', controller.getAlbums);
router.get('/artists', controller.getArtists);

router.post('/createArtist', controller.createArtist);
router.post('/uploadImage',upload.single('file'), controller.uploadImage );
router.post('/createGenre', controller.createGenre);
router.post('/tracksGenre', controller.getTracksGenre);
router.post('/addAlbum', controller.addAlbumArtist);
router.post('/getAlbumsArtist', controller.getAlbumsArtist);
router.post('/removePlaylist', controller.removePlaylist)

module.exports = router;