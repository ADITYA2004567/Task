// import { useState, useEffect } from "react";

// const STORAGE_KEY = "react_todo_tasks_v1";

// function generateId() {
//   return Date.now().toString(36) + Math.random().toString(36).slice(2);
// }

// function loadTasks() {
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : [];
//   } catch {
//     return [];
//   }
// }

// function saveTasks(tasks) {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
//   } catch {}
// }

// export default function TodoApp() {
//   const [tasks, setTasks] = useState(loadTasks);
//   const [input, setInput] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState("");
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   const [showOnlineBanner, setShowOnlineBanner] = useState(false);

//   useEffect(() => {
//     saveTasks(tasks);
//   }, [tasks]);

//   useEffect(() => {
//     const handleOffline = () => setIsOnline(false);
//     const handleOnline = () => {
//       setIsOnline(true);
//       setShowOnlineBanner(true);
//       setTimeout(() => setShowOnlineBanner(false), 3000);
//     };
//     window.addEventListener("offline", handleOffline);
//     window.addEventListener("online", handleOnline);
//     return () => {
//       window.removeEventListener("offline", handleOffline);
//       window.removeEventListener("online", handleOnline);
//     };
//   }, []);

//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (tasks.some((t) => !t.done)) {
//         e.preventDefault();
//         e.returnValue = "";
//       }
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [tasks]);

//   const addTask = () => {
//     const text = input.trim();
//     if (!text) return;
//     setTasks((prev) => [
//       { id: generateId(), text, done: false, createdAt: Date.now() },
//       ...prev,
//     ]);
//     setInput("");
//   };

//   const toggleDone = (id) => {
//     setTasks((prev) =>
//       prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
//     );
//   };

//   const deleteTask = (id) => {
//     setTasks((prev) => prev.filter((t) => t.id !== id));
//     if (editingId === id) setEditingId(null);
//   };

//   const startEdit = (task) => {
//     setEditingId(task.id);
//     setEditText(task.text);
//   };

//   const saveEdit = (id) => {
//     const text = editText.trim();
//     if (text) {
//       setTasks((prev) =>
//         prev.map((t) => (t.id === id ? { ...t, text } : t))
//       );
//     }
//     setEditingId(null);
//     setEditText("");
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditText("");
//   };

//   const filteredTasks = tasks.filter((t) => {
//     if (filter === "active") return !t.done;
//     if (filter === "done") return t.done;
//     return true;
//   });

//   const doneCount = tasks.filter((t) => t.done).length;
//   const totalCount = tasks.length;

//   const styles = {
//     wrapper: {
//       minHeight: "100vh",
//       background: "#f8f7f4",
//       display: "flex",
//       alignItems: "flex-start",
//       justifyContent: "center",
//       padding: "2rem 1rem",
//       fontFamily: "'Segoe UI', system-ui, sans-serif",
//     },
//     card: {
//       background: "#ffffff",
//       borderRadius: "16px",
//       boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
//       padding: "2rem",
//       width: "100%",
//       maxWidth: "560px",
//     },
//     heading: {
//       fontSize: "26px",
//       fontWeight: "600",
//       color: "#1a1a1a",
//       marginBottom: "4px",
//     },
//     sub: {
//       fontSize: "14px",
//       color: "#888",
//       marginBottom: "1.5rem",
//     },
//     offlineBanner: {
//       background: "#FAEEDA",
//       color: "#633806",
//       border: "1px solid #EF9F27",
//       borderRadius: "8px",
//       padding: "10px 14px",
//       fontSize: "13px",
//       marginBottom: "1rem",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//     },
//     onlineBanner: {
//       background: "#EAF3DE",
//       color: "#27500A",
//       border: "1px solid #639922",
//       borderRadius: "8px",
//       padding: "10px 14px",
//       fontSize: "13px",
//       marginBottom: "1rem",
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//     },
//     inputRow: {
//       display: "flex",
//       gap: "8px",
//       marginBottom: "1.25rem",
//     },
//     input: {
//       flex: 1,
//       height: "40px",
//       padding: "0 12px",
//       border: "1.5px solid #e0e0e0",
//       borderRadius: "8px",
//       fontSize: "14px",
//       color: "#1a1a1a",
//       outline: "none",
//       background: "#fafafa",
//     },
//     addBtn: {
//       height: "40px",
//       padding: "0 18px",
//       background: "#185FA5",
//       color: "#fff",
//       border: "none",
//       borderRadius: "8px",
//       fontSize: "14px",
//       fontWeight: "500",
//       cursor: "pointer",
//     },
//     filters: {
//       display: "flex",
//       gap: "6px",
//       marginBottom: "1.25rem",
//     },
//     filterBtn: (active) => ({
//       padding: "5px 14px",
//       borderRadius: "20px",
//       border: "1.5px solid",
//       borderColor: active ? "#185FA5" : "#e0e0e0",
//       background: active ? "#E6F1FB" : "#fff",
//       color: active ? "#185FA5" : "#888",
//       fontSize: "13px",
//       cursor: "pointer",
//       fontWeight: active ? "600" : "400",
//     }),
//     taskItem: (done) => ({
//       display: "flex",
//       alignItems: "flex-start",
//       gap: "10px",
//       padding: "12px 14px",
//       borderRadius: "10px",
//       border: "1px solid #f0f0f0",
//       background: done ? "#fafafa" : "#fff",
//       marginBottom: "8px",
//       opacity: done ? 0.6 : 1,
//     }),
//     checkbox: (done) => ({
//       width: "20px",
//       height: "20px",
//       borderRadius: "5px",
//       border: done ? "none" : "2px solid #ccc",
//       background: done ? "#185FA5" : "transparent",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       cursor: "pointer",
//       flexShrink: 0,
//       marginTop: "2px",
//     }),
//     taskText: (done) => ({
//       flex: 1,
//       fontSize: "14px",
//       color: done ? "#aaa" : "#1a1a1a",
//       textDecoration: done ? "line-through" : "none",
//       lineHeight: "1.5",
//       wordBreak: "break-word",
//     }),
//     editInput: {
//       flex: 1,
//       padding: "4px 8px",
//       border: "1.5px solid #185FA5",
//       borderRadius: "6px",
//       fontSize: "14px",
//       color: "#1a1a1a",
//       outline: "none",
//       background: "#f0f6ff",
//     },
//     actionBtn: (color) => ({
//       padding: "4px 10px",
//       borderRadius: "6px",
//       border: "1px solid #e0e0e0",
//       background: "transparent",
//       color: color || "#888",
//       fontSize: "12px",
//       cursor: "pointer",
//     }),
//     emptyMsg: {
//       textAlign: "center",
//       padding: "2.5rem",
//       color: "#bbb",
//       fontSize: "14px",
//     },
//     stats: {
//       textAlign: "right",
//       fontSize: "13px",
//       color: "#bbb",
//       marginTop: "0.75rem",
//     },
//   };

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.card}>
//         <h1 style={styles.heading}>Task Tracker</h1>
//         <p style={styles.sub}>
//           {totalCount === 0
//             ? "Add a task to get started"
//             : `${doneCount} of ${totalCount} tasks completed`}
//         </p>

//         {!isOnline && (
//           <div style={styles.offlineBanner}>
//             <span>⚠</span>
//             <span>
//               <strong>You are offline.</strong> Tasks are saved locally and will
//               sync when you reconnect.
//             </span>
//           </div>
//         )}

//         {isOnline && showOnlineBanner && (
//           <div style={styles.onlineBanner}>
//             <span>✓</span>
//             <span>
//               <strong>Back online!</strong> All your tasks are safe.
//             </span>
//           </div>
//         )}

//         <div style={styles.inputRow}>
//           <input
//             style={styles.input}
//             type="text"
//             placeholder="Add a new task..."
//             value={input}
//             maxLength={200}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && addTask()}
//           />
//           <button style={styles.addBtn} onClick={addTask}>
//             Add task
//           </button>
//         </div>

//         <div style={styles.filters}>
//           {["all", "active", "done"].map((f) => (
//             <button
//               key={f}
//               style={styles.filterBtn(filter === f)}
//               onClick={() => setFilter(f)}
//             >
//               {f.charAt(0).toUpperCase() + f.slice(1)}
//             </button>
//           ))}
//         </div>

//         {filteredTasks.length === 0 ? (
//           <div style={styles.emptyMsg}>No tasks here</div>
//         ) : (
//           filteredTasks.map((task) => (
//             <div key={task.id} style={styles.taskItem(task.done)}>
//               <div
//                 style={styles.checkbox(task.done)}
//                 onClick={() => toggleDone(task.id)}
//               >
//                 {task.done && (
//                   <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
//                     <path
//                       d="M1 4.5l3 3 6-7"
//                       stroke="white"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 )}
//               </div>

//               {editingId === task.id ? (
//                 <input
//                   style={styles.editInput}
//                   value={editText}
//                   autoFocus
//                   onChange={(e) => setEditText(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") saveEdit(task.id);
//                     if (e.key === "Escape") cancelEdit();
//                   }}
//                 />
//               ) : (
//                 <span style={styles.taskText(task.done)}>{task.text}</span>
//               )}

//               <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
//                 {editingId === task.id ? (
//                   <>
//                     <button
//                       style={styles.actionBtn("#3B6D11")}
//                       onClick={() => saveEdit(task.id)}
//                     >
//                       save
//                     </button>
//                     <button
//                       style={styles.actionBtn()}
//                       onClick={cancelEdit}
//                     >
//                       cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       style={styles.actionBtn()}
//                       onClick={() => startEdit(task)}
//                     >
//                       edit
//                     </button>
//                     <button
//                       style={styles.actionBtn("#A32D2D")}
//                       onClick={() => deleteTask(task.id)}
//                     >
//                       delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))
//         )}

//         {totalCount > 0 && (
//           <div style={styles.stats}>
//             {doneCount} of {totalCount} completed
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import "./TodoApp.css";

const STORAGE_KEY = "react_todo_tasks_v1";

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

// Load tasks from localStorage
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Save tasks to localStorage
function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {}
}

export default function TodoApp() {
  const [tasks, setTasks] = useState(loadTasks);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineBanner, setShowOnlineBanner] = useState(false);

  // Save tasks whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Detect online/offline
  useEffect(() => {
    const handleOffline = () => setIsOnline(false);
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineBanner(true);
      setTimeout(() => setShowOnlineBanner(false), 3000);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // Warn before closing tab
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (tasks.some((t) => !t.done)) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [tasks]);

  // Add task
  const addTask = () => {
    const text = input.trim();
    if (!text) return;

    setTasks((prev) => [
      { id: generateId(), text, done: false, createdAt: Date.now() },
      ...prev,
    ]);

    setInput("");
  };

  // Toggle complete
  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Start editing
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  // Save edit
  const saveEdit = (id) => {
    const text = editText.trim();

    if (text) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, text } : t))
      );
    }

    setEditingId(null);
    setEditText("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  const doneCount = tasks.filter((t) => t.done).length;
  const totalCount = tasks.length;

  return (
    <div className="wrapper">
      <div className="card">
        <h1 className="heading">Task Tracker</h1>
        <p className="sub">
          {totalCount === 0
            ? "Add a task to get started"
            : `${doneCount} of ${totalCount} tasks completed`}
        </p>

        {!isOnline && (
          <div className="offlineBanner">
            ⚠ You are offline.
          </div>
        )}

        {isOnline && showOnlineBanner && (
          <div className="onlineBanner">
            ✓ Back online!
          </div>
        )}

        <div className="inputRow">
          <input
            className="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add task..."
          />
          <button className="addBtn" onClick={addTask}>
            Add
          </button>
        </div>

        <div className="filters">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              className={filter === f ? "activeFilter" : "filterBtn"}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredTasks.map((task) => (
          <div key={task.id} className="taskItem">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(task.id)}
            />

            {editingId === task.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span className={task.done ? "doneText" : ""}>
                {task.text}
              </span>
            )}

            <button onClick={() => startEdit(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}