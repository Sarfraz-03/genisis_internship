import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    grade: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ name: "", age: "", grade: "" });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      age: student.age,
      grade: student.grade
    });
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchStudents();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Student CRUD - MERN</h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="age"
            placeholder="Enter Age"
            value={form.age}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="grade"
            placeholder="Enter Grade"
            value={form.grade}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button style={styles.addBtn}>
            {editId ? "Update Student" : "Add Student"}
          </button>
        </form>

        {/* TABLE */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
                <td>
                  <div style={styles.actionGroup}>
                    <button
                      style={styles.editBtn}
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e1e2f, #2c3e50)",
    fontFamily: "Arial"
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "15px",
    width: "500px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    textAlign: "center"
  },
  title: {
    marginBottom: "25px",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  addBtn: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  actionGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "8px"
  },
  editBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2196F3",
    color: "white",
    cursor: "pointer"
  },
  deleteBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#f44336",
    color: "white",
    cursor: "pointer"
  }
};

export default App;