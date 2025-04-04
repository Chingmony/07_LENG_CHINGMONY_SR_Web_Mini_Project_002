"use server"

import { getAllWorkspace, getWorkspaceById, patchWorkspace, postWorkspace, updateWorkspace } from "@/service/workspace.service";

export const workspaceAction = async (wD) => {
    const workspaceData = await getAllWorkspace(wD);
    return workspaceData;
}

export const postWorkspaceAction = async (pWD) => {
    const workspacePost = await postWorkspace(pWD);
    return workspacePost;
}

export const updateWorkspaceAction = async (id, updateWD) => {
    const workspaceUpdate = await updateWorkspace(id, updateWD);
    return workspaceUpdate;
}

export const getWorkspaceByIdAction = async ( id) => {
    const workspaceById = await getWorkspaceById(id);
    return workspaceById;
}




export const patchWorkspaceAction = async (id, patchedData) => {
    const { isFavorite } = patchedData;
    const workspacePatch = await patchWorkspace(id, patchedData);
    return workspacePatch;
};
