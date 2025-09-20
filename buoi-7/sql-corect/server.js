import express from 'express'
import mysql from "mysql2/promise";

const app = express();
const PORT = 3000;

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "18012006",
    database: "quanli_sinhvien"
});

app.use(express.json());

const router = express.Router();

router.get("/", async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM students");
    res.json(rows);
});

router.post("/", async (req, res) => {
    const { name, age, major } = req.body;
    const [result] = await pool.query(
        "INSERT INTO students (name, age, major) VALUES (?, ?, ?)",
        [name, age, major]
    );
    res.json({ message: "Thêm thành công", id: result.insertId });
});

app.use("/students", router);

app.listen(PORT, () => {
    console.log(`Server chạy tại: http://localhost:${PORT}`);
});
