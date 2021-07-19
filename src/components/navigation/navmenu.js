import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import PortfolioNested from './portfolioMenu';
import {NavLink} from 'reactstrap';
import { useAuth } from '../../contexts/AuthContext';



const theme = createTheme({
    typography: {
      body1: {
        fontFamily: "Futura",
        fontSize: 24
      }
    }
  })
  
  const useStyles = makeStyles({
    list: {
      width: 225,
      
    },
    fullList: {
      width: 'auto'
    },
  
    root: {
      textAlign: 'center',
      
    },
  
    menu: {
      height:15,
      width: 35,
      
    },

  
    
  });
  
  export default function Menu() {
    const classes = useStyles();
    const [state, setState, open, setOpen] = React.useState({
      right: false,
    });
  
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
       
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List >
            <PortfolioNested />
          <ListItem button component={Link} to="/about">
            <ListItemText primary="About"/>
          </ListItem>
          <ListItem button component={Link} to="/contact">
            <ListItemText primary="Contact"/>
          </ListItem>
          
        </List>
       
      </div>
    );
  
    return (
      <div className='menu-div'>
        
        <ThemeProvider theme={theme}>
        {[''].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button className={classes.root} onClick={toggleDrawer(anchor, true)}>
              <div className='label'><MenuIcon style={{ fontSize: 58 }}/></div>  {anchor}</Button>
            <Drawer anchor={'right'} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}</ThemeProvider>
        
      </div>
    );
  }