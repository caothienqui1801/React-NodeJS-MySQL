import React from "react";
export default function App() {
  const students = [
    { mssv: "001", name: "Cao Thiên Quí", age: 19, sex: "Nam" },
    { mssv: "002", name: "Trần Thanh Phú💩💩💩💩💩", age: 19, sex: "Nam" },
    { mssv: "003", name: "Nguyễn Duy Phước", age: 19, sex: "Nam" },
    { mssv: "004", name: "Nguyễn Trần Kim Tú 🖕🖕🖕", age: 19, sex: "Gay" },
    { mssv: "005", name: " ❤️Bạch Lê Ngọc Diệp ❤️", age: 19, sex: "Nữ" },
  ];

  return (
    <div>
      <h3>Danh sach sinh vien  </h3>
      <ul>
        {students.map((s) => (
          <li key={s.mssv}>
            MSSV: {s.mssv}--------   {s.name},  {s.age} tuổi, Giới tính: {s.sex}.
          </li>

        ))}
      </ul>
    </div>
  );
}