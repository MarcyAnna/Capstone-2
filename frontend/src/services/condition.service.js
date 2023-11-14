import { callExternalApi } from "./external-api.service";
import axios from 'axios';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getConditions = async (accessToken) => {
    const config = {
      url: `${apiServerUrl}/api/conditions`,
      method: "GET", 
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const { data, error } = await callExternalApi({ config });
  
    return {
      data: data || null,
      error,
    };
  };

  export const addCondition = async (accessToken, conditionId) => {
    console.log('running add condition');
    const config = {
        url: `${apiServerUrl}/api/conditions`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: { conditionId },
      };

      try {
        const response = await axios(config);
        return {
          data: response.data,
          error: null,
        };
      } catch (error) {
        return {
          data: null,
          error: error.response ? error.response.data : "Add condition failed",
        };
    }
  }