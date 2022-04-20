import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const styles = {
  container: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "start",
    marginBottom: "1rem",
  },
  time: {
    fontWeight: 600,
    color: "#000000",
  },
};

const TimeStamp = (props) => {
  let timeAgo = "";
  if (props.timestamp) {
    const date = parseISO(props.timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <Box sx={styles.container}>
      <Typography variant="body2" sx={styles.time}>
        {timeAgo}
      </Typography>
    </Box>
  );
};

export default TimeStamp;
