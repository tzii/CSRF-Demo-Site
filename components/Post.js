import { Typography } from "@material-ui/core";
import styles from "../styles/Home.module.css";

export default function Post({ post }) {
    return (
        <div className={styles.post}>
            <Typography variant="h6">{post.name + " :"}</Typography>
            <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        </div>
    );
}
