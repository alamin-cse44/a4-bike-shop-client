import React from "react";
import { Container, Box, Typography } from "@mui/material";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  title?: string;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  maxWidth = "lg", // Default size
  title,
}) => {
  return (
    <Container
      maxWidth={maxWidth}
      sx={{
        padding: { xs: 2, sm: 4 }, // Padding for small and larger screens
        backgroundColor: "#f9f9f9", // Light background
        borderRadius: "8px", // Smooth corners
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
        marginY: { xs: 2, sm: 4 }, // Vertical margin
      }}
    >
      {title && (
        <Typography
          variant="h5"
          component="h1"
          sx={{
            marginBottom: 2,
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          {title}
        </Typography>
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {children}
      </Box>
    </Container>
  );
};

export default ResponsiveContainer;
