import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:5001/api/tasks";

const mainFont = {
  fontFamily: 'Inter, Segoe UI, Arial, sans-serif'
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setError("");
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      setTasks(await res.json());
    } catch (err) {
      setTasks([]);
      setError("Cannot connect to backend. Please make sure the server is running.");
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setError("");
      if (editing) {
        await fetch(`${API_URL}/${editing._id}` , {
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
    } catch (err) {
      setError("Cannot connect to backend. Please make sure the server is running.");
    }
  };

  const handleEdit = task => {
    setForm({ title: task.title, description: task.description });
    setEditing(task);
  };

  const handleDelete = async id => {
    try {
      setError("");
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (err) {
      setError("Cannot connect to backend. Please make sure the server is running.");
    }
  };

  const toggleComplete = async task => {
    try {
      setError("");
      await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });
      fetchTasks();
    } catch (err) {
      setError("Cannot connect to backend. Please make sure the server is running.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)', padding: 0, margin: 0, ...mainFont }}>
      <div style={{ maxWidth: 540, margin: "48px auto 0 auto", background: "#fff", borderRadius: 22, boxShadow: "0 8px 32px rgba(80,80,180,0.10)", padding: 40, transition: 'box-shadow 0.2s', position: 'relative' }}>
        <h1 style={{ textAlign: "center", color: "#4f46e5", marginBottom: 32, fontWeight: 800, letterSpacing: 1, fontSize: 38, lineHeight: 1.1, textShadow: '0 2px 8px #6366f122' }}>
          <span role="img" aria-label="Task">📝</span> Task Manager
        </h1>
        {error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '12px 18px', borderRadius: 8, marginBottom: 18, textAlign: 'center', fontWeight: 500, boxShadow: '0 2px 8px #fca5a5aa' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 14, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ flex: 1, minWidth: 120, padding: 12, borderRadius: 10, border: "1.5px solid #c7d2fe", fontSize: 17, background: '#f3f4f6', outline: 'none', transition: 'border 0.2s', fontWeight: 500 }}
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={{ flex: 2, minWidth: 120, padding: 12, borderRadius: 10, border: "1.5px solid #c7d2fe", fontSize: 17, background: '#f3f4f6', outline: 'none', transition: 'border 0.2s', fontWeight: 500 }}
          />
          <button
            type="submit"
            style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontWeight: 700, cursor: "pointer", fontSize: 17, boxShadow: '0 2px 8px #6366f133', transition: 'background 0.2s, box-shadow 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#4338ca'}
            onMouseOut={e => e.currentTarget.style.background = '#6366f1'}
          >
            {editing ? "Update" : "Add"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => { setEditing(null); setForm({ title: "", description: "" }); }}
              style={{ background: "#f3f4f6", color: "#4b5563", border: "none", borderRadius: 10, padding: "12px 22px", fontWeight: 700, cursor: "pointer", fontSize: 17, boxShadow: '0 2px 8px #cbd5e1aa', transition: 'background 0.2s, box-shadow 0.2s' }}
              onMouseOver={e => e.currentTarget.style.background = '#e0e7ef'}
              onMouseOut={e => e.currentTarget.style.background = '#f3f4f6'}
            >
              Cancel
            </button>
          )}
        </form>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tasks.length === 0 && !error && <li style={{ textAlign: 'center', color: '#9ca3af', fontSize: 18, margin: '32px 0' }}>No tasks yet.</li>}
          {tasks.map(task => (
            <li key={task._id} style={{
              margin: "18px 0", display: "flex", alignItems: "center", justifyContent: "space-between", background: task.completed ? "#e0e7ff" : "#f3f4f6", borderRadius: 14, padding: "18px 24px", boxShadow: task.completed ? "0 2px 8px #6366f133" : "0 1px 4px #cbd5e133", transition: 'box-shadow 0.2s', border: task.completed ? '1.5px solid #6366f1' : '1.5px solid #e5e7eb' }}>
              <div style={{ flex: 1, cursor: "pointer" }} onClick={() => toggleComplete(task)}>
                <div style={{
                  textDecoration: task.completed ? "line-through underline" : "underline",
                  color: task.completed ? "#6366f1" : "#111827",
                  fontWeight: 700,
                  fontSize: 20,
                  marginBottom: 4,
                  letterSpacing: 0.5,
                  transition: 'color 0.2s, text-decoration 0.2s'
                }}>
                  {task.title}
                </div>
                <div style={{ color: "#6b7280", fontSize: 16, marginLeft: 2, marginBottom: 2, fontWeight: 500 }}>{task.description}</div>
                <div style={{ display: 'inline-block', marginTop: 6 }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '3px 14px',
                    borderRadius: 8,
                    background: task.completed ? '#22c55e' : '#d1d5db',
                    color: task.completed ? '#fff' : '#374151',
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: 1,
                    boxShadow: task.completed ? '0 1px 4px #22c55e33' : '0 1px 4px #d1d5db33',
                    transition: 'background 0.2s, color 0.2s'
                  }}>
                    {task.completed ? 'Done' : 'Todo'}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => handleEdit(task)}
                  style={{ background: "#fbbf24", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, cursor: "pointer", fontSize: 16, boxShadow: '0 1px 4px #fbbf2433', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = '#d97706'}
                  onMouseOut={e => e.currentTarget.style.background = '#fbbf24'}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, cursor: "pointer", fontSize: 16, boxShadow: '0 1px 4px #ef444433', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = '#b91c1c'}
                  onMouseOut={e => e.currentTarget.style.background = '#ef4444'}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ textAlign: 'center', color: '#a5b4fc', marginTop: 32, fontSize: 16, fontWeight: 500, letterSpacing: 0.5 }}>
        Made with <span style={{ color: '#6366f1', fontWeight: 700 }}>React</span> & <span style={{ color: '#6366f1', fontWeight: 700 }}>Express</span>
      </div>
    </div>
  );
}

export default App;
