const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db'); // Импортируйте ваш файл db.js

const app = express();
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// Роут для регистрации
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Проверьте, существует ли пользователь
        const existingUser  = await pool.query('SELECT * FROM users WHERE username = \$1', [username]);
        if (existingUser .rows.length > 0) {
            return res.status(400).json({ success: false, error: 'Пользователь с таким именем уже существует.' });
        }

        // Создайте нового пользователя
        const newUser  = await pool.query('INSERT INTO users (username, password) VALUES (\$1, \$2) RETURNING *', [username, password]);
        res.status(201).json({ success: true, message: 'Вы успешно зарегистрированы!', user: newUser .rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Ошибка при регистрации: ' + error.message });
    }
});


// Роут для входа
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Найдите пользователя в базе данных
        const result = await pool.query('SELECT * FROM users WHERE username = \$1 AND password = \$2', [username, password]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, error: 'Неверное имя пользователя или пароль.' });
        }

        // Если пользователь найден, отправьте успешный ответ
        res.status(200).json({ success: true, message: 'Вход выполнен успешно!', user: result.rows[0] });
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        res.status(500).json({ success: false, error: 'Ошибка при входе: ' + error.message });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// 192.168.0.109