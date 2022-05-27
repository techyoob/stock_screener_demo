



// Core
import React from 'react';


// Third
import { FaRedoAlt, 
        FaSortAmountDown,
        FaSortAmountUp 
}  from 'react-icons/fa';
import { makeStyles } from '@mui/styles';


// Application
import useResponsiveDesign from "../../../services/useResponsiveDevice"; 
import { abbreviateNumber } from '../../../util/abbreviateNumber';
import './list.css'




const useStyles = ({isLargeScreen, isMidScreen, isSmallScreen}) => makeStyles(theme => ({
    price:{
        width: '70%',
        height: '50%',
        borderRadius: '20px'
    },
    bearPrice:{
        color:'#f53d3d',
        backgroundColor:'#5e4949',
        border: '1px solid #ac2b2b',
    },
    bullPrice:{
        color:'#48e888',
        backgroundColor:'#485c50',
        border: '1px solid #099945',        
    },
}));







export const loadColumnComponent=(props)=>({
    "stock":<StockColumn  {...props}/>,
    "last":<LastColumn {...props} />,
    "change": <ChangeColumn {...props} />,
    "change_percentage":<ChangePerColumn {...props} />,
    "market_cap": <MarketCapColumn {...props}/>
})


// /**********************************************
//         list column components
// ***********************************************/


const StockColumn = (props) => {

    const { ticker, profile:{company} = {} } = props
    const companyShort =  company?.split(' ')?.slice(0, 4)?.join(' ')

    return (
        <React.Fragment>
            <div className='stock-ticker'>{ticker}</div>
            <div className='stock-company'>{companyShort}</div>
        </React.Fragment>
    );
};




const LastColumn = (props) => {
    const {  price: {last} } = props

    return (
        <div className='stock-last-price'>
            {last === undefined ? `---` : `$${last?.toFixed(2)}`}
        </div>
    );
};




const ChangeColumn = (props) => {
    const {  price: {change}  } = props
    const classes = useStyles({})();
    
    return (
        <div className='change-container' >
            <span className={`${change < 0 ? classes.bearPrice : classes.bullPrice}`}>
                {change === undefined ? `---` :`$${change?.toFixed(2)}`}
            </span>
        </div>

    );
};




const ChangePerColumn = (props) => {
    const { price: {change_percentage}   } = props;
    const classes = useStyles({})();

    return (
        <div className='change-container'>
            <span className={`${change_percentage < 0 ? classes.bearPrice : classes.bullPrice}`}>
                {change_percentage === undefined ? `---` :`${change_percentage?.toFixed(2)}%`}
            </span>
        </div>

    );
};




const MarketCapColumn = (props) => {
    const {  price: {market_cap}   } = props

    return (
        <div className='stock-last-price'>
            {market_cap === undefined ? `---` : `$${abbreviateNumber(market_cap)}`}
        </div>
    );
};







const OtherColumn = (props) => {
    const { price } = props

    return (
        <div className='stock-last-price'>
            {`$${price}`}
        </div>
    );
};
