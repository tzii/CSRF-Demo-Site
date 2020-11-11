import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Tooltip,
    Fab,
} from "@material-ui/core";
import ListPost from "../components/ListPost";
import PostForm from "../components/PostForm";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { Delete } from "@material-ui/icons";

export default function Home() {
    const [user, setUser] = useState({ message: "You have not logged in" });
    const [logged, setLogged] = useState(false);
    const [posts, setPosts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        Axios.get("/api/user/info").then((res) => setUser(res.data));
    }, []);

    useEffect(() => {
        if (user.message) setLogged(false);
        else {
            setLogged(true);
            getAllPost();
        }
    }, [user]);

    const clickHandler = () => {
        if (!logged) router.push("/login");
        else logout();
    };

    const clearHandler = () => {
        Axios.get("/api/post/clear").then(getAllPost);
    };

    const logout = () => {
        Axios.get("/api/logout").then((res) => console.log(res.data));
        setUser({ message: "You have not logged in" });
        setLogged(false);
    };

    const getAllPost = () => {
        Axios.get("/api/post/all").then((res) => {
            setPosts(res.data);
            console.log("get all");
        });
    };
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={styles.title}>
                        CSRF Demo
                    </Typography>
                    {logged ? (
                        <Typography variant="subtitle1">{user.name}</Typography>
                    ) : null}
                    <Button color="inherit" onClick={clickHandler}>
                        {logged ? "Logout" : "Login"}
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" className={styles.mt}>
                {logged ? <PostForm getAllPost={getAllPost} /> : null}
                <ListPost posts={posts} />
            </Container>
            <Tooltip title="Clear">
                <Fab
                    color="secondary"
                    className={styles.absolute}
                    onClick={clearHandler}
                >
                    <Delete />
                </Fab>
            </Tooltip>
        </>
    );
}
