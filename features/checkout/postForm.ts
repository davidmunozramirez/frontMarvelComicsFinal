import { CheckoutInput } from "./checkout.types";

export const postForm = async (data: CheckoutInput | any) => {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
