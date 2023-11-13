import { callExternalApi } from "./external-api.service";


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