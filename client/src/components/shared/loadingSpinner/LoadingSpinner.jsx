import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const styles = {
  box: {
    margin: "40vh auto auto auto",
    textAlign: "center",
  },
  progress: {
    color: "#1877F2",
  },
};

const LoadingSpinner = () => {
  return (
    <Box sx={styles.box}>
      <CircularProgress thickness={3.6} size={100} sx={styles.progress} />
    </Box>
  );
};

export default LoadingSpinner;
