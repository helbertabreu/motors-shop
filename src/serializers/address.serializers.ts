import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IAddressRequest,
  IAddressResponse,
  IAddressUpdate,
} from "../interfaces/address.interface";

export const addressRequestSerializer: SchemaOf<IAddressRequest> = yup
  .object()
  .shape({
    cep: yup.string().max(8).required(),
    city: yup.string().max(128).required().lowercase(),
    state: yup.string().max(2).required().lowercase(),
    street: yup.string().max(128).required().lowercase(),
    number: yup.string().max(5).notRequired().nullable(),
    complement: yup.string().max(128).notRequired().lowercase().nullable(),
  });

export const addressResponseSerializer: SchemaOf<IAddressResponse> = yup
  .object()
  .shape({
    cep: yup.string().max(8).notRequired(),
    city: yup.string().max(100).notRequired().lowercase(),
    state: yup.string().max(2).notRequired().lowercase(),
    street: yup.string().max(200).notRequired().lowercase(),
    number: yup.string().max(5).notRequired().nullable(),
    complement: yup.string().max(200).notRequired().lowercase().nullable(),
    id: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
    user: yup.string().notRequired(),
  });

export const addressUpdateSerializer: SchemaOf<IAddressUpdate> = yup
  .object()
  .shape({
    cep: yup.string().max(8).notRequired(),
    city: yup.string().max(100).notRequired().lowercase(),
    state: yup.string().max(2).notRequired().lowercase(),
    street: yup.string().max(200).notRequired().lowercase(),
    number: yup.string().max(5).notRequired().nullable(),
    complement: yup.string().max(200).notRequired().lowercase().nullable(),
  });
