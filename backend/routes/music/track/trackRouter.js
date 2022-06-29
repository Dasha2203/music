const Router = require('express');
const controller = require('./trackController');
const router = Router();
const multer = require('multer');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/musics");
    },
    filename: (req, file, cb) =>{
        console.log('middleware music', file)
        let mimeTypeArr = file.mimetype.split('/');
        let typeImg = mimeTypeArr[mimeTypeArr.length-1];

        cb(null, `${Date.now()}.${typeImg}`);
    }
});
// const imageUpload = multer({storage: storage})

const upload = multer({storage: storageConfig})
router.post('/tracksArtist', controller.getTracksArtist)
router.post('/uploadMusic',upload.single('file'), controller.uploadMusic );
router.post('/addTrack', controller.addTrack)
router.post('/remove', controller.removeTrack);
router.post('/album', controller.getTracksAlbum);
router.post('/playlist', controller.getTracksPlaylist)
router.get('/tracks', controller.getTracks)
router.post('/addTrackAlbum',controller.addTrackToAlbum)
router.post('/removeTrackAlbum',controller.removeTrackFromAlbum)


router.post('/addTrackPlaylist',controller.addTrackToPlaylist)
router.post('/removeTrackPlaylist',controller.removeTrackFromPlaylist)
router.post('/tracksByName', controller.getTracksByName)


module.exports = router;