// Not in use, can be removed

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 10,
        backgroundColor: theme.palette.paper.dark,
    },
}));

export default function AnonExplanation() {
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.root}
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography gutterBottom variant="h5" color="error">
                            Anonymization explanation
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}