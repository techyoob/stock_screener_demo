


// Core 
import React, { useState } from 'react';


// Third
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


// Application





export default function useResponsiveDesign() {

    const theme = useTheme();
    
    const isXSScreen = useMediaQuery(theme.breakpoints.only('xs'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.only('sm'));
    const isMidScreen = useMediaQuery(theme.breakpoints.only('md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    return {
        isXSScreen,
        isSmallScreen,
        isMidScreen,
        isLargeScreen
    };
  }