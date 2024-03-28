import React, { useState, useEffect } from 'react';
import { createWorker } from "../../services/WorkerService"
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



    return (
        <WorkerContext.Provider value={{
            handleCreateWorker
        }}>
            {children}
        </WorkerContext.Provider>
    )
}

export default WorkerProvider
