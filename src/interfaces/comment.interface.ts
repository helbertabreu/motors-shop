export interface ICommentRequest {
  description: string;
}

export interface ICommentResponse extends ICommentRequest {
  id: string;
  post: string;
  userCommentId: string;
  userComment: string;
  createdAt: Date;
}
