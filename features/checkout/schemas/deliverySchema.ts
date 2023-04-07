import { object, string } from "yup";

const DeliverytSchema = object().shape({
  address1: string().required("You must submit your address").min(5),
  address2: string().optional(),
  city: string().required("You must submit the city for delivery").min(4),
  state: string().required("You must submit the province for delivery").min(1),
  zipCode: string()
    .required("You must submit the postal code of your residence area")
    .min(2),
});

export default DeliverytSchema;