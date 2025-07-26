import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Pros = {
  activities: Activity[];
  handleSelectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
};
export default function ActivityList({
  activities,
  handleSelectActivity,
  handleDeleteActivity,
}: Pros) {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            handleSelectActivity={handleSelectActivity}
            handleDeleteActivity={handleDeleteActivity}
          />
        ))}
      </Box>
    </>
  );
}
