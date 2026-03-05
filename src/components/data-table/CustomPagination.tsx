import React from "react";
import { Box, IconButton, Typography, Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface CustomPaginationProps {
  page: number; // 0-indexed for consistency with DataGrid state
  total: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  total,
  limit,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = page + 1;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        p: 2,
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {total > 0 ? (
            <>
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
              <Box component="span" sx={{ mx: 2, color: "divider" }}>
                |
              </Box>
              Total: <strong>{total}</strong> items
            </>
          ) : (
            "No items found"
          )}
        </Typography>
        <Box>
          <IconButton
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
            size="small"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              mr: 1,
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => onPageChange(page + 1)}
            disabled={currentPage >= totalPages || total === 0}
            size="small"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default CustomPagination;
