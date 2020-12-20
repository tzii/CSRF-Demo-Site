import { Button, Container, Grid, TextField } from "@material-ui/core";
import Axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import LoadingBar from "react-top-loading-bar";
import { useRef } from "react";

export default function LoginPage() {
  const router = useRouter();
  const loading = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    let params = new URLSearchParams();
    loading.current.staticStart();
    Axios.post("/api/login", { username: e.target.username.value, password: e.target.password.value }).then((res) => {
      if (res.data.status === "ok") router.push("/");
      loading.current.complete();
    });
  };

  return (
    <Container maxWidth="sm">
      <LoadingBar color="#f50057" ref={loading} />
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
          <TextField id="content" label="Username" variant="outlined" fullWidth={true} name="username" />
        </Grid>
        <Grid item xs={12}>
          <TextField id="content" label="Password" variant="outlined" fullWidth={true} name="password" />
        </Grid>
        <Grid item xs={8}>
          <Button variant="contained" color="primary" fullWidth={true} type="submit">
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
