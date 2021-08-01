/// Dashboard page for version Gamma - high construal version with high level explanation + the script
/// For round 2 of experiment, links to donation page Gamma round 2

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, CardContent, CardActions, Avatar, Button, Typography } from '@material-ui/core';
import UUlogo from '../../../assets/img/UU_logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 15,
        marginLeft: 30,
    },
    title: {
        padding: 10,
        marginLeft: 20,
        marginTop: 20,
    },
    cardGrid: {
        padding: 20,
    },
    cardContainer: {
        maxWidth: 345,
        padding: 10,
        backgroundColor: '#e3f2fd',
    },
    button: {
        marginLeft: 'auto',
        marginBottom: 5,
        marginRight: 5,
    }
}));

export default function DashboardGammaR2() {
    const classes = useStyles();

    return (
        <>
        <Grid container
            spacing={3}
            direction="row"
            justifyContent="flex-start"
            className={classes.root}
        >
        <Grid item xs={12} className={classes.title}>
            <Typography variant="h5" color="textPrimary">
                Available studies 1
            </Typography>
        </Grid>
        <Grid item xs={12} className={classes.cardGrid}>
            <Card className={classes.cardContainer}>
                <CardHeader
                    avatar={
                        <Avatar alt="UUlogo" src={UUlogo} className={classes.avatar} />
                    }
                    title={
                        <Typography variant="h6" component="h6">
                            Changes in movement during Covid lockdowns
                        </Typography>
                    }
                />
                <CardContent>
                    <Typography variant="subtitle1" color="textPrimary">
                        How much did the % of time you spent inside and outside your home change because of the covid-lockdown?
                    </Typography>
                    <Typography variant="subtitle1" paragraph color="textPrimary">
                        The research study will examine your Google semantic Location History data of January 2019, 2020 and 2021.
                    </Typography>
                    <Typography variant="subtitle1" paragraph color="textPrimary">
                        We respect your privacy. Your data donation is anonymous.
                    </Typography>
                    <Typography variant="subtitle2" paragraph color="textPrimary">
                        Available from July to August 2021
                    </Typography>
                    <Typography variant="subtitle2" color="textPrimary">
                        Open for data donation
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button variant="contained" color="primary" href="/donationC2" className={classes.button}>
                    {/* Link to the Gamma round 2 donation page, donationC2 */}
                        Donate data
                    </Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={12} className={classes.title}>
            <Typography variant="h5" color="textPrimary">
                Upcoming studies 2
            </Typography>
        </Grid>
        <Grid item xs={4} className={classes.cardGrid}>
            <Card className={classes.cardContainer}>
                <CardHeader
                    avatar={
                        <Avatar alt="UUlogo" src={UUlogo} className={classes.avatar} />
                    }
                    title={
                        <Typography variant="h6" component="h6">
                            Changes in internet search patterns during Covid lockdowns
                        </Typography>
                    }
                />
                <CardContent>
                    <Typography variant="subtitle1" paragraph color="textPrimary">
                        The research study will examine your Google search history of January 2019, 2020 and 2021.
                    </Typography>
                    <Typography variant="subtitle1" paragraph color="textPrimary">
                        We respect your privacy. Your data donation is anonymous.
                    </Typography>
                    <Typography variant="subtitle2" paragraph color="textPrimary">
                        Available from August 2021
                    </Typography>
                    <Typography variant="subtitle2" color="textPrimary">
                        Not open for data donation
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button variant="contained" disabled className={classes.button}>
                        Donate data
                    </Button>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={4} className={classes.cardGrid}>
            <Card className={classes.cardContainer}>
                <CardHeader
                    avatar={
                        <Avatar alt="UUlogo" src={UUlogo} className={classes.avatar} />
                    }
                    title={
                        <Typography variant="h6" component="h6">
                            Changes in streaming habits  during Covid lockdowns
                        </Typography>
                    }
                />
                <CardContent>
                    <Typography variant="subtitle1" paragraph color="textPrimary">
                        The research study will examine your Netflix viewing history of January 2019, 2020 and 2021.
                    </Typography>
                    <Typography variant="subtitle1" paragraph color="textPrimary">
                        We respect your privacy. Your data donation is anonymous.
                    </Typography>
                    <Typography variant="subtitle2" paragraph color="textPrimary">
                        Available from October 2021
                    </Typography>
                    <Typography variant="subtitle2" color="textPrimary">
                        Not open for data donation
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button variant="contained" disabled className={classes.button}>
                        Donate data
                    </Button>
                </CardActions>
            </Card>
        </Grid>
        </Grid>
        </>
    );
}
