// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteTask, editTask } from "../services/task";
import { RotateCcw, Trash2 } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState({
    "To Do": [],
    "In Progress": [],
    Done: [],
  });
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(res.data);
    } catch (error) {
      alert("Session expired. Please login again.");
      console.log("Error in fetchTasks dashboard", error);
      navigate("/");
    }
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setTitle("");
    fetchTasks();
  };

  const handleUpdate = async (id, status) => {
    const nextStatus =
      status === "To Do"
        ? "In Progress"
        : status === "In Progress"
        ? "Done"
        : "To Do";
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      { status: nextStatus },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Task Manager</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
      >
        Logout
      </button>

      <div className="flex flex-col md:flex-row justify-center items-start gap-4">
        <div className="w-full md:w-1/3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New Task Title"
            className="w-full p-2 mb-2 rounded bg-gray-800 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded"
          >
            Add Task
          </button>
        </div>
      </div>
      <div className="relative w-full md:w-1/3 mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className="pl-3 w-full p-2 rounded bg-gray-800 text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {Object.entries(tasks).map(([status, items]) => (
          <div key={status} className="bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{status}</h2>
            {items
              .filter((task) => task.title.toLowerCase().includes(search))
              .map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-700 p-2 mb-2 rounded flex justify-between items-center"
                >
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) =>
                      setTasks((prev) => ({
                        ...prev,
                        [status]: prev[status].map((t) =>
                          t.id === task.id ? { ...t, title: e.target.value } : t
                        ),
                      }))
                    }
                    onBlur={async () => {
                      await editTask(task.id, task.title);
                      fetchTasks();
                    }}
                    className="bg-transparent text-white outline-none w-full"
                  />
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleUpdate(task.id, task.status)}
                      className="text-yellow-400 hover:text-yellow-500"
                    >
                      <RotateCcw size={18} />
                    </button>

                    <button
                      onClick={async () => {
                        await deleteTask(task.id);
                        fetchTasks();
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
