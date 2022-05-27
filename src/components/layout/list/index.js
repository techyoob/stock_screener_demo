
// Core
import React, {useState, useEffect} from "react";



// Third party
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses }  from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";

import TableRow from "@mui/material/TableRow";
import { makeStyles } from '@mui/styles';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FaRedoAlt, FaSortAmountDown, FaSortAmountUp }  from 'react-icons/fa';

// Application
import { loadColumnComponent } from "./columns";
import useResponsiveDesign from "../../../services/useResponsiveDevice"; 
import './list.css';







const useStyles = ({isLargeScreen, isMidScreen, isSmallScreen}) => makeStyles(theme => ({
    tableContainer:{        
        scrollbarWidth: "none" /* Firefox */,
        "&::-webkit-scrollbar": {
            display: "none"
        } /* Chrome */,
        backgroundColor:'transparent',
        height:`calc(100% - ${isSmallScreen ? '80px': '50px'})`
    },
    table:{
        [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },

    },
    tableRow:{
        "&:hover": {
            boxShadow: "0px 0px 5px 1px #cbc7b6",
            backgroundColor: '#cbc7b652 !important'
        },
    },
    listFooter: {
        display: 'flex',
        alignItems:'center',
        flexDirection: isSmallScreen ? 'column-reverse' : 'row',
        width: '100%',
        height: isSmallScreen ? '80px': '50px',
    },
    updatedAt:{
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        width: isSmallScreen ? '100%' : '50%',
        height: isSmallScreen ? '50%' : '100%',
        alignItems: 'center',
        fontSize:  isSmallScreen ? '14px' : '18px',
        color: '#a7a7a7',
        paddingLeft:' 20px',
    },
    paginationContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        overflow: 'hidden',
        width:  isSmallScreen ? '100%' : '50%',
        height:  isSmallScreen ? '50%' : '100%',
        color: '#a7a7a7',
    },
    pagination: {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'calc(100% - 65px)',
        '& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)': {
            margin:0,
            fontSize: isSmallScreen ?  '12px' : '18px',
            },
        "& .MuiPaginationItem-root": {
            color: "#a7a7a7",
            border: "1px solid #a7a7a7",
            '&.Mui-selected': {
                background: '#53a2a9dc',
                color: 'white',
                fontSize: isSmallScreen ?  '12px' : '18px',
                },
        }
    },
    MuiMenuItem: {
            '& .Mui-focused': {
            backgroundColor: '#a7a7a7'
            }
    },
    PageSizeStyle: {
        color: '#a7a7a7',
        width:'65px',
        '& .MuiSvgIcon-root':{
            color: "#a7a7a7",
            fontSize: '30px',
            border: 'none',
        },
        '& .MuiSelect-select':{
            color: "#a7a7a7",
            fontSize: '20px',
            border: "1px solid #a7a7a7",
            width: '18px',
            padding:'0px',
            paddingLeft:'10px',
            height: '100%',
        }
    },
    BearChange:{
        color:'#f53d3d',
        backgroundColor:'#5e4949',
        border: '1px solid #ac2b2b',
    },
    BullsChange:{
        color:'#48e888',
        backgroundColor:'#485c50',
        border: '1px solid #099945',        
    },
}));




const columnsConfig = {
    "stock":{ label: "Stock", minWidth: 230, width: 70  },
    "last":{ label: "Last", minWidth: 130, width: 100 },
    "change":{ label: "Change", minWidth:  220, align: "center", width: 100 },
    "change_percentage":{ label: "Change %", minWidth: 220, align: "center", width: 50 },
    "market_cap":{ label: "Market Cap", minWidth: 190, align: "right", width: 100 },
};




const List = (props) => {
    const {onRefreshData, rows, listColumns, paginationSize}=props;
    const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign();
    const classes = useStyles({isSmallScreen})();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [columns , setColumns ] = useState(['stock'])

    useEffect(()=>{
        const [ticker, company, ...omitdColumns] = listColumns;
        
        setColumns(['stock', ...omitdColumns])

    }, [listColumns])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    
    return (
        <Paper sx={{ minHeight:'500px',  width: "100%", height: "100%", overflow: "hidden", backgroundColor:'transparent' }}>
            <TableContainer className={classes.tableContainer}>
                <Table stickyHeader aria-label="sticky table" 
                        className={classes.table} 
                        sx={{ borderCollapse:'separate', borderSpacing: '0px 15px'}}>
                    <TableHead >
                        <TableRow sx={{ backgroundColor:'transparent'}}>
                            {columns.map((column, i) => {
                                
                                const splitColumns = column.split('__')
                                const trimdColumn = splitColumns.length > 1 ? splitColumns[1] : splitColumns[0]
    
    
                                return (
                                    <TableCell
                                        key={i}
                                        align={columnsConfig[trimdColumn]?.align}
                                        sx={{   backgroundColor: '#2f3e4b',
                                                minWidth: columnsConfig[trimdColumn]?.minWidth,
                                                color:'#a7a7a7'
                                            }}
                                    >
                                        {columnsConfig[trimdColumn]?.label}
                                    </TableCell>
                                    )
                            })}
                        </TableRow>

                    </TableHead>
                    <TableBody className="table-elements">
                        {rows.map((row, i) => {

                            return (
                                <TableRow hover 
                                        role="checkbox" 
                                        tabIndex={-1} 
                                        key={i} 
                                        className={classes.tableRow} 
                                        sx={{backgroundColor:'#485365', border:'none'}}
                                        onClick={()=>props.onListItemSelect(row?.ticker)}>
                                {columns.map((column, j) => {

                                    const splitColumns = column.split('__')
                                    const trimdColumn = splitColumns.length > 1 ? splitColumns[1] : splitColumns[0]

                                    return (
                                        <TableCell
                                            key={j}
                                            align={columnsConfig[trimdColumn]?.align}
                                            sx={{  backgroundColor: 'transparent',  color:'#a7a7a7', }}
                                        >
                                            {loadColumnComponent({...row})[trimdColumn]}
                                        </TableCell>
                                        );
                                })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
             <div className={classes.listFooter}>
                <div className={classes.updatedAt}>
                    <div className='refresh-list-data-button' 
                        onClick={()=>onRefreshData()}>
                        <FaRedoAlt />
                    </div>
                    {`Updated at: ${props?.updatedAt}`}
                </div>
                <div className={classes.paginationContainer}>
                    <PaginationComponent 
                        count={props.paginationSize}
                        {...props}/>
                </div>
            </div>
        </Paper>
    );
}



export default List;







// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// import Pagination from '@mui/material/Pagination';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import { makeStyles } from '@mui/styles';

// import NoData from '../../nodata';
// import { abbreviateNumber } from '../../../util/abbreviateNumber';

// import { FaRedoAlt, FaSortAmountDown, FaSortAmountUp }  from 'react-icons/fa';


// // Application
// import useResponsiveDesign from "../../../services/useResponsiveDevice"; 
// import './list.css';




    // const useStyles = ({isLargeScreen, isMidScreen, isSmallScreen}) => makeStyles(theme => ({
    //     listFooter: {
    //         display: 'flex',
    //         flexDirection: isSmallScreen ? 'column-reverse' : 'row',
    //         height: '15%',
    //         width: '100%',
    //         backgroundColor:'yellow'
    //     },
    //     updatedAt:{
    //         display: 'flex',
    //         flexDirection: 'row',
    //         width: isSmallScreen ? '100%' : '50%',
    //         height: isSmallScreen ? '50%' : '100%',
    //         alignItems: 'center',
    //         fontSize: '18px',
    //         paddingLeft:' 20px',
    //         backgroundColor:'violet'
    //     },
    //     paginationContainer:{
    //         display: 'flex',
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //         justifyContent: 'space-around',
    //         width:  isSmallScreen ? '100%' : '50%',
    //         height:  isSmallScreen ? '50%' : '100%',
    //         color: '#a7a7a7',
    //     },
    //     pagination: {
    //         display:'flex',
    //         alignItems:'center',
    //         justifyContent:'center',
    //         height:'100%',
    //         width:'90%',
    //         '& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)': {
    //             margin:0,
    //             },
    //         "& .MuiPaginationItem-root": {
    //             height:'70%',
    //             color: "#a7a7a7",
    //             border: "1px solid #a7a7a7",
    //             '&.Mui-selected': {
    //                 background: '#53a2a9dc',
    //                 color: 'white',
    //                 },
    //         }
    //     },
    //     MuiMenuItem: {
    //             '& .Mui-focused': {
    //             backgroundColor: '#a7a7a7'
    //             }
    //     },
    //     PageSizeStyle: {
    //         color: '#a7a7a7',
    //         border: '1px solid #a7a7a7',
    //         width:'20%',
    //         '& .MuiSvgIcon-root':{
    //             color: "#a7a7a7",
    //             fontSize: '30px',
    //             border: 'none',
    //         },
    //         '& .MuiSelect-select':{
    //             color: "#a7a7a7",
    //             fontSize: '20px',
    //             border: "1px solid #a7a7a7",
    //             width: '18px',
    //             padding:'0px',
    //             paddingLeft:'10px',
    //             height: '100%',
    //         }
    //     },
    //     BearChange:{
    //         color:'#f53d3d',
    //         backgroundColor:'#5e4949',
    //         border: '1px solid #ac2b2b',
    //     },
    //     BullsChange:{
    //         color:'#48e888',
    //         backgroundColor:'#485c50',
    //         border: '1px solid #099945',        
    //     },
    // }));




// const List = props => {
//     const {onRefreshData, data, columns}=props
//     const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign()
//     const classes = useStyles({isSmallScreen})();


//     return (
//         <React.Fragment>
//             <div className='list-container'>
//                 <div className='list-scrolled-section'>
//                     <div className='list-header'>
//                         {(data.length != 0) && columns.map((header, i)=>{
//                             return (
//                                 <React.Fragment key={i}>
//                                     <div className={`list-column-${header.replace(/_/g, '-')}`}>
//                                         {header.replace(/_/g, ' ')}
//                                     </div>
//                                 </React.Fragment>
//                             )
//                         })}
//                     </div>
//                     <div className='list-body'>
//                         {props.data.length > 0 
//                         ? props.data.map((row, j)=>{

//                             return (
//                                 <div className='list-row'
//                                     onClick={()=>props.onListItemSelect(row?.ticker)}
//                                     key={j}>
//                                         {props.columns.map((header, i)=>{

//                                             return (
//                                                 <span className={`list-column-${header.replace(/_/g, '-')}`}
//                                                     key={i}>
//                                                     {loadColumnComponent({...row})[header]}
//                                                 </span>)

//                                         })}
//                                 </div>)
//                         })
//                         : <NoData /> }
//                     </div>
//                 </div>
//             </div>
//             <div className={classes.listFooter}>
//                 <div className={classes.updatedAt}>
//                     <div className='refresh-list-data-button' 
//                         onClick={()=>onRefreshData()}>
//                         <FaRedoAlt />
//                     </div>
//                     {`Updated at: ${props?.updatedAt}`}
//                 </div>
//                 <div className={classes.paginationContainer}>
//                     <PaginationComponent 
//                         count={props.paginationSize}
//                         {...props}/>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// };

// List.propTypes = {
//     columns: PropTypes.array.isRequired,
//     data: PropTypes.array.isRequired,
//     paginationSize: PropTypes.number.isRequired
// };

// export default List;











// /**********************************************
//         GASS comon list footer components
// ***********************************************/


const PaginationComponent = (props) => {
    // const [itemPerPage, setItemPerPage]= useState([6, 12, 24])
    const {count, onPaginationChange, updatedAt } = props
    const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign();
    const classes = useStyles({isSmallScreen})();
    const [rowsPerPage, setRowsPerPage]= useState(6)
    
    const handlePageChange = (event, newPage) => {
        onPaginationChange({
            action:"at",
            value:newPage
        })
    }
    const handleRowPerPageChange = (event) => {
        
        setRowsPerPage(event.target.value)
        onPaginationChange({
            action:"size",
            value:event.target.value
        })
    }

    return (
        <React.Fragment>
            <Select
                className={classes.PageSizeStyle}
                id="row-per-page-select"
                value={rowsPerPage}
                onChange={handleRowPerPageChange}
                classes={{
                    root: classes.PageSizeStyle,
                    icon: classes.PageSizeStyle
                  }} 
                MenuProps={{
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root': {
                          color: '#a7a7a7',
                        },
                        "&.Mui-selected": {
                            backgroundColor: "#f16037",
                          }
                      },
                    },
                  }}
            >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
            </Select>
            <Pagination 
                count={count}
                variant="outlined"
                shape="rounded"
                selected={true}
                siblingCount={0} 
                classes={{root:classes.pagination}}
                onChange={handlePageChange}/>
        </React.Fragment>
    );
};
