import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IImage,
  IImageResponse,
  IPostRequest,
  IPostResponse,
  IPostUpdate,
} from "../interfaces/post.interface";

export const imageRequestSerializer: SchemaOf<IImage> = yup.object().shape({
  imageLink: yup.string().max(256).required(),
});

export const imageResponseSerializer: SchemaOf<IImageResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    imageLink: yup.string().max(256).required(),
    createdAt: yup.date().required(),
  });

export const postRequestSerializer: SchemaOf<IPostRequest> = yup
  .object()
  .shape({
    mark: yup.string().max(128).required().lowercase(),
    model: yup.string().max(128).required().lowercase(),
    year: yup.string().required(),
    fuelType: yup.string().max(128).required().lowercase(),
    price: yup.string().max(128).required(),
    tablePriceFiper: yup.string().max(128).required(),
    color: yup.string().max(128).required().lowercase(),
    kilometers: yup.string().max(128).required(),
    description: yup.string().max(256).notRequired().nullable(),
    imageCap: yup.string().required(),
    images: yup.array(imageRequestSerializer).notRequired().nullable(),
  });
export const postResponseSerializer: SchemaOf<IPostResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    mark: yup.string().max(128).required().lowercase(),
    model: yup.string().max(128).required().lowercase(),
    year: yup.string().required(),
    fuelType: yup.string().max(128).required().lowercase(),
    price: yup.string().max(128).required(),
    tablePriceFiper: yup.string().max(128).required(),
    color: yup.string().max(128).required().lowercase(),
    kilometers: yup.string().max(128).required(),
    description: yup.string().max(256).notRequired().nullable(),
    isGoodPurchase: yup.boolean().required(),
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    imageCap: yup.string().required(),
    images: yup.array(imageResponseSerializer).notRequired().nullable(),
    user: yup
      .object()
      .shape({
        id: yup.string().required(),
        email: yup.string().email().required(),
        name: yup.string().required(),
        phoneNumber: yup.string().required(),
        description: yup.string().required(),
      })
      .required(),
  });

export const listPostSerializer: SchemaOf<IPostResponse[]> = yup.array(
  postResponseSerializer
);

export const postUpdateSerializer: SchemaOf<IPostUpdate> = yup.object().shape({
  mark: yup.string().max(128).notRequired().lowercase(),
  model: yup.string().max(128).notRequired().lowercase(),
  year: yup.string().notRequired(),
  fuelType: yup.string().max(128).notRequired().lowercase(),
  price: yup.string().max(128).notRequired(),
  color: yup.string().max(128).notRequired().lowercase(),
  kilometers: yup.string().max(128).notRequired(),
  description: yup.string().max(256).notRequired().nullable(),
  isActive: yup.boolean().notRequired(),
  imageCap: yup.string().notRequired(),
  images: yup.array(imageRequestSerializer).notRequired().nullable(),
});
