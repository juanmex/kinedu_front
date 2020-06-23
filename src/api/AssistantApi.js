import Api from "./Api"

export default class AssistantApi {
    static index() {
        return Api.get(`api/assistants/`);
    }
}