let TrackSQL = {
    insert: 'INSERT INTO track(name, srcImg, path, lang_id, textTrack_id) VALUES(?,?,?,?,?)', // Вставить данные
    drop: 'DROP TABLE genres', // Удалить все данные в таблице
    queryAll: 'SELECT * FROM track', // Найти все данные в таблице
    getGenreById: 'SELECT * FROM genres WHERE id =?', // Найти данные, отвечающие условиям
    getGenreLikeName: 'SELECT * FROM users WHERE name LIKE ?',
    tracksByName: 'SELECT track.*, artist.name AS artistName, textTrack.text, artist.id FROM track JOIN track_artist ON track_artist.track_id = track.id JOIN artist ON artist.id = track_artist.artist_id LEFT OUTER JOIN textTrack ON textTrack.id = track.id WHERE track.name LIKE ?',
    updateGenre: 'UPDATE genres SET name =? WHERE id =?',
    trackById: 'SELECT track.*, artist.name as artistName, textTrack.text FROM track_artist JOIN artist ON artist.id = track_artist.artist_id JOIN track ON track.id = track_artist.track_id LEFT OUTER JOIN textTrack ON track.textTrack_id = textTrack.id WHERE track.id =?',
    addText: 'INSERT INTO textTrack(text) VALUES(?)',
    deleteTrack: 'DELETE FROM track WHERE track.id = ?',
    addHistory:  'INSERT INTO history(user_id, track_id, date) VALUES(?,?,?)',
    history: 'SELECT track.* FROM users JOIN history ON users.id = history.user_id JOIN track ON history.track_id = track.id WHERE history.user_id =?',
    tracksArtist: 'SELECT track.*, artist.name as artistName, textTrack.text FROM track_artist JOIN artist ON artist.id = track_artist.artist_id JOIN track ON track.id = track_artist.track_id LEFT OUTER JOIN textTrack ON track.textTrack_id = textTrack.id WHERE artist.id = ?',
    trackGenre: 'SELECT track.*, artist.name as artistName, textTrack.text FROM track_artist JOIN artist ON artist.id = track_artist.artist_id JOIN track ON track.id = track_artist.track_id LEFT OUTER JOIN textTrack ON track.textTrack_id = textTrack.id JOIN track_genre ON track_genre.track_id = track.id JOIN genres ON track_genre.genre_id = genres.id WHERE genres.id = ?',
    tracksAlbum: 'SELECT track.*, albom.name AS albomName,artist.name AS artistName, artist.id AS artistId, textTrack.text FROM albom JOIN track_albom ON albom.id = track_albom.albom_id JOIN track ON track_albom.track_id = track.id JOIN textTrack ON track.textTrack_id = textTrack.id JOIN track_artist ON track.id = track_artist.track_id JOIN artist ON track_artist.artist_id = artist.id WHERE albom.id = ?',
    tracksPlaylist: 'SELECT track.*, playlist.id AS playlistId, playlist.name AS playlistName, artist.name AS artistName, textTrack.text FROM playlist JOIN track_playlist ON track_playlist.playlist_id = playlist.id JOIN track ON track_playlist.track_id = track.id LEFT JOIN track_artist ON track.id = track_artist.track_id LEFT JOIN artist ON artist.id = track_artist.artist_id LEFT OUTER JOIN textTrack ON textTrack.id = track.id WHERE playlist.id = ?'


};
module.exports = TrackSQL;