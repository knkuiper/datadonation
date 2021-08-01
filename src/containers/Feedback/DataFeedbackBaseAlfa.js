import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiTableCell from "@material-ui/core/TableCell";
import { Grid, Paper, Typography, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';

const TableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(MuiTableCell);

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
    table: {
        width: 450,
    },
}));

function createData(year, month, places, placDur, actDur, actDist, place1, place2, place3) {
    return { year, month, places, placDur, actDur, actDist, place1, place2, place3};
}

const rows = [
    createData('2019', 'January', 48, 24.801, 6.20, 1492.873, 9.722, 7.986, 0.843),
    createData('2020', 'January', 48, 24.803, 6.20, 1569.261, 10.664, 6.597, 1.290),
    createData('2021', 'January', 18, 29.449, 1.55, 340.939, 22.618, 1.178, 0.707),
];

export default function DataFeedbackBaseAlfa() {
    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.root}
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography gutterBottom variant="h5" color="error">
                        Data feedback
                        </Typography>
                        <Typography gutterBottom variant="body1" color="error">
                        This study examines the change in travel behaviour during the COVID-19 pandemic. We examined
                        your Google semantic Location History data for January in 2019, 2020, and 2021. 
                        </Typography>
                        <Typography gutterBottom variant="body1" color="error">
                        {/*To be precise, we extracted per month the total number of visited places, and the number of days 
                        spend per place for the three most visited places. Also, we extracted the number of days spend in 
                        places and travelling, and the travelled distance in km.*/}
                        </Typography>
                        <br />
                        <TableContainer>
                            <Table className={classes.table} size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right"><Typography variant="body2" color="error">Year</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="body2" color="error">Month</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="body2" color="error">Number of places</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="body2" color="error">Places duration [days]</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="body2" color="error">Activity duration [days]</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="body2" color="error">Activity distance [km]</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="body2" color="error">Place 1 [days]</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="body2" color="error">Place 2 [days]</Typography></TableCell>
                                        <TableCell align="right"><Typography variant="body2" color="error">Place 3 [days]</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.year}>
                                            <TableCell component="th" scope="row">
                                                <Typography variant="body2" color="error">{row.year}</Typography>
                                            </TableCell>
                                            <TableCell align="right"><Typography variant="body2" color="error">{row.month}</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" color="error">{row.places}</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" color="error">{row.placDur}</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" color="error">{row.actDur}</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" color="error">{row.actDist}</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" color="error">{row.place1}</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" color="error">{row.place2}</Typography></TableCell>
                                            <TableCell align="right"><Typography variant="body2" color="error">{row.place3}</Typography></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}