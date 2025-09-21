import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Box>
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/pagination">
          Pagination
        </Button>
        <Button color="inherit" component={Link} to="/product">
          product
        </Button>
        <Button color="inherit" component={Link} to="/comments">
          Comments
        </Button>
      </Toolbar>
    </AppBar>
    <Box sx={{ p: 3 }}>{children}</Box>
  </Box>
);

export default Layout;
