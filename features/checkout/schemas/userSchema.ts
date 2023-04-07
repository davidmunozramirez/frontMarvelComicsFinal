import { object, string } from "yup";

const UserSchema = object().shape({
  name: string().required("You must submit your name").min(2),
  lastname: string().required("You must submit your last name").min(2),
  email: string().required("You must submit your email").email(),
});

export default UserSchema;
