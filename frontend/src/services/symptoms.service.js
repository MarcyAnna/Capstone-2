import { callExternalApi } from "./external-api.service";
import axios from 'axios';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getSymptoms = async (accessToken) => {
    const config = {
      url: `${apiServerUrl}/api/symptoms`,
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

export const submitSymptomLog = async (accessToken, symptom, severity) => {
  console.log('running log symptom');
    const config = {
        url: `${apiServerUrl}/api/symptoms`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: { symptom, severity },
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
          error: error.response ? error.response.data : "Log symptom failed",
        };
    }
}

export const getSymptomLogByName = async (accessToken, symptomName) => {
  console.log(symptomName);
  const config = {
    url: `${apiServerUrl}/api/symptoms/name`,
    method: "GET", 
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      name: symptomName,
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const getSymptomLogByDate = async (accessToken, symptomDate ) => {
  console.log(symptomDate);
  const config = {
    url: `${apiServerUrl}/api/symptoms/date`,
    method: "GET", 
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      date: symptomDate,
    }
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};