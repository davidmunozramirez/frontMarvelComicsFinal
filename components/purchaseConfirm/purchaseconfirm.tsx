import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Box,
} from "@mui/material";
import { FC } from "react";

type props = {
  title: string;
  name: string;
  lastname: string;
  email: string;
  address1: string;
  city: string;
  image: string;
  price: number;
  state: string;
};

export const PurchaseConfirm: FC<props> = ({
  title,
  name,
  lastname,
  email,
  address1,
  city,
  image,
  price,
  state,
}) => {
  return (
    <Box sx={{ justifyContent: "center" }}>
      <Box
        sx={{ justifyContent: "center", display: "flex", alignItems: "center" }}
      >
        <Card sx={{ maxWidth: 345, alignSelf: "center", p: 2, boxShadow: 0 }}>
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
              {price}$
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, boxShadow: 0 }}>
          <CardContent>
            <Typography sx={{ p: 2 }} variant="h5" component="div">
              Personal data
            </Typography>
            <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
              Name:
            </Typography>
            <Typography sx={{ p: 2 }} variant="body2">
              {name} {lastname}
            </Typography>
            <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
              Email:
            </Typography>
            <Typography sx={{ p: 2 }} variant="body2">
              {email}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, p: 2, boxShadow: 0 }}>
          <CardContent>
            <Typography sx={{ p: 2 }} variant="h5" component="div">
              Delivery address
            </Typography>
            <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
              Address Number:
            </Typography>
            <Typography variant="body2">{address1}</Typography>
            <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
              City:
            </Typography>
            <Typography variant="body2">{city}</Typography>
            <Typography sx={{ mb: 1.5, p: 1 }} color="text.secondary">
              State:
            </Typography>
            <Typography sx={{ p: 2 }} variant="body2">
              {state}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
