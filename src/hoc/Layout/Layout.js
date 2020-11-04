import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from './../../components/Footer/Footer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {

        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    clicked={this.sideDrawerClosedHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                <Footer/>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Layout);