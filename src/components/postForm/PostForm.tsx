import styles from "./PostForm.module.css";
import type React from "react";
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
  const errorImg = useRef<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { fetchApi, loading } = useFetch();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPostFormData((prev: PostFormData) => ({ ...prev, [name]: value }));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const heightArea = textAreaRef.current;

    setPostFormData((prev: PostFormData) => ({ ...prev, [name]: value }));
    if (heightArea) {
      heightArea.style.height = "auto";
      heightArea.style.height = heightArea.scrollHeight + "px";
    }
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileImg(e.target.files ? e.target.files[0] : null);
    setFileName(e.target.files ? e.target.files[0].name : null);
  };

  const handleDeleteImg = () => {
    setFileName(null);
    if (fileRef.current) {
      fileRef.current.value = "";
      setFileImg(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorForm(false);
    errorImg.current = false;
    if (postFormData.title && postFormData.content) {
      if (fileImg) {
        const fileData = new FormData();
        fileData.append("file", fileImg);
        const response = await fetchApi("/api/post/uploadImage", {
          method: "POST",
          body: fileData,
        });
        if (response && typeof response === "object" && "fileUrl" in response) {
          fileUrlRef.current = (response as { fileUrl: string }).fileUrl;
        }
        if (!response) {
          errorImg.current = true;
        }
      }
      if (!errorImg.current) {
        await fetchApi("/api/post/createPost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...postFormData,
            fileUrl: fileUrlRef.current,
          }),
        });
        setPostFormData({
          title: "",
          content: "",
          userName: userName,
        });
        setFileImg(null);
        fileUrlRef.current = "";
        setFileName(null);
        numberPostPrinted.current += 1;
      }
    } else {
      setErrorForm(true);
    }
  };

  return (
    <div className={styles.post}>
      <h2 className={styles.postFormH2}>New Post</h2>
      <form onSubmit={handleSubmit} className={styles.postForm}>
        <label className={styles.postFormLabel} htmlFor="titlePost">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Create a title for your post"
          value={postFormData.title}
          className={styles.postFormInput}
          onChange={handleChangeText}
        />
        <label className={styles.postFormLabel} htmlFor="contentPost">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Share your thoughts with everyone"
          autoComplete="off"
          ref={textAreaRef}
          value={postFormData.content}
          className={styles.postFormTextArea}
          onChange={handleChangeTextArea}
          wrap="soft"
        />
        <label htmlFor="file" className={styles.postFormInputFile}>
          Add Image
        </label>
        <input
          id="file"
          name="file"
          type="file"
          ref={fileRef}
          onChange={handleChangeImg}
          className={styles.postFormInput}
        />
        {fileName && (
          <div className={styles.postFormDiv}>
            <p>{fileName}</p>
            <p className={styles.postFormDivP} onClick={handleDeleteImg}>
              X
            </p>
          </div>
        )}
        {errorForm && (
          <p className={styles.postFormP}>All fields are required</p>
        )}
        {errorImg.current && (
          <p className={styles.postFormP}>
            File must be a JPG, JPEG or PNG extension
          </p>
        )}
        <button
          className={styles.postFormButton}
          type="submit"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default PostForm;
