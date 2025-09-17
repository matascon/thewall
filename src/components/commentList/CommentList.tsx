import styles from "./CommentList.module.css";
import useWebSocketComments from "../../hooks/useWebSocketComments";

interface Comments {
  id: number;
  content: string;
  userName: string;
}

type HandleNewComment = (newComment: {
  id: number;
  content: string;
  userName: string;
}) => void;

type CommentListProps = {
  comments: Comments[];
  setComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  postId: number;
};

const CommentList = ({ comments, setComments, postId }: CommentListProps) => {
  const handleNewComment: HandleNewComment = (newComment) => {
    setComments((prev) => [newComment, ...(prev ?? [])]);
  };

  useWebSocketComments(handleNewComment, postId);

  return (
    <ul className={styles.commentList}>
      {comments?.map((comment) => (
        <li key={comment.id}>
          <h3 className={styles.commentListH3}>{comment.userName}</h3>
          <p className={styles.commentListP}>{comment.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
