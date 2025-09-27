import express from 'express';
import mysql from 'mysql2';
const app = express();
const port = 3000;

app.use(express.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '18012006',
    database: 'quanly_sinhvien'
});
db.connect((err) => {
    if (err) {
        console.log('Kết nối thất bại', err);
        return;
    }
    console.log('Kết nối thành công');
});
app.get('/students', (req, res) => {
    const sql = 'SELECT * FROM sinhvien1';
    db.query(sql, (err, results) => {
        if (err) {
            return res.json({ error: 'Lỗi truy vấn cơ sở dữ liệu' });
        }
        res.json(results);
    });
})
app.post('/students', (req, res) => {
    const { name, age, lop } = req.body;
    const sql = 'INSERT INTO sinhvien1 (name, age, class) VALUES (?, ?, ?)';
    db.query(sql, [name, age, lop], (err, results) => {
        if (err) {
            return res.json({ error: 'Lỗi thêm sinh viên' });
        }
        res.json({ message: 'Thêm sinh viên thành công', studentId: results.insertId });
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
