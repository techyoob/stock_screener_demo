


// CORE
import React, {useState, useEffect}  from 'react';
import PropTypes from 'prop-types';


// THIRD
import { makeStyles } from '@mui/styles';
import { ResponsiveTreeMap } from '@nivo/treemap'


// APPLICATION
import useTradersQuery from '../../services/useTradersQuery';
import data from '../../data/volMap.json'


const useStyles = makeStyles((theme) => ({
    capTreeMapContainer: {
        width:'100%',
        height:'100%',
        minHeight:'500px',
        padding:'5px',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none"
        },
    }
}));


const defaultVolMapQuery = { 
    filter:'all'
}



const VolMap = props => {    
    
    const classes = useStyles();
    const [query, setQuery] = useState(defaultVolMapQuery)
    const [updatedAt, setUpdatedAt]=useState('')
    const [mapData, setMapData] = useState({})

    // const {status, data, isLoading, isSuccess, error, refetch }  = useTradersQuery({ selectedPage:'fundamentals', endpoint:`graphics/vol-map`, query})

    useEffect(()=>{
        // refetch({cancelRefetch:true})
    }, [query])

    useEffect(()=>{
        if ( Array.isArray(data?.data?.children)){
         
            setMapData({
                name:'Volume Map',
                children:data?.data?.children
            })
            setUpdatedAt(data.updated);
        } else {
            setMapData({});
        }

    }, [data])


    return (
        <div className={classes.capTreeMapContainer}>
            <ResponsiveTreeMap
                data={mapData}
                identity="name"
                value="volume"
                valueFormat=".02s"
                tile='binary'
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                label= {node => `${node.id} ${node.formattedValue}`}
                labelSkipSize={30}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.2
                        ]
                    ]
                }}
                parentLabelPosition="top"
                parentLabelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                colors={(node) =>{
                    if(node?.isParent){
                        return '#ffffff'
                    }
                    return `${node?.data?.change_percentage < 0  ? '#D7766F' : '#338F85'}`
                }}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            3
                        ]
                    ]
                }}
            />
        </div>
    );
};

VolMap.propTypes = {
    
};

export default VolMap;