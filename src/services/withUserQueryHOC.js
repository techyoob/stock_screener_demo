

// Core
import React, { useState } from 'react';

// Third party
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




const baseURL = process.env.REACT_APP_GASS_USERS_API



const withUserQueryHOC = (WrappedComponent) => {


    function HOC(props) {

        const token = getAccessToken()
        const mutation = useMutation(async ({query, endpoint}) => {
            
          return await axios.post(baseURL+endpoint, 
            JSON.stringify(query),
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
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


export default withUserQueryHOC;


const apiClient = (baseURL) => {
    
  return axios.create({
    withCredentials: true,
    baseURL: baseURL
  });
};
