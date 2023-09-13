"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Instagram, LinkedIn, GitHub } from "@mui/icons-material";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Footer() {
  const theme = useTheme();
  const isAboveSM = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      component="footer"
      className="no-print"
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={isAboveSM ? 5 : 1}
          align={isAboveSM ? "center" : "left"}
          px={isAboveSM ? "0px" : "20px"}
        >
          <Grid item xs={12} sm={4} sx={{ mt: "50px" }}>
            <Typography variant="h6" color="#000000" gutterBottom>
              About
            </Typography>
            <Typography variant="body2" color="#000000">
              VCU Carpool is a student project created by Enes Kalinsazlioglu{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: "50px" }}>
            <Typography variant="h6" color="#000000" gutterBottom noWrap={true}>
              Contact Me
            </Typography>
            <Typography variant="body2" color="#000000">
              kalinsazlioef@vcu.edu
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: "50px" }}>
            <Typography variant="h6" color="#000000" gutterBottom>
              Follow Me
            </Typography>
            <Link
              href="https://www.linkedin.com/in/ekalinsaz/"
              color="#000000"
              target="_blank"
            >
              <LinkedIn />
            </Link>
            <Link
              href="https://www.instagram.com/enfukaa"
              color="#000000"
              sx={{ pl: 1, pr: 1 }}
              target="_blank"
            >
              <Instagram />
            </Link>
            <Link
              href="https://www.github.com/enfuka"
              color="#000000"
              target="_blank"
            >
              <GitHub />
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Box my={5}>
              <Typography
                variant="body2"
                color="#000000"
                align="center"
                sx={{ mt: "-30px" }}
              >
                {"Copyright © "}
                {new Date().getFullYear()}
                {"."}
                {" Made with "} <span>❤</span> {" by "} {"Enes Kalinsazlioglu"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
