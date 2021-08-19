export default class ClientProxy {
    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    getAll(page, take) {
        return this.axios.get(this.url + `/clients?page=${page}&take=${take}`);
    }

    get(id) {
        return this.axios.get(this.url + `/clients/${id}`);
    }

    create(params) {
        return this.axios.post(this.url + `/clients`, params);
    }

    update(id, params) {
        return this.axios.put(this.url + `/clients/${id}`, params);
    }

    remove(id) {
        return this.axios.delete(this.url + `/clients/${id}`);
    }
}