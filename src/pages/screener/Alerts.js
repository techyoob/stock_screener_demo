


// Core
import React from 'react';
import PropTypes from 'prop-types';


// Third Party
import { makeStyles } from '@mui/styles';


// Application
import {ReactComponent as ComingSoon} from '../../assets/svg/coming-soon.svg';




const useStyles = makeStyles((theme) => ({
    alertsRoot: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop: '100px'
    }
}));




const Alerts = props => {
    const classes = useStyles();


    return (
        <div className={classes.alertsRoot}>
            <ComingSoon height={'50%'} width={'50%'}/>
        </div>
    );
};

Alerts.propTypes = {
    
};

export default Alerts;