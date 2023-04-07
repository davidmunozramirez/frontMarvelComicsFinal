import { CardContent, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CardDetail } from "dh-marvel/components/carDetail/cardDetail";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { PurchaseConfirm } from "dh-marvel/components/purchaseConfirm/purchaseconfirm";
import useOrder from "dh-marvel/features/formContext/useOrder";
import { Comic } from "dh-marvel/features/types";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import { NextPage } from "next";
import Link from "next/link";
import { DeliveryDataType } from "../../features/checkout/deliveryData.types";

interface props {
  data: Comic;
}
/**
 * Route to display the details of a purchased comic
 * @param data data fetched from the api
 * @returns a component which renders details of a comic
 * @author David Muñoz
 */
const Confirmation: NextPage<props> = ({ data }) => {
  const { state } = useOrder();
  console.log("este state en el purchase ocnfirmation", state.order.customer);
  if (!data) {
    return <></>;
  }
  const customer1: any = Object.values(Object.keys(state.order)[0]);
  console.log("este es customer1", customer1);

  return (
    <LayoutCheckout>
      <BodySingle>
        <Box sx={{ width: "100%", alignItems:"center" }}>
          <Typography
            sx={{ fontSize: 25, p: 4, textAlign: "center" }}
            color="green"
            fontWeight={"bolder"}
          >
            Order Details:
          </Typography>
          <PurchaseConfirm
            title={data.title}
            name={state.order.customer.name}
            email={state.order.customer.email}
            address1={state.order.customer.address1}
            city={state.order.customer.address1}
            image={data.thumbnail.path + "." + data.thumbnail.extension}
            price={data.price}
            lastname={state.order.customer.lastname}
            state={state.order.customer.address1}
          ></PurchaseConfirm>
          <CardContent sx={{ p: 2, border: 4, borderColor: "green" }}>
            <Typography
              sx={{ fontSize: 25, textAlign: "center" }}
              color="green"
              fontWeight={"bolder"}
            >
              Enjoy your purchase!
            </Typography>
          </CardContent>
        </Box>
      </BodySingle>
    </LayoutCheckout>
  );
};

export default Confirmation;

export async function getServerSideProps(context: { query: { id: any } }) {
  const { id } = context.query;
  const res = await getComic(id);

  console.log(res);

  return { props: { data: res } };
}
