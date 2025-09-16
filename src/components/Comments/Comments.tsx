import styles from "./Comments.module.css";
import { useState, useEffect } from "react";
import { CommentList } from "../commentList";
import { CommentForm } from "../commentForm";
import useFetch from "../../hooks/useFetch";

interface Comments {
  id: number;
  content: string;
  userName: string;
}

type PropComments = {
  postId: number;
  setCommentsSection: React.Dispatch<React.SetStateAction<number | null>>;
};

const Comments = ({ postId, setCommentsSection }: PropComments) => {
  const [comments, setComments] = useState<Comments[]>([]);
  const { fetchApi } = useFetch();

  const closeComments = () => {
    setCommentsSection(null);
  };

  useEffect(() => {
    const getComments = async () => {
      const response = await fetchApi(
        `http://localhost:8079/api/comment/getComments/${postId}`
      );
      setComments(response as Comments[]);
    };

    getComments();
  }, [postId]);

  return (
    <div className={styles.comments}>
      <button onClick={closeComments}>Close</button>
      <CommentForm postId={postId} />
      <CommentList
        comments={comments}
        setComments={setComments}
        postId={postId}
      />
    </div>
  );
};

export default Comments;
