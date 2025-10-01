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
    db.query("SELECT * FROM students", (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });
});

app.post("/students", (req, res) => {
    const { ten, tuoi, lop, email } = req.body;
    db.query(
        "INSERT INTO students (ten, tuoi, lop, email) VALUES (?, ?, ?, ?)",
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
    db.query(
        "UPDATE students SET ten=?, tuoi=?, lop=?, email=? WHERE id=?",
        [ten, tuoi, lop, email, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send({ message: "Cập nhật thành công" });
        }
    );
});

app.delete("/students/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM students WHERE id=?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "Xóa thành công" });
    });
});

app.listen(port, () => {
    console.log(`Server chạy tại http://localhost:${port}`);
});
