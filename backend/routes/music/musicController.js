const jwt = require('jsonwebtoken');
const GenresSQL = require('../../models/genresSQL');
const TrackSQL = require('../../models/TrackSQL')
const ArtistSQL = require('../../models/artistSQL');
const AlbumSQL = require('../../models/albumSQL');
const playlistSQL = require('../../models/playlistSQL')



const pool = require('../../mode');
const userSQL = require("../../models/user/userSQL");

class musicController {
    async getGenres(req, res) {
        try {
           let genres = await pool.query(GenresSQL.queryAll);

           let count = await pool.query('CALL getCountGenres()');
           let countDragond = await pool.query(`CALL getCountTrackByArtist(${1})`);
           //  let countLBig = await pool.query('CALL getCountTrackByArtist(2)');
            let trackByName = await pool.query(`CALL getTracksByName(?)`,['ok']);
           //
           //
           //  console.log('count genres= ', count[0][0]);
           //  console.log('count track dragons= ', countDragond[0][0]);
           //  console.log('by name track', trackByName[0][0]);
           //  console.log('count track imagine dragons', countLBig[0][0]);

           return res.json({genres: genres[0]})

        } catch(err) {
            return res.status(400).json({message: 'Server error'})
        }
    }



    async getArtists(req, res) {
        try {
            let genres = await pool.query(GenresSQL.queryAll);

            // let count = await pool.query('CALL getCountGenres()');
            // let countDragond = await pool.query(`CALL getCountTrackByArtist(${1})`);
            // //  let countLBig = await pool.query('CALL getCountTrackByArtist(2)');


            try{
                // let countArtists = await pool.query(ArtistSQL.getCount);
                // console.log('count artists', countArtists[0])

                let artists = await pool.query(ArtistSQL.queryAll);
                // console.log('artist', artists[0])

                return res.json({artists: artists[0]})

            } catch(err) {
                console.log(err);
                return res.status(400).json({message: 'Server error'})
            }
            //
            //
            //  console.log('count genres= ', count[0][0]);
            //  console.log('count track dragons= ', countDragond[0][0]);
            // console.log('by name track', trackByName[0][0]);
            //  console.log('count track imagine dragons', countLBig[0][0]);


        } catch(err) {
            return res.status(400).json({message: 'Server error'})
        }
    }

    async uploadImage(req, res) {
        try {
            const {name} = req.body;
            const reqfile = req.file;
            const reqbody = req.body;
            // console.log('reqbody', reqbody)
            // console.log('POST request received to /image-upload.');
            // console.log('Axios POST file: ', reqfile);
            res.json({img: reqfile})
            // res.send('POST request recieved on server to /image-upload.');
            // let res = await pool.query(GenresSQL.insert,[name])
        } catch(err) {
            console.log('upload img error', err);
            return res.status(400).json({message: 'Upload image error'})

        }
    }

    async removePlaylist(req, res) {
        try {
            const {id} = req.body;

            try {
                 await pool.query(playlistSQL.remove,[id]);
                // console.log('new create genre', newGenre);
                return res.json({isCompleted: true})
            } catch(err) {
                return res.status(400).json({message: 'Remove playlist error'})

            }

        } catch (err) {
            console.log('create genre error', err)
            return res.status(400).json({message: 'Remove playlist error'})
        }
    }


    async createGenre(req, res) {
        try {
            const {name, srcImg} = req.body;

            if (!name.trim()) {
                return res.status(400).json({message: 'Create genre error, name is empty'})
            }
            try {
                let newGenre = await pool.query(GenresSQL.insert,[name, srcImg || null]);
                // console.log('new create genre', newGenre);
            } catch(err) {
                // console.log('createGenreSQL error',err)
            }

        } catch (err) {
            console.log('create genre error', err)
            return res.status(400).json({message: 'Create genre error'})
        }
        // console.log('create genre', req.body);
        res.json({message: 'Genre was created!'})
    }

    async createArtist(req, res) {

        console.log('создание нового артиста')
        try {
            const {name, description, srcImg} = req.body;

            if (!name.trim()) {
                return res.status(400).json({message: 'Create artist error, name is empty'})
            }
            try {
                let newArtist = await pool.query(ArtistSQL.insert,[name, description || null, srcImg || null]);
                // console.log('new create genre', newGenre);
            } catch(err) {
                // console.log('createGenreSQL error',err)
            }

        } catch (err) {
            console.log('create artist error', err)
            return res.status(400).json({message: 'Create artist error'})
        }
        res.json({message: 'Artist was created!'})
    }

    async getAlbums (req, res) {
        try {
            try {
                let resPool = await pool.query(AlbumSQL.queryAll);

                console.log('getAlbums', resPool)
                res.json({message: 'Get albums', isCompleted: true, albums: resPool[0][0]})
            } catch(err) {
                console.log('Get albums ',err)
                return res.status(400).json({message: 'get wasnt given albums'})
            }

        } catch (err) {
            console.log('create artist error', err)
            return res.status(400).json({message: 'Create artist error'})
        }
    }

    async getAlbumsArtist (req, res) {
        const {artist} = req.body;
        try {
            try {
                let resPool = await pool.query(AlbumSQL.getAlbumsArtist,[artist]);
                // console.log('new create genre', newGenre);
                res.json({message: 'Getted albums', isCompleted: true, albums: resPool[0]})
            } catch(err) {
                console.log('create artist error', err)
                return res.status(400).json({message: 'Create artist error'})
            }

        } catch (err) {
            console.log('create artist error', err)
            return res.status(400).json({message: 'Create artist error'})
        }
    }

    async addAlbumArtist (req, res) {
        try {
            const {name, srcImg, year, artist} = req.body;
            let albumId = null;
            try {
                let resPool = await pool.query(AlbumSQL.insert, [name, year, srcImg]);
                albumId = resPool[0].insertId

            } catch(err) {
                console.error('elbum add', err);
                return res.status(400).json({message: 'Album wasnt added'})
            }

            try {
                await pool.query('INSERT INTO artist_albom(albom_id, artist_id) VALUES(?,?)', [albumId, artist]);
            } catch(err) {
                console.log('track_artist', err)
                return res.status(400).json({message: 'track_artist'})
            }

            try {
                let resPool = await pool.query(AlbumSQL.getAlbumById, [albumId]);
                return res.json({message: 'Album was created', isCompleted: true, album: resPool[0]})

            } catch(err) {
                console.log('track_artist', err)
                return res.status(400).json({message: 'track_artist'})
            }
        } catch (err) {
            console.error('add Album', err);
            return res.status(400).json({message: 'Album wasnt added'})
        }
    }

    async getAllTrack(req, res) {
        try {
            let tracks = await pool.query(TrackSQL.queryAll);
            return res.json({tracks: tracks[0]})
        } catch (err) {
            console.err('all track', err);
        }
    }

    async getTracksGenre(req, res) {
        const {id} = req.body
        try {
            let tracks = await pool.query(TrackSQL.trackGenre,[id])

            return res.json({tracks: tracks[0]})
        } catch (err) {
            console.error('tracks by genre', err);
            return res.status(400).json({message: 'error get tracks by genre'})

        }
    }
}

module.exports = new musicController();