import styles from "./PostList.module.css";
import useWebSocketPosts from "../../hooks/useWebSocketPosts";
import { useState } from "react";
import { Comments } from "../Comments";

interface Posts {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  fileUrl: string;
  userName: string;
}

type PostListProps = {
  posts: Posts[];
  setPosts: React.Dispatch<React.SetStateAction<Posts[]>>;
};

type FactorizeDateTime = (dateTime: string) => string;

type HandleNewPost = (newPost: {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  fileUrl: string;
  userName: string;
}) => void;

const PostList = ({ posts, setPosts }: PostListProps) => {
  const [commentsSection, setCommensSection] = useState<number | null>(null);

  const factorizeDateTime: FactorizeDateTime = (dateTime) => {
    const newDateTime = dateTime.slice(0, 10) + " at " + dateTime.slice(11, 19);

    return newDateTime;
  };

  const displayComments = (postId: number) => {
    setCommensSection(postId);
  };

  const handleNewPost: HandleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...(prev ?? [])]);
  };

  useWebSocketPosts(handleNewPost);

  return (
    <ul className={styles.postList}>
      {posts?.map((post) => (
        <li key={post.id} className={styles.postListLi}>
          <h2 className={styles.postListH2}>{post.userName}</h2>
          <h3 className={styles.postListH3}>{post.title}</h3>
          <p className={styles.postListP}>{post.content}</p>
          {post.fileUrl && (
            <>
              <div className={styles.postListDiv}>
                <img className={styles.postListDivImg} src={post.fileUrl} />
              </div>
            </>
          )}
          <p className={styles.postListP}>
            {factorizeDateTime(post.createdAt)}
          </p>
          {commentsSection !== post.id && (
            <button
              className={styles.postListButton}
              onClick={() => displayComments(post.id)}
            >
              Comments
            </button>
          )}
          {commentsSection === post.id && (
            <Comments postId={post.id} setCommentsSection={setCommensSection} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default PostList;
