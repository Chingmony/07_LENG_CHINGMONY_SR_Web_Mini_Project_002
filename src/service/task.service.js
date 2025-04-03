import headerToken from "@/app/api/headerToken";

// Fetch all tasks for a specific workspace
export const getAllTasks = async (workspaceId) => {
  const token = await headerToken();
  const res = await fetch(`${process.env.NEXT_APIURL}/tasks/workspace/${workspaceId}?pageNo=0&pageSize=10&sortBy=taskId&sortDirection=ASC`, {
    method: "GET",
    headers: {
      ...token,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

// Get a task by ID within a specific workspace
export const getTaskById = async (taskId, workspaceId) => {
  const token = await headerToken();
  const res = await fetch(`${process.env.NEXT_APIURL}/tasks/${taskId}/workspace/${workspaceId}?pageNo=0&pageSize=10&sortBy=taskId&sortDirection=ASC`, {
    method: "GET",
    headers: {
      ...token,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

// Create a new task in a specific workspace
export const postTask = async (workspaceId, taskData) => {
  const token = await headerToken();
  const res = await fetch(`${process.env.NEXT_APIURL}/task/workspace/${workspaceId}`, {
    method: "POST",
    headers: {
      ...token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  const data = await res.json();
  return data;
};

// Update an existing task in a specific workspace
export const updateTask = async (taskId, workspaceId, updateData) => {
  const token = await headerToken();
  const res = await fetch(`${process.env.NEXT_APIURL}/task/${taskId}/workspace/${workspaceId}`, {
    method: "PUT",
    headers: {
      ...token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  const data = await res.json();
  return data;
};

// Delete a task from a specific workspace
export const deleteTask = async (taskId, workspaceId) => {
  const token = await headerToken();
  const res = await fetch(`${process.env.NEXT_APIURL}/task/${taskId}/workspace/${workspaceId}`, {
    method: "DELETE",
    headers: {
      ...token,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};