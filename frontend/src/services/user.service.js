import { callExternalApi } from "./external-api.service";
import axios from 'axios';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getUser = async (accessToken) => {

    const config = {
      url: `${apiServerUrl}/api/users/`,
      method: "GET", 
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    const { data, error } = await callExternalApi({ config });
  
    return {
      data: data || null,
      error,
    };
  };

  export const Register = async (accessToken, userData) => {
    const config = {
        url: `${apiServerUrl}/api/users/register`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: userData,
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
          error: error.response ? error.response.data : "User registration failed",
        };
    }
  }