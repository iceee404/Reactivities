import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { CardActions } from "@mui/material";

type Props = {
  activity: Activity;
  handleCancelSelectActivity: () => void;
  openForm: (id?: string) => void;
};
export default function ActivityDetail({
  activity,
  handleCancelSelectActivity,
  openForm,
}: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardMedia
        component="img"
        src={`/images/categoryImages/${activity.category}.jpg`}
      />
      <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight="light">
          {activity.date}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => openForm(activity.id)}>
          Edit
        </Button>
        <Button color="inherit" onClick={handleCancelSelectActivity}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
