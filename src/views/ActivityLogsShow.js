import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ActivityLogApi from "./../api/ActivityLogApi";
import { formatDate } from "../utils/utils";


const ActivityAditionalInfo = ({ activity_log }) => {
    return (
        <div>
            <div>
                <label>Fecha fin</label>
                <input className="form-control" type="text" disabled defaultValue={formatDate(activity_log.stop_time)} />
            </div>
            <div>
                <label>Duración</label>
                <input className="form-control" type="text" disabled defaultValue={`${activity_log.duration} minutos`} />
            </div>
            <div>
                <label>Comentarios</label>
                <input title={activity_log.comments} className="form-control" type="text" disabled defaultValue={activity_log.comments} />
            </div>

            <div className="form_actions">
                <Link className="btn btn-primary" to="/activity_logs/">Regresar</Link>
            </div>
        </div>
    )
}

const StopActivityForm = ({ activity_log }) => {
    const [formData, setFormData] = useState({
        stop_time: "",
        comments: ""
    });


    const stopActivity = () => {

    }
    
    return (
        <div>
            <div>
                <label>Fecha fin</label>
                <input className="form-control" type="datetime-local" value={formData.stop_time} onChange={e => setFormData({ ...formData, stop_time: e.target.value })} />
            </div>
            <div>
                <label>Comentarios</label>
                <textarea className="form-control" type="text" value={formData.comments} onChange={e => setFormData({ ...formData, comments: e.target.value })} />
            </div>
            <div className="form_actions">
                <Link className="btn btn-primary" to="/activity_logs/">Finalizar</Link>
            </div>
        </div>
    )
}

const ActivityLogsShow = ({ match }) => {
    const { id } = match.params;
    const [activity_log, setActivityLog] = useState({
        baby: { name: "" },
        assistant: { name: "" },
        activity: { name: "" },
    });

    const [start_date, setStartDate] = useState("");
    useEffect(() => {
        ActivityLogApi.show(id)
            .then(response => (response.data))
            .then(data => {
                setActivityLog(data);
                setStartDate(formatDate(data.start_time));
            });
    }, []);
    return (
        <div>
            <h1 className="page_title">
                Detalle de actividad
                    </h1>
            <div className="row">
                <div className="col">
                    <div>
                        <div>
                            <label>Bebé</label>
                            <input className="form-control" type="text" disabled defaultValue={activity_log.baby.name} />
                        </div>
                        <div>
                            <label>Asistente</label>
                            <input className="form-control" type="text" disabled defaultValue={activity_log.assistant.name} />
                        </div>
                        <div>
                            <label>Actividad</label>
                            <input className="form-control" type="text" disabled defaultValue={activity_log.activity.name} />
                        </div>
                        <div>
                            <label>Fecha de inicio</label>
                            <input className="form-control" type="text" disabled defaultValue={start_date} />
                        </div>
                    </div>
                </div>
                <div className="col">
                    {activity_log.stop_time ? <ActivityAditionalInfo activity_log={activity_log} /> : <StopActivityForm activity_log={activity_log} />}
                </div>
            </div>
        </div>

    )
}


export default ActivityLogsShow;