export interface Task {
  id: string;
  title: string;
  time: string;
  status: "pending" | "completed" | "missed";
  type: "checkin" | "dose";
  description?: string;
}

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Daily Check-in",
    time: "Due Now",
    status: "pending",
    type: "checkin",
    description: "Report how you're feeling today",
  },
  {
    id: "2",
    title: "Take Morning Dose",
    time: "8:00 AM",
    status: "completed",
    type: "dose",
    description: "Morning medication dose",
  },
  {
    id: "3",
    title: "Take Evening Dose",
    time: "8:00 PM",
    status: "pending",
    type: "dose",
    description: "Evening medication dose",
  },
  {
    id: "4",
    title: "Weekly Symptoms Check",
    time: "Tomorrow",
    status: "pending",
    type: "checkin",
    description: "Detailed weekly health assessment",
  },
];

export const getTaskIcon = (type: string, status: string) => {
  if (status === "completed") return "check-circle";
  if (status === "missed") return "close-circle";

  switch (type) {
    case "checkin":
      return "message-question";
    case "dose":
      return "pill";
    default:
      return "circle-outline";
  }
};

export const getTaskColor = (status: string) => {
  switch (status) {
    case "completed":
      return "#4CAF50";
    case "missed":
      return "#F44336";
    case "pending":
      return "#FF9800";
    default:
      return "#9E9E9E";
  }
};
