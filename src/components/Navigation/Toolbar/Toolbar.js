import React from 'react';
import classes from './Toolbar.module.css';
import Logo from './../Logo/Logo';
import HamburgerIcon from '../SideDrawer/DrawerToggler/DrawerToggler';
import NavigationItems from './../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <HamburgerIcon clicked={props.clicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>

);

export default toolbar;