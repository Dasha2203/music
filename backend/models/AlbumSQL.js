let GenresSQL = {
    insert: 'INSERT INTO albom(name, year, srcImg) VALUES(?,?,?)', // Вставить данные
    drop: 'DROP TABLE albom', // Удалить все данные в таблице
    queryAll: 'CALL getAlbums()', // Найти все данные в таблице
    getAlbumById: 'SELECT * FROM albom WHERE id =?', // Найти данные, отвечающие условиям
    getAlbumsArtist: 'SELECT albom.* FROM albom JOIN artist_albom ON artist_albom.albom_id = albom.id WHERE artist_albom.artist_id = ?',
    updateGenrae: 'UPDATE genres SET name =? WHERE id =?'
};
module.exports = GenresSQL;