// import { getAllWorkspace } from '@/service/workspace.service';
// import React from 'react'
// import HeaderComponent from './_component/headerComponent';
// import TasklistComponent from './_component/tasklistComponent';
// import FooterComponent from './_component/footerComponent';
// import SidebarComponent from './_component/sidebarComponent';
// import "../globals.css";

// const WorkspacePage = async () => {
//     const data = await getAllWorkspace();
//     console.log("data", data);
//   return (

//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar */}
//       <SidebarComponent />

//       {/* Main Content */}
//       <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
//         {/* Header */}
//         <HeaderComponent />

//         {/* Task List */}
//         <TasklistComponent />

//         {/* Footer */}
//         <FooterComponent />
//       </div>
//     </div>
//   )
// }

// export default WorkspacePage

import React from 'react'
import TasklistComponent from './_component/tasklistComponent'

const WorkspacePage = () => {
  return (
    <div>
      <TasklistComponent />
    </div>
  )
}

export default WorkspacePage