import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    class: "",
    email: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Dữ liệu sinh viên:", form);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form nhập sinh viên</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Tên:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Tuổi:
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Lớp:
            <input
              type="text"
              name="class"
              value={form.class}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit">Gửi</button>
      </form>
    </div>
  );
}

export default App;
