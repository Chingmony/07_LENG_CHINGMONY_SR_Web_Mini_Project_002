"use client";
import { useState, useEffect } from "react";
import {
  workspaceAction,
  postWorkspaceAction,
  updateWorkspaceAction,
  patchWorkspaceStatusAction,
} from "@/app/action/workspaceAction";

const SidebarComponent = () => {
  const [workspace, setWorkspace] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [editingWorkspace, setEditingWorkspace] = useState(null);

  // Fetch all workspaces on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { payload: fetchedWorkspaces } = await workspaceAction();
        setWorkspace(fetchedWorkspaces);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };
    fetchData();
  }, []);

  // Filter favorite workspaces
  const favoriteWorkspaces = workspace.filter((wk) => wk.isFavorite);

  // Handle add/update workspace
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingWorkspace) {
        // Update workspace
        const updatedData = { workspaceName };
        const updatedWorkspace = await updateWorkspaceAction(
          editingWorkspace.id,
          updatedData
        );
        console.log("Updated Workspace:", updatedWorkspace);

        // Update state directly
        setWorkspace((prev) =>
          prev.map((wk) =>
            wk.id === editingWorkspace.id ? { ...wk, workspaceName } : wk
          )
        );
      } else {
        // Add new workspace
        const newWorkspace = await postWorkspaceAction({ workspaceName });
        console.log("New Workspace Added:", newWorkspace);
        setWorkspace((prev) => [...prev, newWorkspace.payload]);
      }

      // Reset form
      setWorkspaceName("");
      setFormVisible(false);
      setEditingWorkspace(null);
    } catch (error) {
      console.error("Error handling workspace:", error);
    }
  };

  // Handle edit workspace
  const handleEdit = (wk) => {
    setWorkspaceName(wk.workspaceName);
    setEditingWorkspace(wk);
    setFormVisible(true);
  };

  // Toggle favorite status
  const toggleFavorite = async (wk) => {
    try {
      await patchWorkspaceStatusAction(wk.id, !wk.isFavorite);
      setWorkspace((prev) =>
        prev.map((workspaceItem) =>
          workspaceItem.id === wk.id
            ? { ...workspaceItem, isFavorite: !workspaceItem.isFavorite }
            : workspaceItem
        )
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  return (
    <main>
      <div className="text-[50px] align-center">PLanit</div>
      <div className="w-64 bg-white border-r border-gray-200 p-4 space-y-6">
        {/* Workspace section */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800">Workspace</h2>
          <button
            onClick={() => {
              setWorkspaceName("");
              setEditingWorkspace(null);
              setFormVisible(true);
            }}
            className="p-1 border rounded-lg"
          >
            ➕
          </button>
        </div>

        {/* Workspace list */}
        <nav className="mt-4 space-y-3">
          {workspace.map((wk) => (
            <div
              key={wk.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
            >
              <span>{wk.workspaceName}</span>
              <div className="flex gap-2">
                <button onClick={() => toggleFavorite(wk)}>
                  {wk.isFavorite ? "⭐" : "☆"}
                </button>
                <button onClick={() => handleEdit(wk)}>✏️</button>
              </div>
            </div>
          ))}
        </nav>

        {/* Favorite workspaces */}
        <div>
          <h2 className="text-base font-semibold text-gray-800">Favorite</h2>
          <nav className="mt-4 space-y-3">
            {favoriteWorkspaces.map((wk) => (
              <div
                key={wk.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100"
              >
                <span>{wk.workspaceName}</span>
                <button onClick={() => toggleFavorite(wk)}>⭐</button>
              </div>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
          Logout
        </button>
      </div>

      {/* Modal/Form Pop-up */}
      {isFormVisible && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-transparent z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-800">
              {editingWorkspace ? "Edit Workspace" : "Add Workspace"}
            </h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                placeholder="Enter workspace name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="bg-gray-500 text-white py-1 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                >
                  {editingWorkspace ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default SidebarComponent;
