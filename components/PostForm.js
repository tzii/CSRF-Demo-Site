import { Button, Grid, TextField } from "@material-ui/core";
import Axios from "axios";
import styles from "../styles/Home.module.css";

export default function PostForm({ getAllPost, loading }) {
  const submidHandler = (e) => {
    e.preventDefault();
    loading.current.staticStart();
    Axios.get(`/api/post?content=${e.target.content.value}`).then(getAllPost);
    e.target.reset();
  };

  return (
    <Grid container spacing={2} alignItems="center" component="form" autoComplete="off" onSubmit={submidHandler}>
      <Grid item xs={10}>
        <TextField id="content" label="content" variant="outlined" fullWidth={true} name="content" />
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" fullWidth={true} type="submit">
          Post
        </Button>
      </Grid>
    </Grid>
  );
}
