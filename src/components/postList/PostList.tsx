import styles from "./PostList.module.css";
import useWebSocket from "../../hooks/useWebSocket";

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
  const factorizeDateTime: FactorizeDateTime = (dateTime) => {
    const newDateTime = dateTime.slice(0, 10) + " at " + dateTime.slice(11, 19);

    return newDateTime;
  };

  const handleNewPost: HandleNewPost = (newPost) => {
    console.log("🆕 Nuevo post recibido", newPost);
    setPosts((prev) => [newPost, ...(prev ?? [])]);
  };

  useWebSocket(handleNewPost);

  return (
    <ul className={styles.postList}>
      {posts?.map((post) => (
        <li key={post.id} className={styles.postListLi}>
          {/* <p>{post.id}</p> */}
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
        </li>
      ))}
    </ul>
  );
};

export default PostList;
