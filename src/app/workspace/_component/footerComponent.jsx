import React from "react";

const FooterComponent = () => {
  return (
    <div className="fixed bottom-6 right-6">
      <button className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2 hover:bg-blue-600">
        <span>+</span>
        New Task
      </button>
    </div>
  );
};

export default FooterComponent;