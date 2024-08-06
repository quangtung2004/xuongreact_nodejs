import { CircularProgress, Stack } from "@mui/material";
import { FC } from "react";

type LoadingProps = {
  isShow: boolean;
};

const Loading: FC<LoadingProps> = ({ isShow }) => {
  return (
    <>
      {isShow && (
        <Stack
          sx={{
            color: "grey.500",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Full viewport height
            width: "100vw", // Full viewport width
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: Add a semi-transparent background
            zIndex: 9999,
          }}
          spacing={2}
          direction="row"
        >
          <CircularProgress color="secondary" />
          <CircularProgress color="success" />
          <CircularProgress color="inherit" />
        </Stack>
      )}
    </>
  );
};

export default Loading;
