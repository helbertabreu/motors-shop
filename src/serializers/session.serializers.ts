import * as yup from "yup";
import { SchemaOf } from "yup";
import { ISession } from "../interfaces/session.interface";

export const sessionSerializer: yup.SchemaOf<ISession> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
