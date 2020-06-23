import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import BabyApi from "../api/BabyApi";
import AssistantApi from "../api/AssistantApi";
import ActivityApi from "../api/ActivityApi";
import ActivityLogApi from "../api/ActivityLogApi";


const ActivityLogsNew = () => {
    const INITIAL_FORM_STATE = {
        baby_id: "",
        assistant_id: "",
        activity_id: "",
        start_time: ""
    };


    const [babies, setBabies] = useState([]);
    const [assistants, setAssistants] = useState([]);
    const [activities, setActivities] = useState([]);
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);


    useEffect(() => {
        Promise.all([BabyApi.index(), AssistantApi.index(), ActivityApi.index()])
            .then(function (results) {
                const [babies, assistants, activities] = results;
                setBabies(babies.data);
                setAssistants(assistants.data);
                setActivities(activities.data);
            });
    }, []);

    const saveActivityLog = () => {
        ActivityLogApi.create({ activity_log: {...formData, start_time: new Date(formData.start_time)} })
            .then(response => (response.data))
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'El registro fue agregado exitosamente',
                });
                setFormData(INITIAL_FORM_STATE);
            })

    }

    return (
        <div>
            <h1 className="page_title">
                Agregar actividad
            </h1>
            <form>
                <div className="row">
                    <div className="col">
                        <label>Bebé</label>
                        <select className="form-control" value={formData.baby_id} onChange={e => setFormData({ ...formData, baby_id: e.target.value })}>
                            <option value="null">Seleccionar bebé</option>
                            {babies.map(baby => (<option key={baby.id} value={baby.id}>{baby.name}</option>))}
                        </select>
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <label>Asistente</label>
                        <select className="form-control" value={formData.assistant_id} onChange={e => setFormData({ ...formData, assistant_id: e.target.value })}>
                            <option value="">Seleccionar asistente</option>
                            {assistants.map(assistant => (<option key={assistant.id} value={assistant.id}>{assistant.name}</option>))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Actividad</label>
                        <select className="form-control" value={formData.activity_id} onChange={e => setFormData({ ...formData, activity_id: e.target.value })}>
                            <option value="">Seleccionar actividad</option>
                            {activities.map(activity => (<option key={activity.id} value={activity.id}>{activity.name}</option>))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label>Fecha inicio</label>
                        <input className="form-control" type="datetime-local" value={formData.start_time} onChange={e => setFormData({ ...formData, start_time: e.target.value })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col form_actions">
                        <button type="button" className="btn btn-primary" onClick={saveActivityLog}>Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ActivityLogsNew;