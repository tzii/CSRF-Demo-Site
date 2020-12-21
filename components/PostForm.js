import { Button, Grid, TextField } from "@material-ui/core";
import Axios from "axios";
import styles from "../styles/Home.module.css";

export default function PostForm({ getAllPost, loading, _csrf }) {
  const submidHandler = (e) => {
    e.preventDefault();
    loading.current.staticStart();
    Axios.post("/api/post", { content: e.target.content.value, _csrf: e.target._csrf.value }).then(getAllPost);
    e.target.reset();
  };

  return (
    <Grid container spacing={2} alignItems="center" component="form" autoComplete="off" onSubmit={submidHandler}>
      <input type="hidden" id="_csrf" value={_csrf} />
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
