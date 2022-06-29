let FavoritesSQL = {
    insert: 'INSERT INTO favorites(user_id, track_id) VALUES(?,?)', // Вставить данные
    drop: 'DROP TABLE albom', // Удалить все данные в таблице
    queryAll: 'SELECT track.*, textTrack.text, artist.name AS artistName, artist.id AS artistId FROM track JOIN favorites ON track.id = favorites.track_id JOIN track_artist ON track_artist.track_id = track.id JOIN artist ON track_artist.artist_id = artist.id LEFT OUTER JOIN textTrack ON track.textTrack_id = textTrack.id WHERE favorites.user_id = ?', // Найти все данные в таблице
    deleteFavorites: 'DELETE FROM favorites WHERE user_id = ? AND track_id = ?',
    getAlbumById: 'SELECT * FROM albom WHERE id =?', // Найти данные, отвечающие условиям
    getAlbumsArtist: 'SELECT albom.* FROM albom JOIN artist_albom ON artist_albom.albom_id = albom.id WHERE artist_albom.artist_id = ?',
    updateGenrae: 'UPDATE genres SET name =? WHERE id =?'
};
module.exports = FavoritesSQL;