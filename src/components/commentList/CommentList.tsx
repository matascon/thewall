import styles from "./CommentList.module.css";

interface Comments {
  content: string;
  userName: string;
}

type CommentListProps = {
  comments: Comments[];
  setComments: React.Dispatch<React.SetStateAction<Comments[]>>;
};

const CommentList = ({ comments, setComments }: CommentListProps) => {
  return (
    <ul>
      {comments?.map((comment) => (
        <li>
          <h3>{comment.userName}</h3>
          <p>{comment.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
