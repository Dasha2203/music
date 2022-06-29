let GenresSQL = {
    insert: 'INSERT INTO genres(name, srcImage) VALUES(?,?)', // Вставить данные
    drop: 'DROP TABLE genres', // Удалить все данные в таблице
    queryAll: 'SELECT * FROM genres', // Найти все данные в таблице
    getGenreById: 'SELECT * FROM genres WHERE id =?', // Найти данные, отвечающие условиям
    getGenreLikeName: 'SELECT * FROM users WHERE name LIKE ?',
    updateGenrae: 'UPDATE genres SET name =? WHERE id =?'
};
module.exports = GenresSQL;