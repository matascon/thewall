import postList from "./PostList.module.css";
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

type HandleNewPost = (newPost: {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  fileUrl: string;
  userName: string;
}) => void;

const PostList = ({ posts, setPosts }: PostListProps) => {
  const handleNewPost: HandleNewPost = (newPost) => {
    console.log("🆕 Nuevo post recibido", newPost);
    setPosts((prev) => [newPost, ...(prev ?? [])]);
  };

  useWebSocket(handleNewPost);

  return (
    <ul className={postList.postList}>
      {posts?.map((post) => (
        <li key={post.id}>
          <p>{post.id}</p>
          <h2>{post.userName}</h2>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.fileUrl && (
            <img src={post.fileUrl} width="300px" height="300px" />
          )}
          <p>{post.createdAt}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
