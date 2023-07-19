import { Request, Response } from "express";
import { IPostRequest, IPostUpdate } from "../interfaces/post.interface";
import { createPostService } from "../services/posts/createPost.service";
import { listAllPostsService } from "../services/posts/listAllPosts.service";
import { listPostByIdService } from "../services/posts/listPostById.service";
import { deletePostService } from "../services/posts/deletePost.service";
import { updatePostService } from "../services/posts/updatePost.service";
import { delistPostService } from "../services/posts/delistPost.service";

export const createPostController = async (req: Request, res: Response) => {
  const postData: IPostRequest = req.body;
  const user = req.user;
  const post = await createPostService(postData, user);

  return res.status(201).json(post);
};
export const listAllPostsController = async (req: Request, res: Response) => {
  const posts = await listAllPostsService();

  return res.json(posts);
};

export const listPostByIdController = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = await listPostByIdService(postId);

  return res.status(200).json(post);
};

export const deletePostController = async (req: Request, res: Response) => {
  const postId = req.params.id;
  await deletePostService(postId);

  return res.status(204).json({});
};

export const updatePostController = async (req: Request, res: Response) => {
  const postData: IPostUpdate = req.body;
  const userId: string = req.user.id;
  const postId: string = req.params.id;
  const post = await updatePostService(postData, userId, postId);

  return res.status(200).json(post);
};

export const delistPostController = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const userId: string = req.user.id;
  const post = await delistPostService(postId, userId);

  return res.status(200).json(post);
};
