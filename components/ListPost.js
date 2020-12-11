import { Typography } from "@material-ui/core";
import styles from "../styles/Home.module.css";
import Post from "../components/Post";

export default function ListPost({ posts }) {
  return (
    <div className={styles.mt}>
      <Typography variant="h4" className={styles.mb}>
        Posts
      </Typography>
      {posts.map((post, i) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
}
