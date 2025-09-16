import { UserNameContext } from "../../context/userNameContext";
import useFetch from "../../hooks/useFetch";
import styles from "./CommentForm.module.css";
import { useContext, useState, useRef } from "react";

interface CommentFormData {
  content: string;
  userName: string;
  postId: number;
}

type PropsCommentForm = {
  postId: number;
};

const CommentForm = ({ postId }: PropsCommentForm) => {
  const { userName } = useContext(UserNameContext);
  const textAreaCommentRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentFormData, setCommentFormData] = useState<CommentFormData>({
    content: "",
    userName: userName,
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

    console.log(commentFormData.content);
    if (commentFormData.content) {
      await fetchApi("http://localhost:8079/api/comment/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentFormData),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="content"
        placeholder="Type a new comment"
        autoComplete="off"
        onChange={handleChangeTextArea}
        ref={textAreaCommentRef}
        wrap="soft"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default CommentForm;
