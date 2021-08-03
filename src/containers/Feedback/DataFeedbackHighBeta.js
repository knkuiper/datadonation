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
        minWidth: 650,
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

export default function DataFeedbackHighBeta() {
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
                        {/* Explanation in high/abstract level - why */}
                        <Typography gutterBottom variant="h5" color="error">
                        Data feedback
                        </Typography>

                        <Typography paragraph variant="body1" color="error">
                        This study examines the change in travel behaviour during the COVID-19 pandemic by examining your Google semantic
                        Location History data for January in 2019, 2020, and 2021. We only extract the location data from the Google data
                        package, as this is the data the needed for the researchers to investigate the research questions. The identifying
                        information is anonymized, so that no personal data is included in the data you donate to the research study.
                        </Typography>

                        <Typography paragraph variant="body1" color="error">
                        The total number of visited places, and the time spent per place are extracted for the three most visited places.
                        The time spent in places and in activity, as well as the travelled distance in kilometres, are also extracted. The
                        extracted data is written out as a new dataset ready to be donated to the research study.
                        </Typography>

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