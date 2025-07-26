import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Chip,
  Box,
  Button,
} from "@mui/material";

type Props = {
  activity: Activity;
  handleSelectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
};
export default function ActivityCard({
  activity,
  handleSelectActivity,
  handleDeleteActivity,
}: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography sx={{ color: "text.secondary", mb: 1 }}>
          {activity.date}
        </Typography>
        <Typography variant="body2">{activity.description}</Typography>
        <Typography variant="subtitle1">
          {activity.city} / {activity.venue}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
      >
        <Chip label={activity.category} variant="outlined" />
        <Box display="flex" gap={3}>
          <Button
            size="medium"
            variant="contained"
            onClick={() => handleSelectActivity(activity.id)}
          >
            View
          </Button>
          <Button
            color="error"
            size="medium"
            variant="contained"
            onClick={() => handleDeleteActivity(activity.id)}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
