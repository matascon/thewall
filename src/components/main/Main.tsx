import styles from "./Main.module.css";
import { useEffect, useRef, useState } from "react";
import { PostForm } from "../postForm";
import { PostList } from "../postList";
import useFetch from "../../hooks/useFetch";

interface Posts {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  fileUrl: string;
  userName: string;
}

const Main = () => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const numberPostsPrinted = useRef<number>(0);
  const hasFetchedRef = useRef<boolean>(false);
  const existMorePosts = useRef<boolean>(true);
  const { fetchApi } = useFetch();

  const getPosts = async () => {
    const response = await fetchApi(
      `http://backend:8079/api/post/getPosts/${numberPostsPrinted.current}`
    );
    if (Array.isArray(response) && !numberPostsPrinted.current) {
      setPosts(response as Posts[]);
      numberPostsPrinted.current += response.length;
      if (Array.isArray(response) && response.length < 5) {
        existMorePosts.current = false;
      }
    }
    return response;
  };

  useEffect(() => {
    const handleScroll = async () => {
      const limit = 100;
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (documentHeight - scrollPosition <= limit && !hasFetchedRef.current) {
        if (existMorePosts.current) {
          hasFetchedRef.current = true;
          const response = await getPosts();
          if (Array.isArray(response)) {
            numberPostsPrinted.current += response.length;
          }

          setPosts((prev) => {
            if (response && Array.isArray(response)) {
              return [...prev, ...response];
            }
            return prev;
          });
          if (Array.isArray(response) && response.length < 5) {
            existMorePosts.current = false;
          }
        }
      } else if (documentHeight - scrollPosition > limit && hasFetchedRef) {
        hasFetchedRef.current = false;
      }
    };

    getPosts();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={styles.main}>
      <PostForm numberPostPrinted={numberPostsPrinted} />
      <PostList posts={posts} setPosts={setPosts} />
    </main>
  );
};

export default Main;
