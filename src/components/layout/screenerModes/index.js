







// Core
import React, {useState} from 'react';



// Third
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



// Application
import './screenerModes.css'




const useStyles = makeStyles((theme) => ({
    tabsRoot: {
        backgroundColor:'#53a2a9',
        borderRadius:'10px',
        alignItems:'center',
        "& .MuiTab-root": {
            color: "#6d4053",
            borderRadius:'10px',
            height:'11px',
            minHeight:'30px',
            fontSize:'12px',
            padding:0,
            margin:0,
            '&.Mui-selected': {
                color: '#53a2a9',
                backgroundColor:'#6d4053',
              },
        },
        "& .MuiTabs-indicator": {
            display: "none"
        }
    },
    tab:{
        width:'120px',
    }
}));



const ScreenerModes = (props) => {
    const { modes, selectedMode,  onModeChange} = props;
    const classes = useStyles();

    // Array.indexOf(searchElement, fromIndex)

    const index = modes.findIndex(mode => mode === selectedMode)
    const [selected, setSelected] = useState(index);

    const handleChange = (event, newValue) => {
        setSelected(newValue);
        onModeChange(modes[newValue])
    };


    return (
        <div className='screener-modes-bar'>
            <Tabs
                className={classes.tabsRoot}
                style={{minHeight:"32px"}}
                value={selected}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                indicatorColor="secondary"
                aria-label="scrollable tabs"
            >
                {modes.map((item, i)=>{
                    return ( <Tab label={item} className={classes.tab} key={i}/>)
                })}
            </Tabs>
        </div>
    );
};


ScreenerModes.defaultProps = {
    modes: [],
    selected: '',
    onModeChange: () => {}
}


export default ScreenerModes;

