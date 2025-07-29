import { useState } from "react";
import { Box, Container, CssBaseline, LinearProgress } from "@mui/material";
import NavBar from "./NavBar";

import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const { activities, isPending } = useActivities();
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((x) => x.id === id));
  };
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee" }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {isPending || !activities ? (
          <LinearProgress />
        ) : (
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            handleSelectActivity={handleSelectActivity}
            editMode={editMode}
            handleCancelSelectActivity={handleCancelSelectActivity}
            openForm={handleOpenForm}
            handleCloseForm={handleCloseForm}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
