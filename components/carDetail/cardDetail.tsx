import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { Box } from "@mui/system";

type props = {
  title: string;
  image: string;
  description: string;
  price: number;
  oldPrice: number;
  characters: any;
  stock: number;
  available: number;
  id: number;
};

export const CardDetail: FC<props> = ({
  title,
  image,
  price,
  oldPrice,
  description,
  characters,
  stock,
  available,
  id,
}) => {
  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={title}
          sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Before: {oldPrice}$
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Current: {price}$
          </Typography>
        </CardContent>
        <CardActions>
          <Stack spacing={2}>
            {stock ? (
              <Link href={`/checkout/${id}`}>
                <Button size="small">Buy now</Button>
              </Link>
            ) : (
              <Button size="small" disabled>
                Buy now (not stock available)
              </Button>
            )}
            {description ? (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{description}</Typography>
                </AccordionDetails>
              </Accordion>
            ) : (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>No description available</Typography>
                </AccordionDetails>
              </Accordion>
            )}

            {available ? (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Characters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {/* <>{characters}</> */}
                  {characters.map((char: any, index: any)=>{
                    return (
                      <Box key={index}>{char}</Box>
                    )
                  })}
                </AccordionDetails>
              </Accordion>
            ) : null}
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
};
