



import React from 'react';
import { defaultProps } from 'react-svg-spinner';
import './nodata.css'

const NoData = (props) => {
    const { element } = props
    return (
        <div className='no-data-available-container'>
            {`no ${element} data available`}
        </div>
    );
};

export default NoData;

NoData.defaultProps = {
    element: ''
}