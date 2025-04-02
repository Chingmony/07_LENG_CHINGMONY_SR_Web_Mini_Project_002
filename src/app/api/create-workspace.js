// /api/create-workspace.js
import { postWorkspace } from "@/service/workspace.service";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { workspaceName, status, dueDate } = req.body;

      // Call the service to create a new workspace
      const newWorkspace = await postWorkspace({ workspaceName, status, dueDate });

      // Respond with success
      res.status(200).json({ success: true, data: newWorkspace });
    } catch (error) {
      console.error("Error creating workspace:", error);
      res.status(500).json({ success: false, message: "Failed to create workspace." });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed." });
  }
}