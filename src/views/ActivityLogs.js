import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ActivityLogApi from "../api/ActivityLogApi";
import BabyApi from "../api/BabyApi";
import AssistantApi from "../api/AssistantApi";
import {formatDate} from "../utils/utils";


const ActivityLogs = () => {

    const [activity_logs, setActivityLogs] = useState([]);
    const [babies, setBabies] = useState([]);
    const [assistants, setAssistants] = useState([]);
    const [baby_id, setBabyId] = useState("null");
    const [filter, setFilter] = useState(
        {
            assistant_id: "",
            status: ""
        }
    );

    const loadActivityLogs = () => {
        ActivityLogApi.index(baby_id, filter).then(response => {
            return response.data;
        }).then(data => {
            setActivityLogs(data);
        });
    }

    useEffect(() => {
        Promise.all([BabyApi.index(), AssistantApi.index()])
            .then(function (results) {
                const [babies, assistants] = results;
                setBabies(babies.data);
                setAssistants(assistants.data);
            });

        loadActivityLogs();

    }, []);

    return (
        <div>
            <div>
                <h1 className="page_title">
                    Log de actividades <Link className="btn btn-primary" to="/activity_logs/new">Agregar actividad</Link>
                </h1>
                <div className="row">
                    <div className="col">
                        <label>Bebés</label>
                        <select className="form-control" value={baby_id} onChange={e => setBabyId(e.target.value)}>
                            <option value="null">Seleccionar bebé</option>
                            {babies.map(baby => (<option key={baby.id} value={baby.id}>{baby.name}</option>))}
                        </select>
                    </div>
                    <div className="col">
                        <label>Asistentes</label>
                        <select className="form-control" value={filter.assistant_id} onChange={e => setFilter({ ...filter, assistant_id: e.target.value })}>
                            <option value="">Seleccionar asistente</option>
                            {assistants.map(assistant => (<option key={assistant.id} value={assistant.id}>{assistant.name}</option>))}
                        </select>
                    </div>
                    <div className="col">
                        <label>Estatus</label>
                        <select className="form-control" value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
                            <option value="">Todos</option>
                            <option value="complete">Terminado</option>
                            <option value="in_progress">En progreso</option>
                        </select>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" onClick={loadActivityLogs}>Filtrar</button>
                    </div>
                </div>
            </div>
            <table className="table with_filter">
                <thead>
                    <tr>
                        <th>Bebé</th>
                        <th>Asistente</th>
                        <th>Actividad</th>
                        <th>Inicio</th>
                        <th>Estatus</th>
                        <th>Duración</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {activity_logs.map(activity_log => (
                        <tr key={activity_log.id}>
                            <td>{activity_log.baby.name}</td>
                            <td>{activity_log.assistant.name}</td>
                            <td>{activity_log.activity.name}</td>
                            <td>{formatDate(activity_log.start_time)}</td>
                            <td>{activity_log.stop_time ? "Terminada" : "En progreso"}</td>
                            <td>{activity_log.stop_time ? `${activity_log.duration} minutos` : "."}</td>
                            <td>
                                <Link className="btn btn-primary" to={`/activity_logs/${activity_log.id}`}>Ver</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ActivityLogs;