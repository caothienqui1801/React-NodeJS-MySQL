import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentApp() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    ten: "",
    tuoi: "",
    lop: "",
    email: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchStudents = () => {
    axios.get("http://localhost:3000/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("❌ Lỗi khi lấy dữ liệu:", err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...form,
      tuoi: form.tuoi ? Number(form.tuoi) : null
    };

    if (editId) {
      axios.put(`http://localhost:3000/students/${editId}`, dataToSend)
        .then(() => {
          alert("✏️ Cập nhật sinh viên thành công!");
          setEditId(null);
          setForm({ ten: "", tuoi: "", lop: "", email: "" });
          fetchStudents();
        })
        .catch((err) => console.error("❌ Lỗi khi cập nhật:", err));
    } else {
      axios.post("http://localhost:3000/students", dataToSend)
        .then((res) => {
          alert(res.data.message || "✅ Thêm sinh viên thành công!");
          setForm({ ten: "", tuoi: "", lop: "", email: "" });
          fetchStudents();
        })
        .catch((err) => console.error("❌ Lỗi khi thêm sinh viên:", err));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/students/${id}`)
      .then(() => {
        // Cập nhật state trực tiếp để giao diện phản hồi nhanh hơn
        setStudents(students.filter(sv => sv.id !== id));
        alert("🗑️ Xóa sinh viên thành công!");
      })
      .catch(err => console.error("❌ Lỗi khi xóa sinh viên:", err));
  };

  const handleEdit = (sv) => {
    setForm({
      ten: sv.ten,
      tuoi: sv.tuoi,
      lop: sv.lop,
      email: sv.email,
    });
    setEditId(sv.id);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sinh viên</h2>
      <ul>
        {students.map((sv) => (
          <li key={sv.id}>
            {sv.ten} - {sv.tuoi} tuổi - Lớp: {sv.lop} - Email: {sv.email}
            <button onClick={() => handleEdit(sv)} style={{ marginLeft: "10px" }}>
              Sửa
            </button>
            <button onClick={() => handleDelete(sv.id)} style={{ marginLeft: "5px" }}>
              Xóa
            </button>
          </li>
        ))}
      </ul>

      <h3>{editId ? "Cập nhật sinh viên" : "Thêm sinh viên"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ten"
          placeholder="Tên"
          value={form.ten}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="tuoi"
          placeholder="Tuổi"
          value={form.tuoi}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lop"
          placeholder="Lớp"
          value={form.lop}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? "Cập nhật" : "Thêm"}</button>
      </form>
    </div>
  );
}