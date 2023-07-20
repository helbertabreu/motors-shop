import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities/comment.entity";
import { AppError } from "../../errors/appError";

export const deleteCommentService = async (
  userId: string,
  commentId: string
) => {
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

  commentRepository.delete(commentId);
};
