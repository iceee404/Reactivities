import { Grid } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";

type Props = {
  activities: Activity[];
  selectedActivity?: Activity;
  handleSelectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
  editMode: boolean;
  handleCancelSelectActivity: () => void;
  openForm: (id?: string) => void;
  handleCloseForm: () => void;
  handleSubmit: (activity: Activity) => void;
};
export default function ActivityDashboard({
  activities,
  selectedActivity,
  handleSelectActivity,
  handleDeleteActivity,
  editMode,
  handleCancelSelectActivity,
  openForm,
  handleCloseForm,
  handleSubmit,
}: Props) {
  return (
    <Grid container spacing={3}>
      <Grid size={7}>
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Grid>
      <Grid size={5}>
        {!editMode && selectedActivity && (
          <ActivityDetail
            activity={selectedActivity}
            handleCancelSelectActivity={handleCancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            handleCloseForm={handleCloseForm}
            handleSubmit={handleSubmit}
          />
        )}
      </Grid>
    </Grid>
  );
}
