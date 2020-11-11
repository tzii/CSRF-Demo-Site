import { Typography } from "@material-ui/core";
import Axios from "axios";
import { getDisplayName } from "next/dist/next-server/lib/utils";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Post({ post }) {
    const [user, setUser] = useState({ id: post.userId, name: "NULL" });
    useEffect(() => {
        Axios.get(`/api/user/${post.userId}`).then((res) => setUser(res.data));
    }, []);

    return (
        <div className={styles.post}>
            <Typography variant="h6">{user.name + " :"}</Typography>
            <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        </div>
    );
}
