import { getAllTasks } from "@/service/task.service";
import { Clock, Ellipsis } from "lucide-react";
import React from "react";

const TasklistComponent = async () => {
  const { payload: tasks } = await getAllTasks();

  const statuses = [
    { key: "NOT_STARTED", label: "Not Started", color: "red" },
    { key: "IN_PROGRESS", label: "In Progress", color: "blue" },
    { key: "FINISHED", label: "Finished", color: "green" },
  ];

  // Group tasks by status using forEach
  const groupedTasks = {};
  statuses.forEach(({ key }) => {
    groupedTasks[key] = tasks.filter((task) => task.status === key);
  });

  // Status styles
  const statusStyles = {
    NOT_STARTED: "bg-red-100 text-red-500",
    IN_PROGRESS: "bg-blue-100 text-blue-500",
    FINISHED: "bg-green-100 text-green-500",
  };

  return (
    <main>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">HRD Design</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      </div>

      {/* Progress Indicators with Tasks */}
      <div className="flex justify-between space-y-8 ">
        {statuses.map(({ key, label, color }, idx) => (
          <div key={idx}>
            {/* Progress Indicator */}
            <div className="flex flex-col items-center mb-4">
              <span className={`${statusStyles[key]} capitalize`}>{label}</span>
              <hr className={`w-24 border-${color}-500`} />
            </div>

            {/* Tasks */}
            <div className="space-y-4">
              {groupedTasks[key].length > 0 ? (
                groupedTasks[key].map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    statusStyles={statusStyles}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No tasks in this category.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

// Task Card Component
const TaskCard = ({ task, statusStyles }) => (
  <div className="border border-gray-300 rounded-xl p-4">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-bold capitalize">{task.taskTitle}</h2>
      <Ellipsis />
    </div>

    {/* Task Details */}
    <p className="line-clamp-2 text-light-steel-blue my-2 h-12">
      {task.taskDetails}
    </p>

    <div className="flex justify-between items-center mt-4">
      {/* Tag */}
      <p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-lg">
        {task.tag}
      </p>

      {/* Status */}
      <div
        className={`rounded-full w-8 h-8 ${statusStyles[task.status]}`}
      ></div>
    </div>

    {/* Progress */}
    <div className="flex justify-between items-center border-t border-t-gray-300 mt-4 pt-4">
      <select
        defaultValue={task.status}
        className={`w-36 truncate border-${
          task.status.toLowerCase().split("_")[0]
        }-500 text-${task.status.toLowerCase().split("_")[0]}-500`}
      >
        <option value="NOT_STARTED">NOT_STARTED</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="FINISHED">FINISHED</option>
      </select>

      {/* Date */}
      <p className="flex gap-3 text-light-steel-blue">
        <Clock size={22} />
        {task.endDate}
      </p>
    </div>
  </div>
);

export default TasklistComponent;
