import { routes } from "../routes";

export const handleCustomFetch = async (component, options = {}, navigate) => {
    const server = routes?.server?.root;
    const target = routes?.client?.[component];
    const endpoint = `${server}/${target}`;
  
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
  
    const defaultOptions = {
      method: options?.method || 'GET',
      headers: defaultHeaders,
      credentials: 'include',
      body: JSON.stringify(options?.body || {}),
    };
  
    try {
      const response = await fetch(endpoint, defaultOptions);

      const responseData = await response.json();

      //treba setat data u state za get request koji vraca data
      //const data = responseData?.data
      const statusCode = responseData?.status

   
      if(statusCode >= 200 && statusCode <= 299) {
        if (component === "registration" && responseStatus === "success") {
            navigate(routes?.client?.registration);
          } else if (component === "login" && responseStatus === "success") {
            navigate(routes?.client?.jobs);
          }
          else if(endpoint?.includes?.("logout")) {
            navigate(routes?.client?.login);
          }
          else return;
      } else if(statusCode === 401) {
         navigate(routes?.client?.login);
      } else return;
  
    } catch (error) {
      
    }
  };
  