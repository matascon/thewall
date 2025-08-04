import { use, useContext, useState } from "react";
import { PostForm } from "../postForm";

interface Posts {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
}

const Main = () => {
  const [posts, setPosts] = useState<Posts[] | null>(null);

  return (
    <main>
      <PostForm />
    </main>
  );
};

export default Main;
