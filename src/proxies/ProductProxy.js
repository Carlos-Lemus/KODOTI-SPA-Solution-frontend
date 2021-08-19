export default class ProductProxy {

    constructor(Axios, url) {
        this.axios = Axios;
        this.url = url;
    }

    getAll(page, take) {
        return this.axios.get(this.url + `/products?page=${page}&take=${take}`);
    }

    get(id) {
        return this.axios.get(this.url + `/products/${id}`);
    }

    create(params) {
        return this.axios.post(this.url + `/products`, params);
    }

    update(id, params) {
        return this.axios.put(this.url + `/products/${id}`, params);
    }

    remove(id) {
        return this.axios.delete(this.url + `/products/${id}`);
    }

} 