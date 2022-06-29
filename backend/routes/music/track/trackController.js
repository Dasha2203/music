const TrackSQL = require('../../../models/TrackSQL')
const ArtistSQL = require('../../../models/artistSQL');

const pool = require('../../../mode');

class trackController {
    async getTracks(req, res) {
        try {
            let tracks = await pool.query(TrackSQL.queryAll);
            return res.json({tracks: tracks[0]})
        } catch (err) {
            console.error('all track', err);
            return res.status(400).json({message: 'Server error'})
        }
    }

    async getTracksByName(req, res) {
        console.log('search byname')
        try {
            const {value} = req.body;
            console.log('search byname', value)

            let tracks = await pool.query(TrackSQL.tracksByName,  ["%" +value + "%"]);
            console.log('res, ', tracks[0])
            return res.json({tracks: tracks[0]})
        } catch (err) {
            console.error('all track', err);
            return res.status(400).json({message: 'Server error'})
        }
    }

    async uploadMusic(req, res) {
        try {
            const reqfile = req.file;
            res.json({music: reqfile})

        } catch(err) {
            console.log('upload img error', err);
            return res.status(400).json({message: 'Upload image error'})

        }
    }

    async addTrack (req, res) {
        try {
            const { name, text, srcImg, path, artist, genre} = req.body;

            let idText = null;
            let idTrack = null;
            if (text) {
                try {

                    let resPool = await pool.query(TrackSQL.addText, [text]);
                    idText = resPool[0].insertId

                } catch(err) {
                    console.log('err add text', err)
                    return res.status(400).json({message: 'Add text'})
                }
            }


            try {

                let resPool = await pool.query(TrackSQL.insert, [name, srcImg, path, 1, idText]);

                idTrack = resPool[0].insertId

            } catch(err) {
                console.log('err add text', err)
                return res.status(400).json({message: 'Add text'})
            }

            try {
                await pool.query('INSERT INTO track_artist(track_id, artist_id) VALUES(?,?)', [idTrack, artist]);
            } catch(err) {
                console.log('track_artist', err)
                return res.status(400).json({message: 'track_artist'})
            }

            try {
                await pool.query('INSERT INTO track_genre(track_id, genre_id) VALUES(?,?)', [idTrack, genre]);

            } catch(err) {
                console.log('track_genre', err)
                return res.status(400).json({message: 'track_artist'})
            }

            try {
                let resPool = await pool.query(TrackSQL.trackById, [idTrack])
                return res.json({track: resPool[0], message: 'Track was added'})
            } catch(err) {
                return res.status(400).json({message: 'error load track'})

            }

            return res.status(400).json({message: 'error load track'})

            // console.log('tracks Artist', tracksArtist);
            // setModalCreateGenre(false)
            // setModalSuccess(res.data.message)
            // setGenres([...genres, {id: Date.now()}])
            // return res.json({message: 'ok'})
        } catch(err) {
            console.error('Add track', err);
            return res.status(400).json({message: 'Add track'})
        }

    }

    async removeTrack(req, res) {
        try {
            const {id} = req.body;
            await pool.query(TrackSQL.deleteTrack, [id]);
            return res.status(200).json({isRemoved: true});
        } catch(err) {
            console.log('remove track', err)
            return res.status(400).json({message: 'Did not remove track'})
        }
    }

    async addTrackToPlaylist(req, res) {
        try {
            const { id, idTrack } = req.body;

            try {
                let resPool = await pool.query(`INSERT INTO track_playlist(track_id, playlist_id) VALUES(?,?)`, [idTrack,id]);


                console.log('resul tracks artis', resPool[0])
                return res.json({isCompleted: true})

            } catch(err) {
                console.log('tracks by artist',err);
                return res.status(400).json({message: 'Server error'})
            }
        } catch(err) {
            console.error('track artist', err);
            return res.status(400).json({message: 'Server error'})
        }
    }

    async removeTrackFromPlaylist(req, res) {
        try {
            const { id, idTrack } = req.body;

            try {
                let resPool = await pool.query(`DELETE FROM track_playlist WHERE track_playlist.track_id = ? AND track_playlist.playlist_id = ?`, [idTrack,id]);


                console.log('resul tracks artis', resPool[0])
                return res.json({isCompleted: true})

            } catch(err) {
                console.log('tracks by artist',err);
                return res.status(400).json({message: 'Server error'})
            }
        } catch(err) {
            console.error('track artist', err);
            return res.status(400).json({message: 'Server error'})
        }
    }


    async addTrackToAlbum(req, res) {
        try {
            const { id, idTrack } = req.body;

            try {
                let resPool = await pool.query(`INSERT INTO track_albom(track_id, albom_id) VALUES(?,?)`, [idTrack,id]);


                console.log('resul tracks artis', resPool[0])
                return res.json({isCompleted: true})

            } catch(err) {
                console.log('tracks by artist',err);
                return res.status(400).json({message: 'Server error'})
            }
        } catch(err) {
            console.error('track artist', err);
            return res.status(400).json({message: 'Server error'})
        }
    }

    async removeTrackFromAlbum(req, res) {
        try {
            const { id, idTrack } = req.body;

            try {
                let resPool = await pool.query(`DELETE FROM track_albom WHERE track_albom.track_id = ? AND track_albom.albom_id = ?`, [idTrack,id]);


                console.log('resul tracks artis', resPool[0])
                return res.json({isCompleted: true})

            } catch(err) {
                console.log('tracks by artist',err);
                return res.status(400).json({message: 'Server error'})
            }
        } catch(err) {
            console.error('track artist', err);
            return res.status(400).json({message: 'Server error'})
        }
    }


    async getTracksPlaylist(req, res) {
        try {
            const { id } = req.body;

            try {
                let resPool = await pool.query(TrackSQL.tracksPlaylist, [id]);


                console.log('resul tracks artis', resPool[0])
                return res.json({tracks: resPool[0]})

            } catch(err) {
                console.log('tracks by artist',err);
                return res.status(400).json({message: 'Server error'})
            }
        } catch(err) {
            console.error('track artist', err);
            return res.status(400).json({message: 'Server error'})
        }
    }

    async getTracksAlbum(req, res) {
        try {
            const { id } = req.body;

            try {
                let resPool = await pool.query(TrackSQL.tracksAlbum, [id]);


                console.log('resul tracks artis', resPool[0])
                return res.json({tracks: resPool[0]})

            } catch(err) {
                console.log('tracks by artist',err);
                return res.status(400).json({message: 'Server error'})
            }
        } catch(err) {
            console.error('track artist', err);
            return res.status(400).json({message: 'Server error'})
        }
    }


    async getTracksArtist(req, res) {
        console.log('enter tracks artist');
        try {
            const { id } = req.body;
            let tracks = [];
            let artist;
            try {
                let resPool = await pool.query(ArtistSQL.getArtistById, [id]);
                artist = resPool[0];
                if(!artist.length) {
                    return res.status(400).json({message: 'Artist not found'})

                }

            } catch(err) {
                console.log('err get artist', err);
                return res.status(400).json({message: 'Server error'})
            }

            try {
                let resPool = await pool.query(TrackSQL.tracksArtist, [id]);
                tracks = resPool[0]

                console.log('resul tracks artis', resPool[0])

            } catch(err) {
                console.log('tracks by artist',err);
                return res.status(400).json({message: 'Server error'})
            }
            res.json({tracks, artist: artist[0]})
        } catch(err) {
            console.error('track artist', err);
            return res.status(400).json({message: 'Server error'})
        }
    }


}

module.exports = new trackController();