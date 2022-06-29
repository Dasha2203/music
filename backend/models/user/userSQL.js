let UserSQL = {
    insert: 'INSERT INTO users(name, email, password, dateRegister, role_id) VALUES(?,?,?,?,?)', // Вставить данные
    drop: 'DROP TABLE users', // Удалить все данные в таблице
    queryAll: 'SELECT * FROM users', // Найти все данные в таблице
    getUserById: 'SELECT * FROM users WHERE id =?', // Найти данные, отвечающие условиям
    getUserLikeEmail: 'SELECT * FROM users WHERE email LIKE ?',
    updateUser: 'UPDATE users SET name =?, email =? WHERE id =?'
};
module.exports = UserSQL;