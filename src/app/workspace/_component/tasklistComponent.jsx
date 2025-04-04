"use client";
import { taskAction, postTaskAction, deleteTaskAction, patchTaskAction } from "@/app/action/taskAction";
import { Button } from "@/components/ui/button";
import { Clock, Ellipsis } from "lucide-react";
import React, { useState, useEffect } from "react";

const TasklistComponent = ({ workspaceId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Stores task being edited
  const [selectedStatus, setSelectedStatus] = useState("ALL"); // Track selected filter status

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await taskAction(workspaceId);
        if (!response || !response.payload) {
          throw new Error("Failed to load tasks");
        }
        setTasks(response.payload);
      } catch (err) {
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [workspaceId]);

  // Handle Task Deletion
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskAction(taskId, workspaceId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !== taskId));
      alert("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  // Handle Task Edit
  const handleEditTask = (task) => {
    setEditingTask(task); // Open edit form with task details
  };

  // Handle Task Update (Edit Task)
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = {
        ...editingTask,
        taskTitle: e.target.taskTitle.value,
        tag: e.target.tag.value,
        taskDetails: e.target.taskDetails.value,
      };

      // Update task via the patchTaskAction service
      const response = await patchTaskAction(workspaceId, editingTask.taskId, updatedTask);

      // Update the local task state with the updated task
      setTasks((prevTasks) => prevTasks.map((task) => (task.taskId === response.taskId ? response : task)));

      // Close the edit form and show success message
      setEditingTask(null);
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  // Add Task Form
  const handleAddTaskFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        taskTitle: e.target.taskTitle.value,
        tag: e.target.tag.value,
        endDate: e.target.endDate.value,
        taskDetails: e.target.taskDetails.value,
      };
      const newTask = await postTaskAction(workspaceId, formData);
      setTasks([...tasks, newTask]);
      setShowAddTaskForm(false);
      alert("Task created successfully!");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  // Define statuses with labels and colors
  const statuses = [
    { key: "NOT_STARTED", label: "Not Started", color: "red" },
    { key: "IN_PROGRESS", label: "In Progress", color: "blue" },
    { key: "FINISHED", label: "Finished", color: "green" },
  ];

  // Filter tasks by selected status
  const filteredTasks = selectedStatus === "ALL" 
    ? tasks 
    : tasks.filter((task) => task.status === selectedStatus);

  // Handle loading and error states
  if (loading) {
    return <p>Loading tasks...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  // Update task status
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updatedTask = await patchTaskAction(workspaceId, taskId, { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.taskId === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <main>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">HRD Design</h2>
        <Ellipsis />
      </div>

      {/* Status Filter Dropdown */}
      <div className="mb-4 flex justify-end">
        <select 
          className="p-2 border border-gray-300 rounded-lg"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="ALL">All</option>
          {statuses.map(({ key, label }) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Progress Indicators with Tasks */}
      <div className="flex justify-between space-y-8">
        {statuses.map(({ key, label, color }) => (
          <div key={key}>
            {/* Progress Indicator */}
            <div className="flex flex-col items-center mb-4">
              <span className="capitalize">{label}</span>
              <hr
                className={`w-24 border-t-2 border-${color}-500`}
              />
            </div>
            {/* Tasks */}
            <div className="space-y-4">
              {filteredTasks.filter((task) => task.status === key).length > 0 ? (
                filteredTasks.filter((task) => task.status === key).map((task) => (
                  <TaskCard
                    key={task.taskId}
                    task={task}
                    onDelete={() => handleDeleteTask(task.taskId)}
                    onEdit={() => handleEditTask(task)}
                    onStatusChange={handleStatusChange}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">No tasks in this category.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-600"
        onClick={() => setShowAddTaskForm(true)}
      >
        <span>+</span>
        New Task
      </button>

      {/* Add Task Pop-up Form */}
      {showAddTaskForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowAddTaskForm(false)}
            >
              ×
            </button>
            <h2 className="text-lg font-semibold">Create New Task</h2>
            <form onSubmit={handleAddTaskFormSubmit}>
              <div className="mt-4">
                <label htmlFor="title" className="block mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  name="taskTitle"
                  placeholder="Please type your task title"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="tag" className="block mb-2">Tag</label>
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  placeholder="Please select a tag"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="endDate" className="block mb-2">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  placeholder="Pick a date"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="details" className="block mb-2">Details</label>
                <textarea
                  id="details"
                  name="taskDetails"
                  placeholder="Provide some details about your task (optional)"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Task Pop-up Form */}
      {editingTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setEditingTask(null)}
            >
              ×
            </button>
            <h2 className="text-lg font-semibold">Edit Task</h2>
            <form onSubmit={handleUpdateTask}>
              <div className="mt-4">
                <label htmlFor="taskTitle" className="block mb-2">Title</label>
                <input
                  type="text"
                  id="taskTitle"
                  name="taskTitle"
                  defaultValue={editingTask.taskTitle}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="tag" className="block mb-2">Tag</label>
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  defaultValue={editingTask.tag}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="details" className="block mb-2">Details</label>
                <textarea
                  id="details"
                  name="taskDetails"
                  defaultValue={editingTask.taskDetails}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

// Task Card Component
const TaskCard = ({ task, onDelete, onEdit, onStatusChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-xl p-4 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold capitalize">{task.taskTitle}</h2>
        <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Ellipsis />
        </Button>
        {isDropdownOpen && (
          <div className="absolute top-10 right-0 bg-white border border-gray-300 rounded shadow-lg z-10">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => { onEdit(); setIsDropdownOpen(false); }}
            >
              Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
              onClick={() => { onDelete(); setIsDropdownOpen(false); }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <p className="my-2 text-gray-600">{task.taskDetails}</p>

      {/* Status Dropdown */}
      <div className="mt-2">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.taskId, e.target.value)}
          className="p-2 border rounded"
        >
          {["NOT_STARTED", "IN_PROGRESS", "FINISHED"].map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex justify-between">
        <p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-lg">{task.tag}</p>
        <p className="flex items-center gap-2 text-gray-500">
          <Clock size={18} /> {task.endDate}
        </p>
      </div>
    </div>
  );
};

export default TasklistComponent;
