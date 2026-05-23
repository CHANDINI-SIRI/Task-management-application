// C:\Users\ASUS\OneDrive\Desktop\Task-management\backend\server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors()); 
app.use(express.json());

// 🗄️ Core Production Mock Data Array Stream
let tasksMockDatabase = [
  {
    id: 1,
    title: "Review corporate financial assignment #work",
    priority: "High",
    dueDate: "Tomorrow",
    status: "Pending",
    category: "work",
    subtasks: [],
    attachments: []
  },
  {
    id: 2,
    title: "Morning 5k running routine #health",
    priority: "Medium",
    dueDate: "Today",
    status: "Completed",
    category: "health",
    subtasks: [],
    attachments: []
  },
  {
    id: 3,
    title: "Prepare next system architecture presentation deck #general",
    priority: "Medium",
    dueDate: "Monday",
    status: "Pending",
    category: "general",
    subtasks: [],
    attachments: []
  }
];

// 🛰️ GET: Expose Data Stream to Frontend Shell
app.get('/api/tasks', (req, res) => {
  console.log("📡 Server processing incoming tasks request stream...");
  res.json(tasksMockDatabase);
});

// 🛰️ POST: Write Intelligent NLP Tasks to Memory
app.post('/api/tasks', (req, res) => {
  const { title, priority, dueDate, category } = req.body;
  if (!title) return res.status(400).json({ error: "Missing title parameter." });

  const processedCategory = category ? category.toLowerCase().trim() : "general";
  const newTaskItem = {
    id: Date.now(),
    title: title.trim(),
    priority: priority || "Medium",
    dueDate: dueDate || "Today",
    status: "Pending",
    category: processedCategory,
    subtasks: [],
    attachments: []
  };

  tasksMockDatabase.unshift(newTaskItem);
  res.json(newTaskItem);
});

// 🛰️ PUT: Update Active Properties
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasksMockDatabase.findIndex(t => t.id === taskId);
  if (taskIndex === -1) return res.status(404).json({ error: "Task not found." });

  tasksMockDatabase[taskIndex] = { ...tasksMockDatabase[taskIndex], ...req.body };
  res.json(tasksMockDatabase[taskIndex]);
});

// 🛰️ DELETE: Purge Task Registry Item
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasksMockDatabase = tasksMockDatabase.filter(t => t.id !== taskId);
  res.json({ success: true, message: "Task dropped from system memory." });
});

app.listen(PORT, () => {
  console.log(`🚀 TaskFlow Backend Engine operational at http://localhost:${PORT}`);
});