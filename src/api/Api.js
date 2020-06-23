import axios from "axios";
import Swal from "sweetalert2";

export default class Api {

    static post(path, params = {}, headers = {}) {
        return this.doRequest("post", path, params, headers);
    }

    static put(path, params = {}, headers = {}) {
        return this.doRequest("put", path, params, headers);
    }

    static get(path, params = {}, headers = {}) {
        return this.doRequest("get", path, params, headers);
    }

    static delete(path, params = {}, headers = {}) {
        return this.doRequest("delete", path, params, headers);
    }

    static doRequest(method, path, params = {}, headers = {}) {
        let config = {
            method: method,
            url: `http://localhost:3000/${path}`,
            headers: headers
        };

        if (method == "get") {
            config.params = params;
        } else {
            config.data = params;
        }

        return axios(config).catch( error => {
            let html = `<h2>${error.response.data.message}</h2>`;

            if (error.response.data.errors) {
                let errors_html = error.response.data.errors.map( err => { return `<li>${err}</li>` } ).join("");
                html += `<ul class="swal_errors">${errors_html}</ul>`;
            }

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html: html
            })

            throw error.response.data.message;
        });
    }
}