let PlaylistSQL = {
    insert: 'INSERT INTO playlist(name, srcImg) VALUES(?,?)', // Вставить данные
    drop: 'DROP TABLE genres', // Удалить все данные в таблице
    queryAll: 'SELECT * FROM playlist', // Найти все данные в таблице
    getGenreById: 'SELECT * FROM genres WHERE id =?', // Найти данные, отвечающие условиям
    getGenreLikeName: 'SELECT * FROM users WHERE name LIKE ?',
    updatePlaylist: 'UPDATE playlist SET name =? WHERE id =?',
    remove: 'DELETE FROM playlist WHERE playlist.id = ?'
};
module.exports = PlaylistSQL;