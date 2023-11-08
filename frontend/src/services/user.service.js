import { callExternalApi } from "./external-api.service";
import { jwtDecode } from "jwt-decode";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getUser = async (accessToken) => {
  const token = accessToken;
  const decoded = jwtDecode(token);

    const config = {
      url: `${apiServerUrl}/api/users/${decoded.sub}`,
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