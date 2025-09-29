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
  const [editId, setEditId] = useState(null); // Lưu id đang sửa

  // Lấy danh sách sinh viên khi load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/students");
      setStudents(res.data);
    } catch (err) {
      console.error("❌ Lỗi khi lấy dữ liệu:", err);
    }
  };

  // Cập nhật form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form (thêm hoặc sửa)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Cập nhật
        await axios.put(`http://localhost:3000/students/${editId}`, form);
        alert("✏️ Cập nhật sinh viên thành công!");
        setEditId(null);
      } else {
        // Thêm mới
        await axios.post("http://localhost:3000/students", form);
        alert("✅ Thêm sinh viên thành công!");
      }
      setForm({ ten: "", tuoi: "", lop: "", email: "" });
      fetchStudents(); // load lại danh sách
    } catch (err) {
      console.error("❌ Lỗi khi thêm/cập nhật sinh viên:", err);
    }
  };

  // Xóa sinh viên
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sinh viên này?")) return;
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      alert("🗑️ Xóa sinh viên thành công!");
      fetchStudents();
    } catch (err) {
      console.error("❌ Lỗi khi xóa sinh viên:", err);
    }
  };

  // Chọn sinh viên để sửa
  const handleEdit = (sv) => {
    setForm(sv);
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
