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

  // Submit form thêm sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/students", form);
      alert("✅ Thêm sinh viên thành công!");
      setForm({ ten: "", tuoi: "", lop: "", email: "" });
      fetchStudents(); // load lại danh sách
    } catch (err) {
      console.error("❌ Lỗi khi thêm sinh viên:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sinh viên</h2>
      <ul>
        {students.map((sv) => (
          <li key={sv.id}>
            {sv.ten} - {sv.tuoi} tuổi - Lớp: {sv.lop} - Email: {sv.email}
          </li>
        ))}
      </ul>

      <h3>Thêm sinh viên</h3>
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
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
