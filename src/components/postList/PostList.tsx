import "./PostList.module.css";
import useWebSocket from "../../hooks/useWebSocket";

interface Posts {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
}

type PostListProps = {
  posts: Posts[] | null;
  setPosts: React.Dispatch<React.SetStateAction<Posts[] | null>>;
};

type HandleNewPost = (newPost: {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
}) => void;

const PostList = ({ posts, setPosts }: PostListProps) => {
  const handleNewPost: HandleNewPost = (newPost) => {
    console.log("🆕 Nuevo post recibido", newPost);
    setPosts((prev) => [newPost, ...(prev ?? [])]);
  };

  useWebSocket(handleNewPost);

  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>
          <h2>{post.userName}</h2>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>{post.createdAt}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
