import { Request, Response } from "express";
import { ICommentRequest } from "../interfaces/comment.interface";
import { createCommentService } from "../services/comments/createComment.service";
import { deleteCommentService } from "../services/comments/deleteComment.service";
import { updateCommentService } from "../services/comments/updateComment.service";

export const createCommentController = async (req: Request, res: Response) => {
  const commentData: ICommentRequest = req.body;
  const postId: string = req.params.id;
  const userId: string = req.user.id;
  const comment = await createCommentService(commentData, userId, postId);

  return res.status(201).json(comment);
};

export const deleteCommentController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const commentId: string = req.params.id;
  await deleteCommentService(userId, commentId);

  return res.status(204).json({});
};

export const updateCommentController = async (req: Request, res: Response) => {
  const commentData: ICommentRequest = req.body;
  const commentId: string = req.params.id;
  const userId: string = req.user.id;
  const comment = await updateCommentService(userId, commentId, commentData);

  return res.status(200).json(comment);
};
