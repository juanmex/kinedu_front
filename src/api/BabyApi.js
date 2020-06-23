import Api from "./Api"

export default class BabyApi {
    static index() {
        return Api.get(`api/babies/`);
    }
}