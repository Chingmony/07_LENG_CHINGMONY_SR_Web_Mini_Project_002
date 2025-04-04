import React from 'react'
import TasklistComponent from '../_component/tasklistComponent'
import { getWorkspaceByIdAction } from '@/app/action/workspaceAction'

const WorkspacePage = async({params}) => {
    const workspaceId = params.workspaceId;
    const workspaceData = await getWorkspaceByIdAction(workspaceId);
    console.log("workspaceData" ,workspaceData);
  return (
    <div>
         <TasklistComponent workspaceId={workspaceId}/> 
    </div>
  )
}

export default WorkspacePage