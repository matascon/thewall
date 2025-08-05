import { use, useContext, useEffect, useState } from "react";
import { PostForm } from "../postForm";
import { PostList } from "../postList";
import useFetch from "../../hooks/useFetch";

interface Posts {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
}

const Main = () => {
  const [posts, setPosts] = useState<Posts[] | null>(null);
  const { fetchApi } = useFetch();

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetchApi(
        "http://localhost:8079/api/post/getPosts"
      );
      if (Array.isArray(response)) {
        setPosts(response as Posts[]);
      } else {
        setPosts(null);
      }
    };

    getPosts();
  }, []);

  return (
    <main>
      <PostForm />
      <PostList posts={posts} setPosts={setPosts} />
    </main>
  );
};

export default Main;
