import { useEffect, useState } from "react";
import axios from "axios";
import { ListItemText, List, ListItem, Typography } from "@mui/material";
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((res) => {
        setActivities(res.data);
      });
  }, []);

  return (
    <>
      <Typography variant="h2">Activities</Typography>
      <List>
        {activities.map((item) => (
          <ListItem key={item.id}>
            <ListItemText>{item.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
