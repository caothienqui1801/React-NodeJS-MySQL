import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "18012006",
    database: "quanly_sinhvien",
});

db.connect((err) => {
    if (err) {
        console.error("Kết nối thất bại:", err);
        return;
    }
    console.log("Kết nối MySQL thành công!");
});

app.get("/students", (req, res) => {
    db.query("SELECT * FROM sinhvien1", (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post("/students", (req, res) => {
    const { ten, tuoi, lop, email } = req.body;
    db.query(
        "INSERT INTO sinhvien1 (ten, tuoi, lop, email) VALUES (?, ?, ?, ?)",
        [ten, tuoi, lop, email],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: "Thêm sinh viên thành công" });
        }
    );
});

app.put("/students/:id", (req, res) => {
    const { id } = req.params;
    const { ten, tuoi, lop, email } = req.body;
    console.log("👉 Dữ liệu nhận được để update:", { id, ten, tuoi, lop, email });

    const sql = "UPDATE sinhvien1 SET ten=?, tuoi=?, lop=?, email=? WHERE id=?";
    db.query(sql, [ten, tuoi, lop, email, id], (err, result) => {
        if (err) {
            console.error("❌ Lỗi khi cập nhật:", err); // In chi tiết lỗi MySQL
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Cập nhật thành công", result });
    });
});

app.delete("/students/:id", (req, res) => {
    const { id } = req.params;
    const studentId = parseInt(id);

    const sql = "DELETE FROM sinhvien1 WHERE id = ?";

    db.query(sql, [studentId], (err, result) => {
        if (err) {
            console.error("Lỗi khi xoá:", err);
            return res.status(500).json({ error: "Lỗi server khi xoá" });
        }
        res.json({ message: "Xoá thành công", deletedId: studentId });
    });
});
app.listen(port, () => {
    console.log(`Server chạy tại http://localhost:${port}`);
});
