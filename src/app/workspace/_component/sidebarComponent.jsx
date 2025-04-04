"use client";
import { useState, useEffect } from "react";
import {
  workspaceAction,
  postWorkspaceAction,
  updateWorkspaceAction,
  patchWorkspaceAction,
} from "@/app/action/workspaceAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";

const SidebarComponent = () => {
  const router = useRouter();
  const [workspace, setWorkspace] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("");
  const [editingWorkspace, setEditingWorkspace] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { payload: fetchedWorkspaces } = await workspaceAction();
      setWorkspace(fetchedWorkspaces);
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
          editingWorkspace.workspaceId,
          updatedData
        );
        console.log("Updated Workspace:", updatedWorkspace);

        setWorkspace((prev) =>
          prev.map((wk) =>
            wk.workspaceId === editingWorkspace.workspaceId
              ? { ...wk, workspaceName }
              : wk
          )
        );
      } else {
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
      await patchWorkspaceAction(wk.workspaceId, !wk.isFavorite);
      setWorkspace((prev) =>
        prev.map((workspaceItem) =>
          workspaceItem.workspaceId === wk.workspaceId
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
     <Logo />
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
          {workspace.map((wk) => {
            const randomColor = `#${Math.floor(
              Math.random() * 16777215
            ).toString(16)}`;

            return (
              <Link href={`/workspace/${wk.workspaceId}`} key={wk.workspaceId}>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100">
                  {/* Status Indicator with Random Color */}
                  <span
                    className="mr-2 inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: randomColor }}
                  ></span>

                  {/* Workspace Name */}
                  <span>{wk.workspaceName}</span>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button onClick={() => toggleFavorite(wk)}>
                      {wk.isFavorite ? "⭐" : "☆"}
                    </button>
                    <button onClick={() => handleEdit(wk)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Favorite workspaces */}
        <div>
          <h2 className="text-base font-semibold text-gray-800">Favorite</h2>
          <nav className="mt-4 space-y-3">
            {favoriteWorkspaces.map((wk) => (
              <div
                key={wk.workspaceId}
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

      {/* Form Pop-up */}
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
