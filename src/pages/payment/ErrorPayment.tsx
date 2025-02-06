import { Box, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const ErrorPayment = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        flexDirection: "column",
        gap: 2
      }}
    >
      <SentimentVeryDissatisfiedIcon sx={{fontSize: "30px"}} />
      <Typography fontSize={24} >Something went wrong!!!</Typography>
      <Typography>Please, try again!</Typography>
    </Box>
  );
};

export default ErrorPayment;
