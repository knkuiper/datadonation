import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import folderIcon from '../../assets/img/folder_shared.png';
import codeIcon from '../../assets/img/code.png';
import listICon from '../../assets/img/format_list_bulleted.png';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const explanationSteps = [
  {
    label:    `Input: your Google data package`,
    content:  `From the Google data package, we only select the relevant location data needed for the researchers to 
              investigate the changes in movement during COVID-19 lockdowns.`,
    imgPath:  folderIcon,
  },
  {
    label:    `Run: anonymization script`,
    content:  `To protect your privacy your data is anonymized. Any identifiable information is removed from the data 
              so that the data file you donate to the research study is completely anonymized.`,
    imgPath:  codeIcon,
  },
  {
    label:    `Output: data donation file`,
    content:  `The extracted location data is returned as a new anonymized data file ready to be donated to the research 
              study.`,
    imgPath:  listICon,
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.paper.dark,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifycontent: 'space-around',
    alignContent: 'center',
  },
  autoPlay: {
    maxWidth: 40,
  },
  header: {
    backgroundColor: theme.palette.paper.dark,
    color: theme.palette.error.main,
  },
  content: {
    height: 100,
    maxWidth: 450,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.paper.dark,
    color: theme.palette.error.main,
  },
  img: {
    height: 120,
    width: 120,
    overflow: 'hidden',
  },
  mblStepper: {
    backgroundColor: theme.palette.paper.dark,
    color: theme.palette.error.main,
  },
}));

export default function PipelineStepperBeta() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = explanationSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      {/*<img
        className={classes.img}
        src={explanationSteps[activeStep].imgPath}
        alt={explanationSteps[activeStep].label}
      />*/}

      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        interval={6000}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {explanationSteps.map((step, index) => (
          <div className={classes.autoPlay} key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      
      <Paper square elevation={0} className={classes.header}>
        <Typography variant="overline">{explanationSteps[activeStep].label}</Typography>
      </Paper>
      <Paper square elevation={0} className={classes.content}>
        <Typography variant="body1">{explanationSteps[activeStep].content}</Typography>
      </Paper>
      
      <MobileStepper
        className={classes.mblStepper}
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            {theme.direction === 'rtl' ? <KeyboardArrowLeft color="error" /> : <KeyboardArrowRight color="error"/>}
          </Button>
        }
        backButton={
          <Button onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight color="error" /> : <KeyboardArrowLeft color="error" />}
          </Button>
        }
      />
    </div>
  );
}
