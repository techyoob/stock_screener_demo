




// Core
import React, {useEffect, useState} from 'react';

//  Third Party
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';


// Application
import './charts.css'
import useTradersQuery from '../../../services/useTradersQuery';
import { StockCompanyLogo } from '../../gass/StockCompanyLogo';
import Throbber from '../../controls/throbber';
import useResponsiveDesign from '../../../services/useResponsiveDevice';

import profileData from '../../../data/profile.json'







const useStyles = ({isSmallScreen}) =>makeStyles((theme) => ({

    profileMainContainer: {
        display:'flex',
        flexDirection: isSmallScreen ? 'row' : 'column',
        height: '100%',
        width:'100%',
        color: '#a7a7a7',
        overflow: 'hidden',
    },
    profileHeaderContainer: {
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: isSmallScreen ? '40%' : '100%'
    },
    profileDetailsContainer: {
        width: isSmallScreen ? '60%' : '100%',
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    profileElementGrid: {
        display:'flex',
        flexDirection: 'column',
        paddingLeft: '10px',
        fontSize: '15px',
        textTransform:'capitalize',
        borderBottom: '1px solid #5b5a6e'
    }
}));




const Profile = (props) => {

    const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign();
    const classes = useStyles({isLargeScreen, isMidScreen, isSmallScreen})();



    const detailItems = ['exchange', 'industry', 'sector', 'country', 'currency', 'CEO']

    const { selectedPage, ticker,  } = props
    const [query, setQuery] = useState({
        ticker:ticker
    })


    const [profile, setProfile ] = useState({})    
    const {status, data, isLoading, error, refetch }  = useTradersQuery({ selectedPage, endpoint:'classics/profile', query})



    useEffect(()=>{
        setQuery({
            ticker:ticker,
        })
    }, [ticker])

    useEffect(()=>{
        onRefreshData()
    }, [query])


    const onRefreshData = () => {
        setProfile(profileData)
    }

    return (
        <div className={classes.profileMainContainer}>
            <div className={classes.profileHeaderContainer}>
                <StockCompanyLogo />
                <span className='company-ticker-Container'>
                    {ticker}
                </span>
                <div className='company-name-Container'>
                    {isLoading ? <Throbber /> : profile?.['name']}
                </div>
            </div>
            <div className={classes.profileDetailsContainer}>
                <Grid container spacing={2}>
                    {detailItems.map((item, i)=>{

                        return  (
                            <Grid key={i} item xs={12} lg={6}>
                                <div className={classes.profileElementGrid}>                    
                                    <span>{item}</span>
                                    <span className='company-details-item-value'>{item in profile ? profile?.[item] : '---'}</span>
                                </div>
                            </Grid>
                        )              
                    })}
                </Grid>
            </div>
        </div>

    );
};

export default Profile;
