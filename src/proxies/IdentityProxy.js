export default class IdentityProxy {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    register(params) {
        return this.axios.post(this.url + "/identity/register", params);
    }

    login(params) {
        return this.axios.post(this.url + "/identity/login", params);
    }
    
    refresh() {
        return this.axios.get(this.url + 'identity/refresh_token');
      }

} 