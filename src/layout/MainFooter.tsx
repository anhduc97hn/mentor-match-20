"use client"

import React from 'react';
import { Link, Typography } from "@mui/material";

const MainFooter: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1} mt={2} mb={2}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        Duc Nguyen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default MainFooter;