import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
} from "@material-ui/core";
import ListPost from "../components/ListPost";
import PostForm from "../components/PostForm";
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={styles.title}>
                        CSRF Demo
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" className={styles.mt}>
                <PostForm />
                <ListPost posts={posts} />
            </Container>
        </>
    );
}
export async function getServerSideProps() {
    const posts = [
        {
            id: 1,
            userId: 2,
            content: "Mình muốn xem  free ahihi",
            name: "Vu",
        },
        { id: 2, userId: 2, content: "hihi", name: "Vu" },
        { id: 3, userId: 2, content: "hihi", name: "Vu" },
        { id: 4, userId: 2, content: "hihi", name: "Vu" },
    ];
    return { props: { posts } };
}
