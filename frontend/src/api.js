import axios from 'axios';

// set authorization header for all requests
axios.defaults.headers.common['Authorization'] = 'ZDmTSrHXUI';

export async function getResults() {
    const response = await axios.get('/api/search/ip/');
    return response.data;
}

export async function filterResults(filter) {
    const response = await axios.get('/api/search/ip/',
    { params: { filter } },
    );
    return response.data;
}

export async function getIpDetails(ip_address) {
    const response = await axios.get(`/api/ip/${ip_address}/full`, { ip_address });
    return response.data;
}