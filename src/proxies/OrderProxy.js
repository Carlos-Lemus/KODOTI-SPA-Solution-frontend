export default class OrderProxy {
    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    get(id) {
        return this.axios.get(this.url + `/orders/${id}`);
    }

    getAll(page, take) {
        return this.axios.get(this.url + `/orders?page=${page}&take=${take}`);
    }

    create(params) {
        return this.axios.post(this.url + `/orders`, params);
    }
}