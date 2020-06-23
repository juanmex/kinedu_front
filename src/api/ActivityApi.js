import Api from "./Api"

export default class ActivityApi {
    static index() {
        return Api.get(`api/activities/`);
    }
}