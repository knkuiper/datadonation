/// Donation page for version Alpha - baseline version with only the script
/// For round 1 of experiment, links to qualtrics survey Alpha round 1

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, Avatar } from '@material-ui/core';
import ScriptAlpha from '../../Script/ScriptAlpha';
import DataFeedbackAlpha from '../../Feedback/DataFeedbackAlpha';
import UUlogo from '../../../assets/img/UU_logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        //marginTop: 20,
    },
    paper: {
        padding: theme.spacing(1),
        margin: 30,
        backgroundColor: theme.palette.paper.light,
    },
    progressContainer: {
        backgroundColor: theme.palette.paper.light,
    },
    input: {
        display: 'none',
    },
    button: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    infoContainer: {
        margin: 30,
    },
}));

function getSteps() {
    return [
        'Prepare your data package for donation',  // step 1
        'Select the downloaded data package',      // step 2
        'Process package to extract data',         // step 3
        'Consent to data donation',                // step 4
        'Donation completed'                       // step 5
    ];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `If you have not already requested your data from Google, go to Google Takeout and follow the instructions 
            to request your location data.`;
        case 1:
            return `Once you have saved your data package from Google to your device, select the data file to upload (the file 
            needs to be in ZIP format. On a Mac the file is automatically unzipped and you will need to zip it by clicking 
            compress file). Note: Your data package stays locally on your device and will not be uploaded to a server.`;
        case 2:
            return `By processing the data, the relevant data for this research will be extracted from your data package. 
            The data will not leave your device and no data is stored on a server. The extracted data will be shown at 
            the next step for your consent.`;
        case 3:
            return `By clicking consent, you consent to donate the extracted data to the research study. Below is a data 
            report of the data extracted from your Google data package. This is the data that will be donated to the research 
            study. The rest of the data is not stored or sent to the research study.`;
        case 4:
            return `The data donation procedure is completed. Please click to go the next part of the research and fill out 
            the survey.`;
        default:
        return 'Unknown step';
    }
}

export default function DonationAlphaR1() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const totalSteps = () => {
        return getSteps().length;
    }

    const isStepOptional = (step) => {
        return step === 3;
    }

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("Cannot skip non optional step");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const skippedSteps = () => {
        return skipped.size;
    }

    const completedSteps = () => {
        return completed.size;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps() - skippedSteps();
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    }

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed
                // find the first step that has been completed
                steps.findIndex((step, i) => !completed.has(i))
                : activeStep + 1;

        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = () => {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);
        if (completed.size !== totalSteps() - skippedSteps()) {
            handleNext();
        }
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    }

    return (
        <>
        <Grid container className={classes.root}
        direction="row" 
        justify="center"
        alignItems="center"
        >
            <Grid item xs={12} sm={12} md={8} lg={8}>
            <Paper className={classes.paper}>
                <Stepper 
                activeStep={activeStep} 
                orientation="vertical" 
                className={classes.progressContainer}
                >
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                       // labelProps.optional = <Typography variant="caption">Consent to data donation</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>
                            <Typography variant="h6">
                                {label}
                            </Typography>
                        </StepLabel>
                        <StepContent>
                        <Typography gutterBottom variant="body1" color="inherit">{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <Grid 
                                container
                                spacing={3}
                                direction="row"
                                >
                                <Button disabled={activeStep === 0 || activeStep === 4} onClick={handleBack} className={classes.button}>
                                Back
                                </Button>
                                {activeStep === 0 && (
                                    <Button variant="contained" color="primary" onClick={handleComplete} className={classes.button}>
                                    Next
                                    </Button> 
                                )}
                                {activeStep === 1 && (
                                <div>
                                    <input
                                    accept=".zip"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onInput={handleComplete}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span" className={classes.button}>
                                        Select file
                                        </Button>
                                    </label>
                                    </div>
                                )}
                                {activeStep === 2 && (
                                    <Button variant="contained" color="primary" onClick={handleComplete} className={classes.button}>
                                    Process data
                                    </Button>
                                )}
                                {activeStep === 3 && (
                                    <Button color="primary" onClick={handleSkip} className={classes.button}>
                                        No consent
                                    </Button>
                                )}
                                {activeStep === 3 && (
                                    <Button variant="contained" color="primary" onClick={handleComplete} className={classes.button}>
                                    Consent
                                    </Button>
                                )}
                                {activeStep === 4 && (
                                    <Button variant="contained" color="secondary" href="https://survey.uu.nl/jfe/form/SV_3JlIlDkCHcQrcy2" className={classes.button}>
                                    {/* Final version survey Alpha round 1 */}
                                    Go to survey
                                    </Button>
                                )}
                                </Grid>
                                <Grid className={classes.scriptContainer} >
                                {activeStep === 2 && (
                                    <ScriptAlpha />
                                )}
                                {activeStep === 3 && (
                                    <DataFeedbackAlpha />
                                )}
                                </Grid>
                            </div>
                        </StepContent>  
                    </Step>
                    );
                })}
                </Stepper>
            </Paper>
            </Grid>
            
            <Grid item xs={8} sm={8} md={2} lg={2} className={classes.infoContainer}>
                <Typography gutterBottom variant="h6">
                <b>About data donation</b>
                </Typography>
                <Typography gutterBottom variant="body1">
                    You are donating your <em>Google semantic Location History</em> to the research study <b>Changes in movement during COVID-19 lockdowns.</b>
                    The research is executed by Utrecht University.
                </Typography>
                <Typography gutterBottom variant="body1">
                We respect your privacy. Your data donation is anonymous.
                </Typography>
                <Avatar src={UUlogo} alt="logo" className={classes.image} />
            </Grid>
        </Grid>
    </>
  );
}

