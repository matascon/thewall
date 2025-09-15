import { useState } from "react";
import { CommentList } from "../commentList";
import styles from "./Comments.module.css";

interface Comments {
  content: string;
  userName: string;
}

const Comments = () => {
  const [comments, setComments] = useState<Comments[]>([]);

  return (
    <>
      <CommentList comments={comments} setComments={setComments} />
    </>
  );
};
