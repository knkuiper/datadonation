/// Script for version Gamma - low construal version with low level explanation + the script

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardHeader, CardActions, Typography, CardMedia } from '@material-ui/core';
// unused import CardContent
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import InfographicGammaVideo from '../../assets/video/InfographicGamma.mp4';
// alternative explanations forms not in use
//import GammaGraphicImage from '../../assets/img/GammaConcrete_graphic.png';
//import PipelineStepperGamma from '../DataPipeline/PipelineStepperGamma';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    card: {
        marginTop: 20,
        padding: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'right',
        backgroundColor: theme.palette.paper.dark,
    },
    media: {
        width: "100%",
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    indentOne: {
        marginLeft: 20,
    },
    indentTwo: {
        marginLeft: 40,
    },
    indentThree: {
        marginLeft: 60,
    },
    indentFour: {
        marginLeft: 80,
    },
    indentFive: {
        marginLeft: 100,
    },
    indentSix: {
        marginLeft: 120,
    },
    indentSeven: {
        marginLeft: 140,
    },
    indentEight: {
        marginLeft: 160,
    },
}));

export default function ScriptGamma() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
        <Grid container className={classes.root}
            direction="row"
            justifycontent="flex-start"
        >
        <Grid item>
            <Card className={classes.card}>
                {/* Explanation in low/concrete level - how */}
                <CardHeader title={
                    <Typography paragraph variant="h5" color="error">
                        How your data is processed and prepared for data donation
                    </Typography>}
                />
                <CardMedia
                    className={classes.media}
                    component="video"
                    src={InfographicGammaVideo}
                    title="gamma-video-explanation"
                    autoPlay
                    controls
                />
                {/* Alt version to show explanation as a image
                <CardMedia 
                    className={classes.media}
                    component="img"
                    image={GammaGraphicImage}
                    title="gamma-img-explanation"
                />
                */}
                {/*<CardContent>
                    <Typography paragraph variant="body1" color="error">
                        1.	Input: your Google data package<br />
                        The location history data from Google consists of data files with lists of saved geo-locations and activities at these locations. From the Google Takeout ZIP file you uploaded, we extract the relevant location data for this research study.<br />
                        <br />
                        2.	The Google data package <br />
                        We extract the relevant location data and calculate the top three places you visited, the duration of these visits, and your activities and duration of these activities from January 2019, 2020, and 2021.<br />
                        <br />
                        3.	Run: anonymization script <br />
                        Your data is anonymized by running a script that removes any personal and identifying information such as addresses, street names or GPS coordinates from the data.<br />
                        <br />
                        4.	The anonymization script <br />
                        To anonymize the data, any information that can be used to identify you is replaced with placeholders. For example, if one of the saved addresses in the Google data package is “Heidelberglaan 8”, this will be replaced with “Place 1” in the new, anonymized data file.<br />
                        <br />
                        5.	Output: data donation file <br />
                        The extracted data from your Google data package is returned as a new and anonymized data file ready to be donated to the research study.<br />
                        <br />
                        6.	The data donation file <br />
                        The total number of visited places are extracted from the Google data and saved in the data donation file. The three most visited places are calculated, and the days spent per place. The time spent in the different places and in activity, as well as the travelled distance in kilometres is also extracted.

                    
                    </Typography>
                    {/* Alt version to show explanation as a stepper
                    <PipelineStepperGamma /> 
                </CardContent> */}
                
                <CardActions>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                    <ExpandMoreIcon
                        color="error"
                        fontSize="medium"
                    />
                    </IconButton>
                        <Typography paragraph variant="body2" color="error">
                        {/*This study examines the change in travel behaviour during the COVID-19 pandemic by examining your Google
                        semantic Location History data for January in 2019, 2020, and 2021.<br />
                        <br />*/}
                        Expand to see the script used to anonymize your data and extract the relevant data from your data package.
                    </Typography>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Typography gutterBottom variant="body2" color="error">
                        <code>
                            <br />
                            import json<br/>
                            import itertools<br/>
                            import re<br/>
                            import zipfile<br/>
                            import pandas as pd<br/>
                            <br/>
                            # years and months to extract data for <br/>
                            YEARS = [2019, 2020, 2021]<br/>
                            MONTHS = ["JANUARY"]<br/>
                            NPLACES = 3<br/>
                            TEXT = "This study examines the change in travel behaviour during the COVID-19 <br />
                            pandemic. We examined your Google semantic Location History data for January in <br />
                            2019, 2020, and 2021."
                            <br/>
                            <br/>
                            
                            def __visit_duration(data):<br/>
                                <div className={classes.indentOne}>
                                """Get duration per visited place
                                <br/>
                                Args:
                                </div>
                                    <div className={classes.indentTwo}> data (dict): Google Semantic Location History data</div>
                                <div className={classes.indentOne}>Returns:</div>
                                    <div className={classes.indentTwo}>dict: duration per visited place, sorted in descending order<br /></div>
                                <div className={classes.indentOne}>
                                """<br />
                                placevisit_duration = []<br/>
                                for data_unit in data["timelineObjects"]:</div>
                                        <div className={classes.indentTwo}>if "placeVisit" in data_unit:</div>
                                            <div className={classes.indentThree}>
                                            address = data_unit["placeVisit"]["location"]["placeId"]<br/>
                                            start_time = data_unit["placeVisit"]["duration"]["startTimestampMs"]<br/>
                                            end_time = data_unit["placeVisit"]["duration"]["endTimestampMs"]<br/>
                                            placevisit_duration.append(</div>
                                                <div className={classes.indentFour}>{`{address: (int(end_time) - int(start_time))/(1e3*24*60*60)})`}</div>
                                <br/>
                                <div className={classes.indentOne}>
                                # list of places visited<br/>
                                {`address_list = {next(iter(duration)) for duration in placevisit_duration}`}<br />
                                <br />
                                # dict of time spend per place<br/>
                                places = {`{}`} <br/>
                                for address in address_list:</div>
                                    <div className={classes.indentTwo}>places[address] = round(sum(</div>
                                        <div className={classes.indentThree}>[duration[address] for duration in placevisit_duration</div>
                                            <div className={classes.indentFour}>if address == list(duration.keys())[0]]), 3)</div>
                                <div className={classes.indentOne}>
                                # Sort places to amount of time spend<br/>
                                places = dict(sorted(places.items(), key=lambda kv: kv[1], reverse=True))<br />
                                <br/>
                                return places</div>
                                <br/>
                                <br />
                            
                            def __activity_duration(data):
                                <div className={classes.indentOne}>
                                """Get total duration of activities<br />
                                Args:</div>
                                    <div className={classes.indentTwo}>data (dict): Google Semantic Location History data</div>
                                <div className={classes.indentOne}>Returns:</div>
                                    <div className={classes.indentTwo}>float: duration of actitvities in days</div>
                                <div className={classes.indentOne}>
                                """<br />
                                activity_duration = 0.0<br />
                                for data_unit in data["timelineObjects"]:
                                </div>
                                <div className={classes.indentTwo}>if "activitySegment" in data_unit.keys():</div>
                                <div className={classes.indentThree}>start_time = data_unit["activitySegment"]["duration"]["startTimestampMs"]<br />
                                end_time = data_unit["activitySegment"]["duration"]["endTimestampMs"]<br />
                                activity_duration += (int(end_time) - int(start_time))/(1e3*24*60*60)</div>
                                <br />
                                <div className={classes.indentOne}>return activity_duration</div>
                                <br />
                                <br />
                                
                            def __activity_distance(data):
                                <div className={classes.indentOne}>        
                                """Get total distance of activities
                                Args:</div>
                                <div className={classes.indentTwo}> data (dict): Google Semantic Location History data</div>
                                <div className={classes.indentOne}>Returns:</div>
                                <div className={classes.indentTwo}>float: duration of actitvities in days</div>
                                <div className={classes.indentOne}>
                                """<br />
                                activity_distance = 0.0<br />
                                for data_unit in data["timelineObjects"]:
                                </div>
                                <div className={classes.indentTwo}>if "activitySegment" in data_unit.keys():</div>
                                <div className={classes.indentThree}>activity_distance += int(data_unit["activitySegment"]["distance"])/1000.0</div>
                                <br />
                                <div className={classes.indentOne}>return activity_distance</div>
                                <br />
                                <br />
                            
                            def process(file_data):
                                <div className={classes.indentOne}>
                                """Return relevant data from zipfile for years and months<br />
                                Args: </div>
                                    <div className={classes.indentTwo}>file_data: zip file or object</div>
                                <div className={classes.indentOne}>Returns:</div>
                                    <div className={classes.indentTwo}>dict: dict with summary and DataFrame with extracted data</div>
                                <div className={classes.indentOne}>
                                """<br />
                                results = []<br />
                                filenames = []<br />
                                <br />
                                # Extract info from selected years and months
                                with zipfile.ZipFile(file_data) as zfile:
                                </div>
                                    <div className={classes.indentTwo}>
                                    file_list = zfile.namelist()<br />
                                    for year in YEARS:
                                    </div>
                                        <div className={classes.indentThree}>for month in MONTHS:</div>
                                            <div className={classes.indentFour}>for name in file_list:</div>
                                                <div className={classes.indentFive}>
                                                {`monthfile = f"{year}_{month}.json"`} <br />
                                                if re.search(monthfile, name) is not None:
                                                </div>
                                                    <div className={classes.indentSix}> 
                                                        filenames.append(monthfile) <br />
                                                        data = json.loads(zfile.read(name).decode("utf8"))<br />
                                                        places = __visit_duration(data) <br />
                                                        results.append({`{`}<br />
                                                    </div>
                                        <div className={classes.indentSeven}>
                                            "Year": year,<br />
                                            "Month": month,<br />
                                            "Top Places": dict(itertools.islice(places.items(), NPLACES)),<br />
                                            "Number of Places": len(places),<br />
                                            "Places Duration [days]": round(<br />
                                        </div>
                                        <div className={classes.indentEight}>sum(value for value in places.values()), 3),</div>
                                        <div className={classes.indentSeven}> "Activity Duration [days]": round(__activity_duration(data), 3),<br />
                                        "Activity Distance [km]": round(__activity_distance(data), 3)
                                        </div>
                                        <div className={classes.indentSix}>
                                        {`}`})<br />
                                        break</div>
                            <br />
                                <div className={classes.indentOne}>   
                                    # Put results in DataFrame<br />
                                    data_frame = pd.json_normalize(results)<br />
                                    <br />
                                    # Anonymize by replace PlaceIds with numbers<br />
                                    number = 0<br />
                                    for column in data_frame.columns:<br />
                                </div>
                                <div className={classes.indentTwo}>if column.split(".")[0] == "Top Places":</div>
                                <div className={classes.indentThree}>
                                    number += 1<br />
                                    data_frame.rename(columns={`{column: f"Place {number} [days]"}`}, inplace=True)
                                </div>
                                <br />
                                <div className={classes.indentOne}>
                                    return {`{`}
                                </div>
                                <div className={classes.indentTwo}>
                                    "summary": TEXT,<br />
                                    "data_frames": [
                                </div>
                                <div className={classes.indentThree}>
                                    data_frame.fillna(0)
                                </div>
                                <div className={classes.indentTwo}>]</div>
                                <div className={classes.indentOne}>{`}`}</div>
                        </code>
                    </Typography>  
                </Collapse>  
            </Card>
        </Grid>
        </Grid>
        </>
    );
}