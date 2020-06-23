import Api from "./Api"

export default class ActivityLogApi {
    static index(baby_id,data) {
        return Api.get(`api/babies/${baby_id}/activity_logs/`, data);
    }

    static create(data) {
        return Api.post(`api/activity_logs/`, data);
    }

    static update(id, data) {
        return Api.put(`api/activity_logs/${id}`, data);
    }

    static show(id){
        return Api.get(`api/activity_logs/${id}`);
    }
}