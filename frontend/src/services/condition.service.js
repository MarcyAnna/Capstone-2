import { callExternalApi } from "./external-api.service";


const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getConditions = async (accessToken) => {
    const config = {
      url: `${apiServerUrl}/api/conditions`,
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