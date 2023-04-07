import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import Link from "next/link";
import { FC } from "react";

type props = {
  title: string;
  image: string;
  id: number;
};

export const CardTemplate: FC<props> = ({ title, image, id }) => {
  // const callApiGetID = async () => {
  //   const response = await fetch("/api/comic/" + id);
  //   const data = await response.json();
  // };

  // const handleClick = () => {
  //   callApiGetID();
  // };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 345,
        border: 1,
        borderColor: "gray",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>
        <Link href={`/comics/${id}`}>
          <Button size="small">Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
