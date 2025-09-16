export default function StudentTable() {
  const students = [
    { mssv: "001", name: "Cao Thiên Quí", age: 19, sex: "Nam" },
    { mssv: "002", name: "Trần Thanh Phú💩💩💩💩💩", age: 19, sex: "Nam" },
    { mssv: "003", name: "Nguyễn Duy Phước", age: 19, sex: "Nam" },
    { mssv: "004", name: "Nguyễn Trần Kim Tú 🖕🖕🖕", age: 19, sex: "Gay" },
    { mssv: "005", name: " ❤️Bạch Lê Ngọc Diệp ❤️", age: 19, sex: "Nữ" },
  ];

  return (
    <div>
      <h2>Danh sách sinh viên</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Tên</th>
            <th>Tuổi</th>
            <th>Giới tính</th>
          </tr>
        </thead>
        <tbody>
          {students.map((sv) => (
            <tr key={sv.mssv}>
              <td>{sv.mssv}</td>
              <td>{sv.name}</td>
              <td>{sv.age}</td>
              <td>{sv.sex}</td>
              <td>
                <button onClick={() => alert(`Tên sinh viên: ${sv.name}`)}>
                  Xem chi tiết tại đây
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
