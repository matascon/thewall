import styles from "./CommentForm.module.css";
import { UserNameContext } from "../../context/userNameContext";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useRef } from "react";
import { PasswdContext } from "../../context/passwdContext";

interface CommentFormData {
  content: string;
  userName: string;
  passwd: string;
  postId: number;
}

type PropsCommentForm = {
  postId: number;
};

const CommentForm = ({ postId }: PropsCommentForm) => {
  const { userName } = useContext(UserNameContext);
  const { passwd } = useContext(PasswdContext);
  const textAreaCommentRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentFormData, setCommentFormData] = useState<CommentFormData>({
    content: "",
    userName: userName,
    passwd: passwd,
    postId: postId,
  });
  const { fetchApi } = useFetch();

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const heightArea = textAreaCommentRef.current;

    setCommentFormData((prev: CommentFormData) => ({
      ...prev,
      [name]: value,
    }));
    if (heightArea) {
      heightArea.style.height = "auto";
      heightArea.style.height = heightArea.scrollHeight + "px";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentFormData.content.trim().length) {
      await fetchApi("/api/comment/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentFormData),
      });
      setCommentFormData((prev: CommentFormData) => ({
        ...prev,
        content: "",
      }));
    }
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <textarea
        name="content"
        placeholder="Type a new comment"
        autoComplete="off"
        value={commentFormData.content}
        onChange={handleChangeTextArea}
        ref={textAreaCommentRef}
        wrap="soft"
        className={styles.commentFormTextArea}
      />
      <button className={styles.commentFormButton} type="submit">
        Send
      </button>
    </form>
  );
};

export default CommentForm;
