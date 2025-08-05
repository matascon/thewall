import type React from "react";
import "./PostForm.module.css";
import { useContext, useState } from "react";
import { UserNameContext } from "../../context/userNameContext";
import useFetch from "../../hooks/useFetch";

interface PostFormData {
  title: string;
  content: string;
  userName: string;
}

const Post = () => {
  const { userName } = useContext(UserNameContext);
  const [postFormData, setPostFormData] = useState<PostFormData>({
    title: "",
    content: "",
    userName: userName,
  });
  const [errorForm, setErrorForm] = useState<boolean>(false);
  const { fetchApi, loading } = useFetch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPostFormData((prev: PostFormData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorForm(false);
    if (postFormData.title && postFormData.content) {
      await fetchApi("http://localhost:8079/api/post/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postFormData),
      });

      setPostFormData({
        title: "",
        content: "",
        userName: userName,
      });
    } else {
      setErrorForm(true);
    }
  };

  return (
    <div className="post">
      <h2>New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titlePost">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Create a title for your post"
          value={postFormData.title}
          onChange={handleChange}
        />
        <label htmlFor="contentPost">Content</label>
        <input
          id="content"
          name="content"
          type="textarea"
          placeholder="Share your thoughts with everyone"
          value={postFormData.content}
          onChange={handleChange}
        />
        {errorForm && <p>All fields are required</p>}
        <button type="submit" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Post;
