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
import houseIcon from '../../assets/img/house.png';
import listICon from '../../assets/img/format_list_bulleted.png';
import assessmentIcon from '../../assets/img/assessment.png';
import homeworkIcon from '../../assets/img/home_work.png';

const tutorialSteps = [
  {
    label:    `Input: your Google data package`,
    content:  `The location history data from Google consists of data files with lists of saved geo-locations and saved 
              activities at these locations. From the Google Takeout ZIP file you uploaded, we extract the relevant 
              location data for this research study.`,
    imgPath:  folderIcon,
  },
  {
    label:    `The Google data package`,
    content:  `We extract the relevant location data and calculate the top three places you visited, the duration of these 
              visits, and your activities and duration of these activities from January 2019, 2020, and 2021.`,
    imgPath:  homeworkIcon,
  },
  {
    label:    `Run: anonymization script`,
    content:  `Your data is anonymized by running a script that removes any personal and identifying information such 
              as addresses, street names or GPS coordinates from the data.`,
    imgPath:  codeIcon,
  },
  {
    label:    'The anonymization script',
    content:  `To anonymize the data, any information that can be used to identify you is replaced with placeholders. 
              For example, if one of the saved addresses in the Google data package is “Heidelberglaan 8”, this will 
              be replaced with “Place 1” in the new, anonymized data file.`,
    imgPath:  houseIcon,
  },
  {
    label:    `Output: data donation file`,
    content:  `The extracted data from your Google data package is returned as a new and anonymized data file ready to be 
              donated to the research study.`,
    imgPath:  listICon,
  },
  {
    label:    'The data donation file',
    content:  `The total number of visited places are extracted from the Google data and saved in the data donation file. 
              The three most visited places are calculated, and the days spent per place. The time spent in the different 
              places and in activity, as well as the travelled distance in kilometres is also extracted.`,
    imgPath:  assessmentIcon,
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
  content: {
    height: 150,
    maxWidth: 450,
    marginTop: 10,
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

export default function GammaPipelineStepper() {
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
      <Paper square elevation={0} className={classes.content}>
        <Typography variant="body1">{tutorialSteps[activeStep].content}</Typography>
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
