
export const getGitHubUrl = () => {
    const rootUrl = `https://github.com/login/oauth/authorize`;
  
    const options = {
      client_id: 'b13789eb1250d5e77992',
      scope: 'user:email'
    };
  
    const qs = new URLSearchParams(options);
  
    return `${rootUrl}?${qs.toString()}`;
  };
