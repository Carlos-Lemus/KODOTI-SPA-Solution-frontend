export default class UserProxy {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    getAll(page, take) {
        return this.axios.get(this.url + `/users?page=${page}&take=${take}`);
    }

} 