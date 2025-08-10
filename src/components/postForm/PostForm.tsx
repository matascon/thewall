import type React from "react";
import "./PostForm.module.css";
import { useContext, useRef, useState } from "react";
import { UserNameContext } from "../../context/userNameContext";
import useFetch from "../../hooks/useFetch";

interface PostFormData {
  title: string;
  content: string;
  userName: string;
}

interface PostFormProps {
  numberPostPrinted: React.MutableRefObject<number>;
}

const PostForm = ({ numberPostPrinted }: PostFormProps) => {
  const { userName } = useContext(UserNameContext);
  const [postFormData, setPostFormData] = useState<PostFormData>({
    title: "",
    content: "",
    userName: userName,
  });
  const fileUrlRef = useRef<string>("");
  const [fileImg, setFileImg] = useState<File | null>(null);
  const [errorForm, setErrorForm] = useState<boolean>(false);
  const { fetchApi, loading } = useFetch();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPostFormData((prev: PostFormData) => ({ ...prev, [name]: value }));
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileImg(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorForm(false);
    if (postFormData.title && postFormData.content) {
      if (fileImg) {
        const fileData = new FormData();
        fileData.append("file", fileImg);
        const response = await fetchApi(
          "http://localhost:8079/api/post/uploadImage",
          {
            method: "POST",
            body: fileData,
          }
        );
        if (response && typeof response === "object" && "fileUrl" in response) {
          fileUrlRef.current = (response as { fileUrl: string }).fileUrl;
        }
      }
      await fetchApi("http://localhost:8079/api/post/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...postFormData, fileUrl: fileUrlRef.current }),
      });
      setPostFormData({
        title: "",
        content: "",
        userName: userName,
      });
      fileUrlRef.current = "";
      numberPostPrinted.current += 1;
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
          onChange={handleChangeText}
        />
        <label htmlFor="contentPost">Content</label>
        <input
          id="content"
          name="content"
          type="textarea"
          placeholder="Share your thoughts with everyone"
          value={postFormData.content}
          onChange={handleChangeText}
        />
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          onChange={handleChangeImg}
        />
        {errorForm && <p>All fields are required</p>}
        <button type="submit" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default PostForm;
