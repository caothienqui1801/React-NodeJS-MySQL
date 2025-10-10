import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const port = 3000;
const routes = "/students"

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "18012006",
    database: "quanly_sinhvien",
});

// lay danh sach sinh vien

app.get(`${routes}`, (req, res) => {
    db.query("SELECT * FROM sinhvien1", (err, result) => {
        if (err) return res.status(500).send(err);
        res.send(result);
    });

});

// them sinh vien

app.post(`${routes}`, (req, res) => {
    const { ten, tuoi, lop, email } = req.body;
    const sql = "INSERT INTO sinhvien1 (ten, tuoi, lop, email) VALUE (?, ?, ?, ?)";
    db.query(
        sql,
        [ten, tuoi, lop, email],
        (err) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.send("Them sinh vien thanh cong");
            }
        }
    );
});

//cap nhat sinh vien

app.put(`${routes}`, (req, res) => {
    const { id } = req.params;
    const { ten, tuoi, lop, email } = res.body;
    const sql = "UPDATE sinhvien1 SET ten=?, tuoi=?, lop=?, email=? WHERE id=?";
    db.query(
        sql,
        [ten, tuoi, lop, email, id],
        (err) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.send("Them sinh vien thanh cong");
            }
        }
    );
});

// xoa sinh vien

app.delete(`${routes}`, (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM sinhvien1 WHERE id=?";

    db.query(
        sql,
        [id],
        (err) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.send("Xoa sinh vien thanh cong!");
            }
        }
    );
});

//listen

app.listen(port, () => {
    console.log(`Server chạy tại http://localhost:${port}${routes}`);
});