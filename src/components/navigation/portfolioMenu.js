import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function PortfolioNested() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Portfolio" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={!open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button className={classes.nested} component={Link} to='/illustration'>
            <ListItemText primary="Illustration" />
          </ListItem>
          <ListItem button className={classes.nested} component={Link} to='/conceptual'>
            <ListItemText primary="Conceptual Projects" />
          </ListItem>
          <ListItem button className={classes.nested} component={Link} to='/othermedia'>
            <ListItemText primary="Other Media" />
          </ListItem>
          
        </List>
      </Collapse>
    </List>
  );
}