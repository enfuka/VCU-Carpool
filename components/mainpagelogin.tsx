"use client";
import Form from "./form";
import { Accordion } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

export default function MainLogin() {
  return (
    <div>
      <Accordion>
        <AccordionSummary>
          <Typography align="center" sx={{ width: "100%" }}>
            Sign In
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
            <Form type="login" />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
