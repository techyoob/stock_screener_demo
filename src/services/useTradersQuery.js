

// Core 
import React, { useState } from 'react';

// Third
import { useQuery } from "react-query";
import axios from "axios";

// Application
import { getAccessToken } from './authService';




const baseURL = process.env.REACT_APP_GASS_TRADERS_API


export default function useTradersQuery({selectedPage, endpoint, query}) {

    const traderEndpoint = baseURL+selectedPage.replace(/-|\s/g,"");
    const token = getAccessToken()
    
    return useQuery(["classics", endpoint], () => {

        return  axios.post(traderEndpoint+'/'+endpoint, 
          JSON.stringify(query),
          {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
            withCredentials: true
          }).then((res) => res.data?.data);
      }, { enabled:false });
  }
  