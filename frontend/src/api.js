import axios from 'axios';
import store from './store';

// // set authorization header for all requests
// axios.defaults.headers.common['Authorization'] = 'ZDmTSrHXUI';

export async function getResults() {
    const response = await axios.get('/api/search/ip/');
    return response.data;
}

export async function filterResults() {
    const subnet = store.state.filter.subnet ? encodeURIComponent(store.state.filter.subnet.join(",")) : null;
    const hostname = store.state.filter.hostname ? encodeURIComponent(store.state.filter.hostname.join(",")) : null;
    const country = store.state.filter.country ? store.state.filter.country[0].split('(')[1].split('/')[0] : null;
    const asn = store.state.filter.asn ? encodeURIComponent(store.state.filter.asn.join(",")) : null;
    const cat = store.state.filter.cat ? store.state.filter.cat[0] : null;
    const blacklist = store.state.filter.blacklist ? store.state.filter.blacklist[0] : null;
    const tag = store.state.filter.tag ? encodeURIComponent(store.state.filter.tag.map(tag => tag.tag).join(",")) : null;
    const sortby = store.state.filter.sort;
    const asc = store.state.filter.desc ? store.state.filter.desc : null;
    const asn_value = store.state.filter.asn_value ? store.state.filter.asn_value : null;
    const source_value = store.state.filter.source_value ? store.state.filter.source_value : null;
    const cat_value = store.state.filter.cat_value ? store.state.filter.cat_value : null;
    const bl_value = store.state.filter.bl_value ? store.state.filter.bl_value : null;
    const tag_value = store.state.filter.tag_value ? store.state.filter.tag_value : null;
    const response = await axios.get('/api/search/ip/',
    { params: { 
        subnet,
        hostname,
        country,
        asn,
        cat,
        blacklist,
        tag,
        sortby,
        asc,
        asn_value,
        source_value,
        cat_value,
        bl_value,
        tag_value,
    } },
    );
    return response.data;
}

export async function filterResultsQuery(params) {
    const response = await axios.get('/api/search/ip/',
    { params },
    );
    return response.data;
}

export async function getIpDetails(ip_address) {
    const response = await axios.get(`/api/ip/${ip_address}/full`, { ip_address });
    return response.data;
}