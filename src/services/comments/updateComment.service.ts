import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/comment.entity";
import { AppError } from "../../errors/appError";
import {
  ICommentRequest,
  ICommentResponse,
} from "../../interfaces/comment.interface";
import { commentResponseSerializer } from "../../serializers/comment.serializer";

export const updateCommentService = async (
  userId: string,
  commentId: string,
  commentData: ICommentRequest
): Promise<ICommentResponse> => {
  const commentRepository = AppDataSource.getRepository(Comment);

  const foundComment = await commentRepository.findOneBy({
    id: commentId,
  });

  if (!foundComment) {
    throw new AppError("Comment not found", 404);
  }

  if (userId !== foundComment.userCommentId) {
    throw new AppError("You don't have authorization", 401);
  }

  const updatedComment = commentRepository.create({
    ...foundComment,
    ...commentData,
  });

  await commentRepository.save(updatedComment);

  const commentResponse = await commentResponseSerializer.validate(
    updatedComment,
    {
      stripUnknown: true,
    }
  );

  return commentResponse;
};
