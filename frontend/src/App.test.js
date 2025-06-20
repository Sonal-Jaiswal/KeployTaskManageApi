import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5001/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null);

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    setTasks(await res.json());
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (editing) {
      await fetch(`${API_URL}/${editing.id}` , {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, completed: editing.completed }),
      });
      setEditing(null);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  const handleEdit = task => {
    setForm({ title: task.title, description: task.description });
    setEditing(task);
  };

  const handleDelete = async id => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const toggleComplete = async task => {
    await fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, completed: !task.completed }),
    });
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">{editing ? "Update" : "Add"} Task</button>
        {editing && <button onClick={() => { setEditing(null); setForm({ title: "", description: "" }); }}>Cancel</button>}
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ margin: "10px 0" }}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
              onClick={() => toggleComplete(task)}
            >
              {task.title}: {task.description}
            </span>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            {task.completed && <span> ✅</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
