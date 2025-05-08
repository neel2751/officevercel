"use client";
import React, { useState } from "react";

import {
  CheckCircle2,
  Circle,
  Clock,
  Flag,
  Plus,
  ListTodo,
  Calendar,
  X,
  Paperclip,
  Mic,
} from "lucide-react";

// Types and Interfaces

const StatusTab = ({
  icon: Icon,

  label,

  count,

  isActive = false,

  onClick,
}) => (
  <button
    onClick={onClick}
    className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-gray-100 border border-gray-200 shadow-sm"
        : "bg-white border border-gray-100 hover:border-gray-200 hover:bg-gray-50"
    }`}
  >
    <div className="flex items-center gap-3">
      <Icon
        size={20}
        className={`transition-colors duration-200 ${
          isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
        }`}
      />

      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          isActive ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
        }`}
      >
        {label}
      </span>
    </div>

    {count !== undefined && (
      <span
        className={`text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "text-gray-900 bg-gray-200 px-2 py-0.5 rounded-full"
            : "text-gray-500 group-hover:text-gray-700"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

const TaskList = ({ tasks, onToggleTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-600 border border-red-200";

      case "medium":
        return "bg-yellow-50 text-yellow-600 border border-yellow-200";

      case "low":
        return "bg-green-50 text-green-600 border border-green-200";

      default:
        return "bg-gray-50 text-gray-600 border border-gray-200";
    }
  };

  const getInitials = (name) => {
    return name

      .split(" ")

      .map((word) => word[0])

      .join("")

      .toUpperCase();
  };

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
        >
          <div className="flex items-center gap-4">
            <button
              className={`rounded-full p-0.5 transition-colors duration-200 ${
                task.completed
                  ? "text-green-500 hover:text-green-600"
                  : "text-gray-300 hover:text-gray-400"
              }`}
              onClick={() => onToggleTask(task.id)}
            >
              {task.completed ? (
                <CheckCircle2 size={20} />
              ) : (
                <Circle size={20} />
              )}
            </button>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-medium transition-colors duration-200 ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </span>

                {task.flagged && <Flag size={14} className="text-red-500" />}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>

                <span className="text-xs text-gray-500 px-2 py-1 bg-gray-50 rounded-full border border-gray-200">
                  {task.issueType}
                </span>

                {task.scheduled && (
                  <span className="text-xs text-gray-500 flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-full border border-gray-200">
                    <Calendar size={12} />

                    {task.scheduled}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 text-xs font-medium border border-gray-200">
                {getInitials(task.assignee)}
              </div>

              <span className="text-sm text-gray-600">{task.assignee}</span>
            </div>

            <span className="text-sm text-gray-400 px-2 py-1 bg-gray-50 rounded-full border border-gray-100">
              {task.date}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const TaskModal = ({ isOpen, onClose, onSubmit }) => {
  const [newTask, setNewTask] = useState({
    title: "",

    assignee: "Assignee",

    priority: "High",

    status: "No status",

    issueType: "Issue type",

    flagged: false,

    scheduled: undefined,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Create task</h2>

          <button onClick={onClose}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Task title"
            className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />

          <div className="space-y-4">
            {[
              {
                label: "Assignee",
                field: "assignee",
                options: [
                  "Assignee",
                  "James Collins",
                  "Sarah Chen",
                  "Mike Johnson",
                ],
              },

              {
                label: "Priority",
                field: "priority",
                options: ["High", "Medium", "Low"],
              },

              {
                label: "Status",
                field: "status",
                options: ["No status", "In Progress", "Review", "Done"],
              },

              {
                label: "Issue type",
                field: "issueType",
                options: ["Issue type", "Bug", "Feature", "Task"],
              },
            ].map(({ label, field, options }) => (
              <div key={field} className="flex items-center gap-3">
                <span className="w-24 text-sm font-medium text-gray-700">
                  {label}
                </span>

                <select
                  className="flex-1 p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-gray-500"
                  value={newTask}
                  onChange={(e) =>
                    setNewTask({ ...newTask, [field]: e.target.value })
                  }
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="flex items-center gap-3">
              <span className="w-24 text-sm font-medium text-gray-700">
                Scheduled
              </span>

              <input
                type="date"
                className="flex-1 p-3 bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-gray-500"
                onChange={(e) =>
                  setNewTask({ ...newTask, scheduled: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="w-24 text-sm font-medium text-gray-700">
                Flagged
              </span>

              <input
                type="checkbox"
                className="h-4 w-4 text-gray-900 rounded focus:ring-gray-500"
                checked={newTask.flagged}
                onChange={(e) =>
                  setNewTask({ ...newTask, flagged: e.target.checked })
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 p-2 border rounded-lg">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border-0 focus:ring-0"
            />

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Paperclip size={20} className="text-gray-500" />
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Mic size={20} className="text-gray-500" />
              </button>

              <button
                onClick={() => {
                  if (newTask.title) {
                    onSubmit(newTask);

                    onClose();
                  }
                }}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Create task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState("all");

  const [tasks, setTasks] = useState([
    {
      id: "1",

      title: "Implement new authentication flow",

      assignee: "James Collins",

      date: "Apr 19, 2025",

      completed: false,

      priority: "High",

      status: "In Progress",

      issueType: "Feature",

      flagged: true,

      scheduled: "2025-04-25",
    },

    {
      id: "2",

      title: "Design system documentation update",

      assignee: "Sarah Chen",

      date: "Apr 19, 2025",

      completed: false,

      priority: "Medium",

      status: "Review",

      issueType: "Task",

      flagged: false,

      scheduled: "2025-04-22",
    },

    {
      id: "3",

      title: "Fix mobile responsive issues",

      assignee: "Mike Johnson",

      date: "Apr 19, 2025",

      completed: true,

      priority: "High",

      status: "Done",

      issueType: "Bug",

      flagged: true,
    },
  ]);

  const handleToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: `task-${tasks.length + 1}`,

      title: newTaskData.title || "Untitled Task",

      assignee: newTaskData.assignee || "Unassigned",

      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),

      completed: false,

      priority: newTaskData.priority,

      status: newTaskData.status || "No status",

      issueType: newTaskData.issueType || "Issue type",

      flagged: newTaskData.flagged || false,

      scheduled: newTaskData.scheduled,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const getFilteredTasks = () => {
    let filtered = tasks;

    switch (activeTab) {
      case "today":
        filtered = tasks.filter(
          (task) =>
            task.date ===
            new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
        );

        break;

      case "completed":
        filtered = tasks.filter((task) => task.completed);

        break;

      case "scheduled":
        filtered = tasks.filter((task) => task.scheduled !== undefined);

        break;

      case "flagged":
        filtered = tasks.filter((task) => task.flagged);

        break;
    }

    return filtered;
  };

  const organizeTasksByStatus = (tasks) => {
    return {
      flagged: tasks.filter((task) => task.flagged && !task.completed),

      todo: tasks.filter((task) => !task.completed && !task.flagged),

      completed: tasks.filter((task) => task.completed),
    };
  };

  const filteredTasks = getFilteredTasks();

  const organizedTasks = organizeTasksByStatus(filteredTasks);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 p-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              <Plus size={18} />

              <span>Add task</span>
            </button>

            <StatusTab
              icon={Clock}
              label="Today"
              count={
                tasks.filter(
                  (t) =>
                    t.date ===
                    new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                ).length
              }
              isActive={activeTab === "today"}
              onClick={() => setActiveTab("today")}
            />

            <StatusTab
              icon={Calendar}
              label="Scheduled"
              count={tasks.filter((t) => t.scheduled).length}
              isActive={activeTab === "scheduled"}
              onClick={() => setActiveTab("scheduled")}
            />

            <StatusTab
              icon={ListTodo}
              label="All"
              count={tasks.length > 99 ? "99+" : tasks.length}
              isActive={activeTab === "all"}
              onClick={() => setActiveTab("all")}
            />

            <StatusTab
              icon={Flag}
              label="Flagged"
              count={tasks.filter((t) => t.flagged).length}
              isActive={activeTab === "flagged"}
              onClick={() => setActiveTab("flagged")}
            />

            <StatusTab
              icon={CheckCircle2}
              label="Completed"
              count={tasks.filter((t) => t.completed).length}
              isActive={activeTab === "completed"}
              onClick={() => setActiveTab("completed")}
            />
          </div>

          <div className="space-y-8">
            {organizedTasks.flagged.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Flag size={16} className="text-red-500" />

                  <h2 className="text-sm font-medium text-gray-900">
                    Flagged Tasks
                  </h2>

                  <span className="text-sm text-gray-400">
                    ({organizedTasks.flagged.length})
                  </span>
                </div>

                <TaskList
                  tasks={organizedTasks.flagged}
                  onToggleTask={handleToggleTask}
                />
              </div>
            )}

            {organizedTasks.todo.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ListTodo size={16} className="text-gray-400" />

                  <h2 className="text-sm font-medium text-gray-900">To Do</h2>

                  <span className="text-sm text-gray-400">
                    ({organizedTasks.todo.length})
                  </span>
                </div>

                <TaskList
                  tasks={organizedTasks.todo}
                  onToggleTask={handleToggleTask}
                />
              </div>
            )}

            {organizedTasks.completed.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-500" />

                  <h2 className="text-sm font-medium text-gray-900">
                    Completed
                  </h2>

                  <span className="text-sm text-gray-400">
                    ({organizedTasks.completed.length})
                  </span>
                </div>

                <TaskList
                  tasks={organizedTasks.completed}
                  onToggleTask={handleToggleTask}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default TaskManager;
