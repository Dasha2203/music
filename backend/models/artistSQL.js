let ArtistSQL = {
    insert: 'INSERT INTO artist(name, description, srcImg) VALUES(?,?,?)', // Вставить данные
    drop: 'DROP TABLE artist', // Удалить все данные в таблице
    queryAll: 'SELECT * FROM artist', // Найти все данные в таблице
    getArtistById: 'SELECT * FROM artist WHERE id =?', // Найти данные, отвечающие условиям
    getGenreLikeName: 'SELECT * FROM users WHERE name LIKE ?',
    updateArtist: 'UPDATE artist SET name =? WHERE id =?',
    getCount: 'CALL getCountArtist()'
};
module.exports = ArtistSQL;