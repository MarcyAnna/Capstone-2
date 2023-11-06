import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getUser = async (accessToken) => {
    const config = {
      url: `${apiServerUrl}/api/user`,
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