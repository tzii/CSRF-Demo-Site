import { Button, Grid, TextField } from "@material-ui/core";
import styles from "../styles/Home.module.css";

export default function PostForm() {
    const submidHandler = (e) => {
        e.preventDefault();
    };

    return (
        <Grid
            container
            spacing={2}
            alignItems="center"
            component="form"
            autoComplete="off"
            onSubmit={submidHandler}
        >
            <Grid item xs={10}>
                <TextField
                    id="content"
                    label="content"
                    variant="outlined"
                    fullWidth={true}
                    name="content"
                />
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" color="primary" fullWidth={true}>
                    Post
                </Button>
            </Grid>
        </Grid>
    );
}
