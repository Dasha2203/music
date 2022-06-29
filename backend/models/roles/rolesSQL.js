let rolesSQL = {
    insert: 'INSERT INTO role(name) VALUES(?)', // Вставить данные
    drop: 'DROP TABLE role', // Удалить все данные в таблице
    queryAll: 'SELECT * FROM role', // Найти все данные в таблице
    getRoleByName: 'SELECT * FROM role WHERE name = ?', // Найти данные, отвечающие условиям
};
module.exports = rolesSQL;