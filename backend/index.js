const express = require('express');
const authRouter = require('./routes/auth/authRouter');
const musicRouter = require('./routes/music/musicRouter');
const playlistRouter = require('./routes/music/playlist/playlistRouter');
const tracksRouter = require('./routes/music/track/trackRouter');

const bodyParser = require('body-parser');
const PORT =  3003;

const app = express();



// app.use(multer({storage:storageConfig}).single("filedata"));
app.use(express.static(__dirname));
let jsonParser = bodyParser.json()



// app.use(express.json());
app.use("/auth", jsonParser, authRouter)
app.use("/music", jsonParser, musicRouter);
app.use("/playlists", jsonParser, playlistRouter);
app.use("/tracks", jsonParser, tracksRouter)


app.listen(PORT, () => {
    console.log(`Server smmmtarting on PORT ${PORT}!!!`);
})


// app.post('/image-upload', imageUpload.array("my-image-file"), (req, res) => {
//     console.log('POST request received to /image-upload.');
//     console.log('Axios POST body: ', req.body);
//     res.send('POST request recieved on server to /image-upload.');
// })