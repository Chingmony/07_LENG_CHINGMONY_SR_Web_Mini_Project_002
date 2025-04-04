"use server"
import { getAllTasks, getTaskById, postTask, patchTask, updateTask, deleteTask } from "@/service/task.service";

export const taskAction = async (workspaceId) => {
  return await getAllTasks(workspaceId);
};

export const postTaskAction = async (workspaceId, taskData) => {
  return await postTask(workspaceId, taskData);
};

export const updateTaskAction = async (workspaceId, taskId, updateData) => {
  return await updateTask(workspaceId, taskId, updateData);
};

export const patchTaskAction = async (workspaceId, taskId, patchData) => {
      const updatedTask = await patchTask(workspaceId, taskId, patchData);
      return updatedTask; 
  };
  
export const deleteTaskAction = async (workspaceId, taskId) => {
  return await deleteTask(workspaceId, taskId);
};

export const getTaskByIdAction = async (workspaceId, taskId) => {
  return await getTaskById(workspaceId, taskId);
};
