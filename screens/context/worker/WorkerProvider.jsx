import React, { useState, useEffect } from 'react';
import { createWorker,getWorkers } from "../../services/WorkerService"
import WorkerContext from './WorkerContext';

const WorkerProvider = ({ children }) => {
    const [worker, setWorker] = useState([])

    const handleCreateWorker = async (newWorker) => {
        const { status } = await createWorker(newWorker);
        if (status === 200 || status === 201) {
            return true;
        } else {
            return false;
        }
    }

    const fetchMyWorkers = async () => {
        try {
            const worker = await getWorkers();
            console.log("Empleados obtenidos:", worker);
            setWorker(worker);
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
        }
    };
  
    useEffect(() => {
      fetchMyWorkers();
    }, []);


    return (
        <WorkerContext.Provider value={{
            handleCreateWorker,worker
        }}>
            {children}
        </WorkerContext.Provider>
    )
}

export default WorkerProvider
