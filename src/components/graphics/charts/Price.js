





// Core
import React, {useEffect, useState} from 'react';


//  Third Party
import { makeStyles } from '@mui/styles';


// Application
import './charts.css'
import useTradersQuery from '../../../services/useTradersQuery';
import { abbreviateNumber } from '../../../util/abbreviateNumber';
import Throbber from '../../controls/throbber';

const priceItems = ['last', 'change', 'change percentage']

const Price = (props) => {

    const { selectedPage, ticker,  } = props
    const [query, setQuery] = useState({
        ticker:ticker
    })

    const [price, setPrice ] = useState({})
    const [change, setChange ] = useState()    
    const [changePercentage, setChangePercentage ] = useState()

    const {status, data, isLoading, isFetching, error, isError, refetch }  = useTradersQuery({ selectedPage, endpoint:'classics/price', query})

    useEffect(()=>{

        if(status==='success'){
            console.log(" data is ", data);
            setPrice(data)
        } else {
            setPrice({})
        }
    }, [data])

    
    useEffect(()=>{
        setQuery({
            ticker:ticker,
        })
    }, [ticker])


    useEffect(()=>{
        refetch({cancelRefetch:true})
    }, [query])


    return (
        <React.Fragment>
            {priceItems.map((item, i )=>{

                const itemValue = price?.[item.replace(/ /g, '_')];
                const updatedAt = price?.['updated_at']

                return (<div className='price-container' key={i}>
                            {classicsSelector({itemValue, updatedAt, isLoading, isFetching})[item]}
                        </div>)
            })}
            
        </React.Fragment>
    );
};

export default Price;



const useStyles = makeStyles((theme) => ({
    BearChange:{
        color:'#f53d3d',
        backgroundColor:'#5e4949',
        border: '1px solid #ac2b2b',
        borderRadius: '5px',
        paddingRight: '15px',
        paddingLeft: '15px'
    },
    BullsChange:{
        color:'#48e888',
        backgroundColor:'#485c50',
        border: '1px solid #099945',
        borderRadius: '5px',
        paddingRight: '15px',
        paddingLeft: '15px'
    },

  }));







export const LastPriceClassicsTag = (props) => {
    const { itemValue, updatedAt, isLoading, isFetching } = props
    return (
        <React.Fragment>
            <div className='price-tag-tittle'>Last</div>
            {(isLoading && itemValue===undefined) 
                ? <Throbber />
                : <React.Fragment>
                    <div className='price-tag-body'>                        
                        { itemValue===undefined || itemValue===0 ? '---' : `$ ${itemValue?.toFixed(2)}`}
                    </div>
                    {itemValue===undefined ? null : isFetching ? <Throbber /> : <div className='price-tag-footer'>{`Updated ${updatedAt}`}</div>}
                </React.Fragment>
                    
            }
        </React.Fragment>
    );
};


export const ChangeClassicsTag = (props) => {
    const { itemValue, isLoading } = props
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className='price-tag-tittle'>Change</div>
            {isLoading && itemValue===undefined 
                ? <Throbber />
                :  <React.Fragment>
                        <div className='price-tag-body'>
                            { itemValue===undefined || itemValue===0
                                ? '---'
                                :   <span className={itemValue < 0 ? classes.BearChange : classes.BullsChange}>
                                        {`$ ${itemValue?.toFixed(2)}`}
                                    </span>
                            }
                        </div>
                    </React.Fragment>
            }
        </React.Fragment>
    );
};


export const ChangePercentageClassicsTag = (props) => {
    const { itemValue, isLoading } = props
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className='price-tag-tittle' >Change %</div>
            {isLoading && itemValue===undefined 
                ? <Throbber />
                : <React.Fragment>
                    <div className='price-tag-body'>
                            { itemValue===undefined  || itemValue===0
                                ? '---'
                                :   <span className={itemValue < 0 ? classes.BearChange : classes.BullsChange}>
                                        {`${itemValue?.toFixed(2)} %`}
                                    </span>
                            }
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
};



export const ProfileClassicsTag = (props) => {
    return (
        <div>
            
        </div>
    );
};





// TODO:
//  Add component selector in this file to select classics given string name of the component

export const classicsSelector = (props) => ({
    "last":<LastPriceClassicsTag {...props}/>,
    "change":<ChangeClassicsTag {...props}/>,
    "change percentage":<ChangePercentageClassicsTag {...props}/>
  })
