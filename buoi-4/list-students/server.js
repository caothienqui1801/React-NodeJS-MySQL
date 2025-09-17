import express from "express";
const app = express();
const PORT = 3000;
const routes = "/students"

const students = [
    { mssv: "001", name: "Cao Thiên Quí", age: 19, sex: "Nam" },
    { mssv: "002", name: "Trần Thanh Phú💩💩💩💩💩", age: 19, sex: "Nam" },
    { mssv: "003", name: "Nguyễn Duy Phước", age: 19, sex: "Nam" },
    { mssv: "004", name: "Nguyễn Trần Kim Tú 🖕🖕🖕", age: 19, sex: "Gay" },
    { mssv: "005", name: " ❤️Bạch Lê Ngọc Diệp ❤️", age: 19, sex: "Nữ" },
];

app.set("json spaces", 5);

app.get(routes, (req, res) => {
    res.json(students);
})
app.listen(PORT, () => {
    console.log(
        `Server chayj thành công tại: http://localhost:${PORT}${routes} `
    )
})