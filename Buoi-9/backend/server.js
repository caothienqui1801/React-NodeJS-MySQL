import express from "express";
import mysql from "mysql2";
import cors from "cors";   // ⬅ thêm

const app = express();
const port = 3000;

app.use(cors());          // ⬅ cho phép mọi origin gọi API
app.use(express.json());


// Kết nối MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "18012006",
    database: "quanly_sinhvien",
});

db.connect((err) => {
    if (err) {
        console.error("❌ Kết nối thất bại:", err);
        return;
    }
    console.log("✅ Kết nối MySQL thành công!");
});

// GET: lấy danh sách sinh viên
app.get("/students", (req, res) => {
    db.query("SELECT * FROM sinhvien", (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
        }
        res.json(results);
    });
});

// POST: thêm sinh viên mới
app.post("/students", (req, res) => {
    const { ten, tuoi, lop, email } = req.body;
    const sql = "INSERT INTO sinhvien (ten, tuoi, lop, email) VALUES (?, ?, ?, ?)";
    db.query(sql, [ten, tuoi, lop, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Lỗi khi thêm sinh viên" });
        }
        res.json({ message: "✅ Thêm sinh viên thành công!", id: result.insertId });
    });
});

app.listen(port, () => {
    console.log(`🚀 Server đang chạy ở http://localhost:${port}`);
});
