import headerToken from "@/app/api/headerToken";

export const getAllTasks = async (workspaceId) => {
  const token = await headerToken();
  const res = await fetch(`${process.env.NEXT_APIURL}/tasks/workspace/${workspaceId}?pageNo=0&pageSize=10&sortBy=taskId&sortDirection=ASC`, {
    method: "GET",
    headers: {
      ...token,
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const getTaskById = async (workspaceId, taskId) => {
  const token = await headerToken();
  const res = await fetch(`${process.env.NEXT_APIURL}/tasks/${taskId}/workspace/${workspaceId}`, {
    method: "GET",
    headers: {
      ...token,
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

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
  return res.json();
};

export const patchTask = async (workspaceId, taskId, updateData) => {
  const token = await headerToken();
  const res = await fetch(`${process.env.NEXT_APIURL}/task/${taskId}/workspace/${workspaceId}`, {
    method: "PATCH",
    headers: {
      ...token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  const dataa = res.json()
  return dataa ;
};

export const updateTask = async (workspaceId, taskId, updateData) => {
  const token = await headerToken();
  const res = await fetch(`${process.env.NEXT_APIURL}/task/${taskId}/workspace/${workspaceId}`, {
    method: "PUT",
    headers: {
      ...token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });
  return res.json();
};

export const deleteTask = async (workspaceId, taskId) => {
  const token = await headerToken();
  const res = await fetch(`${process.env.NEXT_APIURL}/task/${taskId}/workspace/${workspaceId}`, {
    method: "DELETE",
    headers: {
      ...token,
      "Content-Type": "application/json",
    },
  });
  return res.json();
};