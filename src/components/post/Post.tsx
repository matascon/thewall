import "./Post.module.css";

const Post = () => {
  return (
    <div className="post">
      <h2>New Post</h2>
      <form>
        <label htmlFor="titlePost"></label>
        <input
          id="titlePost"
          name="titlePost"
          type="text"
          placeholder="Make a new post"
        />
        <label htmlFor="contentPost"></label>
        <input
          id="contentPost"
          name="contentPost"
          type="text"
          placeholder="Make a new post"
        />
      </form>
    </div>
  );
};

export default Post;
