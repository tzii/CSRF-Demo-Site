import { AppBar, Toolbar, Typography, Button, Container, Tooltip, Fab } from "@material-ui/core";
import ListPost from "../components/ListPost";
import PostForm from "../components/PostForm";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { Delete } from "@material-ui/icons";
import LoadingBar from "react-top-loading-bar";
import { mongodb_uri } from "../config";
import { applySession, expressSession } from "next-session";
import connectMongo from "connect-mongo";

const MongoStore = connectMongo(expressSession);

export default function Home({ user }) {
  const [logged, setLogged] = useState(false);
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const loading = useRef();

  useEffect(() => {
    if (!user) setLogged(false);
    else {
      setLogged(true);
      loading.current.staticStart();
      getAllPost();
    }
  }, []);

  const clickHandler = () => {
    if (!logged) router.push("/login");
    else logout();
  };

  const clearHandler = () => {
    loading.current.staticStart();
    Axios.get("/api/post/clear").then(getAllPost);
  };

  const logout = () => {
    setLogged(false);
    loading.current.staticStart();
    Axios.get("/api/logout").then(() => loading.current.complete());
  };

  const getAllPost = () => {
    Axios.get("/api/post/all").then((res) => {
      if (res.data.status === "err") return setPosts([]);
      setPosts(res.data);
      loading.current.complete();
    });
  };
  return (
    <>
      <LoadingBar ref={loading} color="#f50057" />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            CSRF Demo
          </Typography>
          {logged ? <Typography variant="subtitle1">{user.name}</Typography> : null}
          <Button color="inherit" onClick={clickHandler}>
            {logged ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" className={styles.mt}>
        {logged ? <PostForm getAllPost={getAllPost} loading={loading} /> : null}
        <ListPost posts={posts} />
      </Container>
      <Tooltip title="Clear">
        <Fab color="secondary" className={styles.absolute} onClick={clearHandler}>
          <Delete />
        </Fab>
      </Tooltip>
    </>
  );
}

export async function getServerSideProps(context) {
  await applySession(context.req, context.res, {
    store: new MongoStore({ url: mongodb_uri, dbName: "csrf" }),
  });
  return { props: { user: context.req.session.user || false } };
}
