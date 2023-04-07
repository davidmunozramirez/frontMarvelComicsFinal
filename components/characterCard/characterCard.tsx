import { Card, CardMedia, CardContent, Typography, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type props = {
  name: string;
  image: string;
  description: string;
  comics: any;
  id: any
};

export const CharacterCard: FC<props> = ({ name, image, description, comics, id }) => {
  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={name}
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {description}
          </Typography>
        </CardContent>
      </Card>
      <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Other Comics wherere {name} features!</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {comics?.map((comic: any, index: any)=>{
                    return (
                      <Box key={index}>{comic}</Box>
                    )
                  })}
                </AccordionDetails>
              </Accordion>
    </Box>
  );
};
