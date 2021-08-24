import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import folderIcon from '../../assets/img/folder_shared.png';
import codeIcon from '../../assets/img/code.png';
import listICon from '../../assets/img/format_list_bulleted.png';

const tutorialSteps = [
  {
    label:    `Input: your Google data package`,
    imgPath:  folderIcon,
  },
  {
    label:    `Run: anonymization script`,
    imgPath:  codeIcon,
  },
  {
    label:    `Output: data donation file`,
    imgPath:  listICon,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.paper.dark,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  header: {
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

export default function AlphaPipelineStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <img
        className={classes.img}
        src={tutorialSteps[activeStep].imgPath}
        alt={tutorialSteps[activeStep].label}
      />
      <Paper square elevation={0} className={classes.header}>
        <Typography variant="overline">{tutorialSteps[activeStep].label}</Typography>
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
