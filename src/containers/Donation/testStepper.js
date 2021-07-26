import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
  button: {
    //marginTop: 20, //theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepDiv: {
    backgroundColor: 'red',
  },
  infoContainer: {
    width: 255,
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
    backgroundColor: '#e3f2fd',
  },
}));

function getSteps() {
    return [
        'Prepare your data package for donation', 
        'Select the downloaded data package',
        'Extract data',
        'Consent to data donation',
        'Donation completed'
    ];
}

function getStepContent(step) {
    switch (step) {
      case 0:
        return `If you have not already requested your data from Google, go to the Google 
        Takeout page and follow the instructions to download your Google data package.`;
      case 1:
        return `Once you have received your data package from Google and saved it to your device, 
        select the file location of the package.
        Note: Your data package stays locally on your device and will not be uploaded to a server.`;
      case 2:
        return `By clicking the button, the data that is relevant for this research will be extracted 
        from your data package. The data will not leave your device and no data is stored on a server. 
        The extracted data will be shown at the next step for your consent. The script that is used to 
        extract the relevant data from your data package, is shown at the bottom of this page.` + 
        `<Typography variant="h1"> test this thist</Typography>`;
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


export default function TestStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState(new Set());
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const totalSteps = () => {
    return getSteps().length;
  };

  const isStepOptional = (step) => {
    return step === 3;
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
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
  };

  const completedSteps = () => {
    return completed.size;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps() - skippedSteps();
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

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
  };

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
  };

  function isStepComplete(step) {
    return completed.has(step);
  }

  return (
      <Grid container className={classes.root}
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Stepper 
            orientation="vertical" 
            nonLinear 
            activeStep={activeStep}
            className={classes.progressContainer}>
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
                    <StepButton
                      onClick={handleStep(index)}
                      completed={isStepComplete(index)}
                      {...buttonProps}
                    >
                      <Typography variant="h6">
                        {label}
                      </Typography>
                    </StepButton>
                  </Step>
                );
              })}
            <div>
              {allStepsCompleted() ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <Grid container
                      spacing={3}
                      direction="row">
                    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                    {isStepOptional(activeStep) && !completed.has(activeStep) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                        className={classes.button}
                      >
                      No consent
                      </Button>
                      )}
                      {activeStep === 0 && (
                          <Button variant="contained" color="primary" onClick={handleComplete}>
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
                          <Button variant="contained" color="primary" onClick={handleComplete}>
                              Step 3 - process
                          </Button>
                      )}
                      {activeStep === 3 && (
                          <Button variant="contained" color="primary" onClick={handleComplete}>
                              Step 4 - consent
                          </Button>
                      )}
                      {activeStep === 4 && (
                        <Button variant="contained" color="secondary" href="https://qualtrics.com">
                              Step 5 - survey
                          </Button>
                      )}
                      
                  </Grid>
                </div>
              )}
            </div>
            </Stepper>
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
  );
}
