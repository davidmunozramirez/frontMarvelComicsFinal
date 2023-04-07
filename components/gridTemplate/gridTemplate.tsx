import { Box, Grid } from "@mui/material";
import { Comic } from "dh-marvel/features/types";
import { FC } from "react";
import { CardTemplate } from "../cardTemplate/cardTemplate";

interface props {
  comics: Comic[];
}

export const GridTemplate: FC<props> = ({ comics }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {comics?.map((comic, index) => (
          <Grid item xs={12} sm={4} md={4} key={index} p={2}>
            <CardTemplate
              title={comic.title}
              id={comic.id}
              image={comic.thumbnail.path + "." + comic.thumbnail.extension}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
