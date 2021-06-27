import React from 'react';
import { makeStyles,   } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Button variant="contained" color="secondary" size='large'>
        SAVE THIS EDIT
        </Button>
    </div>
  );
}