import { privateDecrypt } from "crypto";
import { CheckoutView } from "dh-marvel/components/checkoutView/checkoutView";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import LayoutGeneral from "dh-marvel/components/layouts/layout-general";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";
import { OrderProvider } from "dh-marvel/features/formContext/OrderContext";
import { Comic } from "dh-marvel/features/types";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import comic from "dh-marvel/test/mocks/comic";
import { NextPage } from "next";
import { useEffect } from "react";
interface props {
  data: Comic;
}

/**
 * Route to display the form to buy a selected comic
 * @param data data fetched from the api
 * @returns a component which renders details of a comic and a form
 * @author David Muñoz
 */
const CheckoutComic: NextPage<props> = ({ data }) => {
  if (!data) {
    return <></>;
  }

  return (
    <LayoutCheckout>
      <CheckoutView
        title={data.title}
        image={data.thumbnail.path + "." + data.thumbnail.extension}
        price={data.price}
        id={data.id}
        idSnackbar={data.id}
      />
    </LayoutCheckout>
  );
};

export default CheckoutComic;

export async function getServerSideProps(context: { query: { id: any } }) {
  const { id } = context.query;
  const res = await getComic(id);
  console.log(res);
  return { props: { data: res } };
}
