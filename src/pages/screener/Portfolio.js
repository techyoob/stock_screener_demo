

// Core
import React from 'react';
import PropTypes from 'prop-types';



// Third
import { makeStyles } from '@mui/styles';


// Application
import {ReactComponent as ComingSoon} from '../../assets/svg/coming-soon.svg';




const useStyles = makeStyles((theme) => ({
    portfolioRoot: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop: '100px'
    }
}));



const Portfolio = props => {
    const classes = useStyles();


    return (
        <div className={classes.portfolioRoot}>
            <ComingSoon height={'50%'} width={'50%'}/>
        </div>
    );
};

Portfolio.propTypes = {
    
};

export default Portfolio;