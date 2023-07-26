import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserForgotPasswordRequest,
  IUserRecoveryPasswordRequest,
  IUserRequest,
  IUserResponse,
  IUserUpdate,
} from "../interfaces/user.interface";
import {
  addressRequestSerializer,
  addressUpdateSerializer,
} from "./address.serializers";
import { AccountType } from "../entities/user.entity";

export const userRequestSerializer: SchemaOf<IUserRequest> = yup
  .object()
  .shape({
    name: yup.string().max(128).required().lowercase(),
    email: yup.string().email().max(128).required(),
    cpf: yup.string().max(11).required(),
    password: yup.string().min(6).max(128).required(),
    phoneNumber: yup.string().max(11).required(),
    dateOfBirth: yup.string().required(),
    description: yup.string().max(256).notRequired().nullable(),
    typeOfAccount: yup
      .string()
      .oneOf(Object.values(AccountType), "Invalid account Type")
      .lowercase()
      .required(),
    address: addressRequestSerializer,
  }) as unknown as SchemaOf<IUserRequest>;

export const userResponseSerializer: SchemaOf<IUserResponse> = yup
  .object()
  .shape({
    name: yup.string().max(128).notRequired().lowercase(),
    email: yup.string().email().max(128).notRequired(),
    cpf: yup.string().max(11).notRequired(),
    phoneNumber: yup.string().max(11).notRequired(),
    dateOfBirth: yup.string().notRequired(),
    description: yup.string().max(256).notRequired().nullable(),
    typeOfAccount: yup
      .string()
      .oneOf(Object.values(AccountType), "Invalid account Type")
      .lowercase()
      .notRequired(),
    address: addressRequestSerializer.notRequired(),
    id: yup.string().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
  }) as unknown as SchemaOf<IUserResponse>;

export const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
  name: yup.string().max(128).notRequired().lowercase(),
  email: yup.string().email().max(128).notRequired(),
  cpf: yup.string().max(11).notRequired(),
  password: yup.string().min(6).max(128).notRequired(),
  phoneNumber: yup.string().max(11).notRequired(),
  dateOfBirth: yup.string().notRequired(),
  description: yup.string().max(256).notRequired().nullable(),
  typeOfAccount: yup
    .string()
    .oneOf(Object.values(AccountType), "Invalid account Type")
    .lowercase()
    .notRequired(),
  address: addressUpdateSerializer.notRequired(),
}) as unknown as SchemaOf<IUserUpdate>;

export const userRecoveryPasswordSerializer: SchemaOf<IUserRecoveryPasswordRequest> =
  yup.object().shape({
    email: yup.string().email().required(),
  });

export const userForgotPasswordSerializer: SchemaOf<IUserForgotPasswordRequest> =
  yup.object().shape({
    password: yup.string().required(),
  });
