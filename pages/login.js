import { Button, Container, Grid, TextField } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function LoginPage() {
    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();
        let params = new URLSearchParams();
        params.append("username", e.target.username.value);
        params.append("password", e.target.password.value);
        console.log(params);
        Axios.post("http://localhost:3000/api/login", params).then((res) => {
            if (res.data.message == "Loggin successfully") router.push("/");
        });
    };

    return (
        <Container maxWidth="sm">
            <Grid
                container
                spacing={2}
                alignItems="center"
                component="form"
                autoComplete="off"
                className={styles.login}
                alignContent="center"
                justify="center"
                onSubmit={submitHandler}
            >
                <Grid item xs={12}>
                    <TextField
                        id="content"
                        label="Username"
                        variant="outlined"
                        fullWidth={true}
                        name="username"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="content"
                        label="Password"
                        variant="outlined"
                        fullWidth={true}
                        name="password"
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        type="submit"
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
