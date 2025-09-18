import express from 'express'
const app = express();
const PORT = 3000;


app.use(express.json());

const students = [
    { id: "1", name: "Cao Thiên Quí", age: 19, sex: "Nam" },
    { id: "2", name: "Trần Thanh Phú💩💩💩💩💩", age: 19, sex: "Nam" },
    { id: "3", name: "Nguyễn Duy Phước", age: 19, sex: "Nam" },
    { id: "4", name: "Nguyễn Trần Kim Tú 🖕🖕🖕", age: 19, sex: "Gay" },
    { id: "5", name: " ❤️Bạch Lê Ngọc Diệp ❤️", age: 19, sex: "Nữ" },
];

app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    const student = students.find(s => s.id === id);

    if (student) {
        res.json(student);
    }
    else {
        res.send("không tìm thấy student. ");
    }
});

app.post("/student", (req, res) => {
    const student = req.body;
    students.push(student);
    res.json(student);
})
app.listen(PORT, () => {
    console.log(`server chay tai:http://localhost:${PORT}`)
})
