import axios from 'axios';
import store from './store';

// AUTH PART
const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'access_token';

export function setAxiosAccessToken(accessToken) {
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `${accessToken}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function setAccessToken(accessToken) {
  if (accessToken) {
    window.localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
  } else {
    window.localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  }
}

export function setRefreshToken(refreshToken) {
  if (refreshToken) {
    window.localStorage.setItem("refreshToken", refreshToken);
  } else {
    window.localStorage.removeItem("refreshToken");
  }
}

export function removeAccessToken() {
  window.localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
}

export function getAccessToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return window.localStorage.getItem("refreshToken") ? window.localStorage.getItem("refreshToken") : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImxvZ2luX3R5cGUiOiJsb2NhbCIsImlkIjoibG9jYWw6b2x0bWFub3ZhLmtyaXN0aW5hQGdtYWlsLmNvbSIsImVtYWlsIjoib2x0bWFub3ZhLmtyaXN0aW5hQGdtYWlsLmNvbSJ9LCJleHAiOjE2ODI2ODIzNzF9.owWJb2z5Gg3ypVomremp9xNSRuOseLLBIk5XoHBGhHI";
}

export function isLoggedIn() {
  return !!getAccessToken();
}

export const ifNotAuthenticated = async (to, from, next) => {
  if (!isLoggedIn()) {
    next();
  } else {
    next('/');
  }
};

export const ifAuthenticated = async (to, from, next) => {
  if (isLoggedIn()) {
    next();
    return;
  }
  next('/login');
};

// ENDPOINT ACCESS

axios.interceptors.response.use(
  res => res,
  err => {
    const statusCode = err.response.status;
    if (statusCode === 401 && err.response.data.data === 'Signature verification failed') {
      const token = getRefreshToken();
      return axios.post('/nerd/api/v2/refreshToken', { token })
      .then(function (success) {
        console.log(success);
        if (success === undefined) {
          window.location.href = '/login';
          store.commit('clearState');
          removeAccessToken();
          return;
        }
        setAccessToken(success.data[0]);
        setRefreshToken(success.data[1]);
        window.location.reload();
      })
      .catch(function (error) {
        this.$store.commit('clearState');
        removeAccessToken();
        window.location.href = '/';
        throw error;
      });
    }
    else if (statusCode === 401 && err.response.data.error === 'AuthToken wrong') {
      window.location.href = '/login';
      store.commit('clearState');
      removeAccessToken();
      return;
    }
    else {
      return Promise.reject(err);
    }
  }
);


export async function getResults() {
    const response = await axios.post('/nerd/api/v2/search/ip').
    catch(function (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
    });
    return response.data;
}

export async function filterResults() {
    const response = await axios.post('/nerd/api/v2/search/ip',
      store.state.filter
    ).
    catch(function (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
    });
    return response?.data;
}

export async function filterResultsQuery(params) {
    const response = await axios.get('/nerd/api/v2/search/ip/',
    { params },
    );
    return response.data;
}

export async function getIpDetails(ip_address) {
    const response = await axios.get(`/nerd/api/v2/details/${ip_address}`, { ip_address });
    return response.data;
}

// USER MANAGEMENT ENDPOINTS
export async function login(email, password) {
    const response = await axios.post('/nerd/api/v2/login', {email, password})
    .catch(function (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
    });
    return response.data;
}

export async function me() {
    const response = await axios.get('/nerd/api/v2/me').
    catch(function (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
    });
    return response.data;
}

export async function register(email, password, organization) {
    const response = await axios.post('/nerd/api/v2/register', {email, password, name: "NoNamev2", organization}).
    catch(function (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
    });
    return response.data;
}

export async function passReset(email) {
    const response = await axios.post('/nerd/api/v2/reset_password', {email});
    return response.data;
}

export async function passChange(passOld, password) {
  const response = await axios.post('/nerd/api/v2/change_password', {passOld, password});
  return response.data;
}

export async function nOfResults() {
  const subnet = store.state.filter.subnet ? encodeURIComponent(store.state.filter.subnet.join(",")) : null;
  const hostname = store.state.filter.hostname ? encodeURIComponent(store.state.filter.hostname.join(",")) : null;
  const country = store.state.filter.country ? store.state.filter.country[0].split('(')[1].split('/')[0] : null;
  const asn = store.state.filter.asn ? encodeURIComponent(store.state.filter.asn.join(",")) : null;
  const cat = store.state.filter.cat ? store.state.filter.cat[0] : null;
  const blacklist = store.state.filter.blacklist ? store.state.filter.blacklist[0] : null;
  const source = store.state.filter.source ? encodeURIComponent(store.state.filter.source.map(source => source.short).join(",")) : null;
  const tag = store.state.filter.tag ? encodeURIComponent(store.state.filter.tag.map(tag => tag.short).join(",")) : null;
  const sortby = store.state.filter.sort;
  const asc = store.state.filter.desc ? store.state.filter.desc : null;
  const asn_value = store.state.filter.asn_value ? store.state.filter.asn_value : null;
  const source_value = store.state.filter.source_value ? store.state.filter.source_value : null;
  const cat_value = store.state.filter.cat_value ? store.state.filter.cat_value : null;
  const bl_value = store.state.filter.bl_value ? store.state.filter.bl_value : null;
  const tag_value = store.state.filter.tag_value ? store.state.filter.tag_value : null;
  const whitelisted = store.state.filter.whitelisted ? store.state.filter.whitelisted : null;
  const page = store.state.filter.page ? store.state.filter.page : null;
  const response = await axios.get('/nerd/api/v2/_ips_count',
  { params: { 
      subnet,
      hostname,
      country,
      asn,
      cat,
      blacklist,
      source,
      tag,
      sortby,
      asc,
      asn_value,
      source_value,
      cat_value,
      bl_value,
      tag_value,
      whitelisted,
      page
  } },
  );
  return response.data;
}

export async function verifyEmail(accessToken) {
  const response = await axios.post('/nerd/api/v2/verify', { accessToken }).
  catch(function (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
  });
  return response.data;
}

export async function getUsers() {
  const response = await axios.get('/nerd/api/v2/users');
  return response.data;
}

export async function editRoles(id, roles) {
  const response = await axios.put('/nerd/api/v2/roles', { id, roles}).
  catch(function (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
  });
  return response.data;
}

export async function deleteUser(ide) {
  const response = await axios.delete(`/nerd/api/v2/delete_user/${ide}`).
  catch(function (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
  });
  return response.data;
}

export async function addUser(email, password, organization, roles, verify) {
  const response = await axios.post('/nerd/api/v2/add-user', { email, name: "NoNamev2", password, organization, roles, verify }).
  catch(function (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
  });
  return response.data;
}

export async function resetPassFromMail(password, token) {
  const response = await axios.post('/nerd/api/v2/password_reset_from_token', { password, token }).
  catch(function (error) {
    if (error.response) {
      return Promise.reject(error.response.data);
    }
  });
  return response.data;
}

