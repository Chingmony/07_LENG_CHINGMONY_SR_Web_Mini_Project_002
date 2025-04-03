import { getAllUsers } from "@/service/user.service";
import React from "react";

const HeaderComponent = async () => {
  
  const {payload:users} = await getAllUsers();
  console.log("users", users);

  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-4">
      {/* Workspace Navigation */}
      
      <div className="flex items-center gap-2 text-sm">
        <span>Workspace</span>
        <span></span>
        <span className="text-blue-500 underline">HRD Design</span>
      </div>

      {/* User Profile */}
        <div className="flex items-center gap-2">
        <img
          src={users.profile}
          alt="User Profile"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm">{users.email}</span>
      </div>
      
  
        
      </div>
        
      
  );
};

export default HeaderComponent;