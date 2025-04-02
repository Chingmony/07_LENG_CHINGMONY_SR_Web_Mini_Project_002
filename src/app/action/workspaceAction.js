"use server"

import { getAllWorkspace, postWorkspace } from "@/service/workspace.service";

export const workspaceAction = async (wD) => {
    const workspaceData = await getAllWorkspace(wD);
    return workspaceData;
}

export const postWorkspaceAction = async (pWD) => {
    const workspacePost = await postWorkspace(pWD);
    return workspacePost;
}