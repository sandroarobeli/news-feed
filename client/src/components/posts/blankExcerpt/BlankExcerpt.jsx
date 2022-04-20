import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const styles = {
  container: {
    maxWidth: "80vw",
    minWidth: "275px",
    padding: "0.25rem",
    margin: "3rem auto auto auto",
    textAlign: "center",
  },
};

const BlankExcerpt = () => {
  return (
    <Card sx={styles.container}>
      <CardContent>
        <Typography variant="h3" component="h3" color="text"></Typography>
      </CardContent>
    </Card>
  );
};

export default BlankExcerpt;
