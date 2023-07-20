import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  ICommentRequest,
  ICommentResponse,
} from "../interfaces/comment.interface";

export const commentRequestSerializer: SchemaOf<ICommentRequest> = yup
  .object()
  .shape({
    description: yup.string().max(500).required(),
  });

export const commentResponseSerializer: SchemaOf<ICommentResponse> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    post: yup.string().notRequired(),
    description: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    userCommentId: yup.string().notRequired(),
    userComment: yup.string().notRequired(),
  });
