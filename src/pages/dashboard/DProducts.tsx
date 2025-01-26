import { FC, useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  Button,
  Fab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaPlusCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AddproductForm from "../../components/AddProductForm";

const DProducts = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toggle cart drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  
  return (
    <Box>
      <Button onClick={toggleDrawer} color="primary" variant="contained">
        <FaPlusCircle size={25} />{" "}
        <Typography variant="h6" ml={2}>
          Add Product
        </Typography>
      </Button>

      {/* Drawer for Cart (opens from the right side) */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 350, padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 8
            }}
          >
            <Typography variant="h6">
              Cart Information
            </Typography>
            <Fab  size="small" color="secondary" aria-label="add">
              <CloseIcon />
            </Fab>
          </Box>
          <AddproductForm />
        </Box>
      </Drawer>
    </Box>
  );
};

export default DProducts;
