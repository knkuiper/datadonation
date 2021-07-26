import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 10,
        backgroundColor: theme.palette.paper.light,
    },
    progressContainer: {
        backgroundColor: theme.palette.paper.light,
    },
    input: {
        display: 'none',
    },
    button: {
        marginTop: 20, //theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.paper.light,
    },
    infoContainer: {
        width: 255,
    }
}));

function getSteps() {
    return [
        'Prepare your data package for donation',   // step 1
        'Select the downloaded data package',       // step 2
        'Process package to extract data',         // step 3
        'Consent to data donation',                 // step 4
        'Donation completed'                        // step 5
    ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
        return `If you have not already requested your data from Google, go to the Google 
        Takeout page and follow the instructions to download your Google data package.`;
    case 1:
        return `Once you have received your data package from Google and saved it to your device, 
        select the data file to upload.
        Note: Your data package stays locally on your device and will not be uploaded to a server.`;
    case 2:
        return `By clicking the button, the data that is relevant for this research will be extracted 
        from your data package. The data will not leave your device and no data is stored on a server. 
        The extracted data will be shown at the next step for your consent. The script that is used to 
        extract the relevant data from your data package, is shown at the bottom of this page.`;
    case 3:
        return `By clicking the button, you consent to donate the extracted data to the research study.
        Below is a data report of the data extracted from your Google data package. This is the data that 
        will be donated to the research study. The rest of the data is not stored or sent to the research 
        study.`;
    case 4:
        return `Thank you for your donating data to this research. You can click to go back to the dashboard 
        with the overview of all research projects for data donation or close the browser window.`;
    default:
      return 'Unknown step';
  }
}

export default function Donation() {
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

  /*  const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }; */

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

    const handleStep = (step) => () => {
        setActiveStep(step);
    }

    const handleComplete = () => {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);

        /**
         * Sigh... it would be much nicer to replace the following if conditional with
         * `if (!this.allStepsComplete())` however state is not set when we do this,
         * thus we have to resort to not being very DRY.
         */
        if (completed.size !== totalSteps() - skippedSteps()) {
            handleNext();
        }
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted(new Set());
        setSkipped(new Set());
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
        spacing={3}>
            <Grid item xs={8}>
            <Paper className={classes.paper}>
                <Stepper 
                activeStep={activeStep} 
                orientation="vertical" 
                nonLinear
                className={classes.progressContainer}
                >
                {steps.map((label, index) => {
                    const stepProps = {};
                    const buttonProps = {};
                    if (isStepOptional(index)) {
                        buttonProps.optional = <Typography variant="caption">Consent to data donation</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                    <Step key={label} {...stepProps}>
                    <StepLabel>
                        <Typography variant="h6">
                            {label}
                        </Typography>
                    </StepLabel>
                    <StepContent>
                        <Typography gutterBottom variant="body1" color="text">{getStepContent(index)}</Typography>
                        <div className={classes.actionsContainer}>
                            <Grid 
                            container
                            spacing={3}
                            direction="row"
                            >
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                Back
                                </Button>
                                {activeStep === 0 && (
                                    <Button variant="contained" color="primary" onClick={handleComplete} className={classes.button}>
                                    Step 1 - next
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
                                            Step 2 - Upload
                                            </Button>
                                        </label>
                                        </div>
                                    )}
                                    {activeStep === 2 && (
                                        <Button variant="contained" color="primary" onClick={handleComplete} className={classes.button}>
                                            Step 3 - process
                                        </Button>
                                    )}
                                    {activeStep === 3 && (
                                        <Button variant="contained" color="primary" onClick={handleSkip} className={classes.button}>
                                            Step 4 - Not consent
                                        </Button>
                                    )}
                                    {activeStep === 3 && (
                                        <Button variant="contained" color="primary" onClick={handleComplete} className={classes.button}>
                                            Step 5 - Consent
                                        </Button>
                                    )}
                            {/* <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                            >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                            */}
                            </Grid>
                        </div>
                    </StepContent>
                    </Step>
                    );
                })}
                </Stepper>
                {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography gutterBottom variant="body1">
                    {/*  All steps of the data donation are completed.  */}
                    Please click the button below to fill out the survey.
                    </Typography>
                    <Button variant="contained" color="secondary" className={classes.button}
                            // href="https://qualtrics.com" put in correct link to
                            >
                    Link to survey
                    </Button>
                </Paper>
                )}
            </Paper>
            </Grid>
            
            <Grid item xs={3} className={classes.infoContainer}>
                {/* <Paper className={classes.paper}> */}
                    <Typography gutterBottom variant="h5">
                    Data donation
                    </Typography>
                    <Typography gutterBottom variant="body1">
                    You are donating your Google semantic Location History to the research study Changes in movement during Covid lockdowns. The research is executed by Utrecht University.    
                    </Typography>
                    <Typography gutterBottom variant="body1">
                    We respect your privacy. Your data donation is anonymous.
                    </Typography>
                {/* </Paper> */}
            </Grid>
        </Grid>
    </>
  );
}

