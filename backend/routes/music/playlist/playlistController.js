const jwt = require('jsonwebtoken');
const GenresSQL = require('../../../models/genresSQL');
const TrackSQL = require('../../../models/TrackSQL')
const ArtistSQL = require('../../../models/artistSQL');
const PlaylistSQL = require('../../../models/playlistSQL');



const pool = require('../../../mode');
const userSQL = require("../../../models/user/userSQL");

class playlistController {
    async getPlaylists(req, res) {
        try {
            let playlists = await pool.query(PlaylistSQL.queryAll);

            return res.json({playlists: playlists[0]})
        } catch(err) {
            return res.status(400).json({message: 'Server error'})
        }
    }

    async createPlaylist(req, res) {
        console.log('playlist add')
        try {
            const {name, srcImg} = req.body;

            if (!name.trim()) {
                return res.status(400).json({message: 'Create playlist error, name is empty'})
            }
            try {
                let newPlaylist = await pool.query(PlaylistSQL.insert,[name, srcImg || null]);
                // console.log('new create genre', newGenre);
            } catch(err) {
                console.log('create playlist error', err)
                return res.status(400).json({message: 'Create playlist error'})
            }

        } catch (err) {
            console.log('create playlist error', err)
            return res.status(400).json({message: 'Create playlist error'})
        }
        console.log('create genre', req.body);
        res.json({message: 'Genre was created!'})
    }


}

module.exports = new playlistController();