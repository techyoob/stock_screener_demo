

// Core 
import React, { useState } from 'react';

// Third
import axios from 'axios';
import {
    useQuery,
    useQueryClient,
    useMutation,
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
  

// Application
import { getAccessToken } from './authService';
  

const baseURL = "localhost/traders"



const withTraderQueryHOC = (WrappedComponent, selectedScreener) => {


    function HOC(props) {
      
        const traderEndpoint = baseURL+selectedScreener.replace(/-|\s/g,"");

        const token = getAccessToken()

        const mutation = useMutation(async ({query, endpoint}) => {

          return await axios.post(traderEndpoint+'/'+endpoint, 
            JSON.stringify(query),
            {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
              withCredentials: true
            });
        })

  
          const refreshData = (query, endpoint) => {
            mutation.mutate({endpoint, query})
          }
  
  
      return (
        <React.Fragment>
          <WrappedComponent 
            refreshData={refreshData}
            {...props}
            {...mutation}/>
        </React.Fragment>
      );
    }
  
    
    return HOC;
  }
  

export default withTraderQueryHOC;


const apiClient = (baseURL) => {
    
  return axios.create({
    withCredentials: true,
    baseURL: baseURL
  });
};
