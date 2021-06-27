import React from 'react';
import {createMuiTheme, makeStyles, ThemeProvider  } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
      width: "500px"
    },
  },
  text: {'& > *' : {
    
  }
 }
}));
const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Button variant="contained" color="secondary" size='large'>
        Sign In With Email
        </Button>
        <Button width='75%' variant="contained">Google Sign In</Button>
        <ThemeProvider theme={theme}>
            <Button variant="contained" color="primary">
                Phone Number
            </Button>
        </ThemeProvider>
    </div>
  );
}