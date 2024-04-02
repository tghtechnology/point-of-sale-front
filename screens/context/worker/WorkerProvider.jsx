import React, { useState, useEffect } from 'react';
import { createWorker,getWorkers,editworker,deleteworker,updatedWorker} from "../../services/WorkerService"
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

    const handleEditWorker = async (id) => {
        console.log(id)
        try {
          const response = await editworker(id);
          if (response && response.status === 200) {
            console.log('cliente editado exitosamente');
          } else if (response && response.status === 204) {
            console.log('cliente editado exitosamente');
          }
        } catch (error) {
          console.error('Error editing client:', error);
        }
      };
  
      const handleDeleteworker = async (id) => {
        const {status} = await deleteworker(id);
        if (status === 200 || status === 201) {
            return true;
        } else {
            return false;
        }
  }

    

    const handleUpdateWorker = async (id, newData) => {
        try {
            const updateWorker = await updatedWorker(id, newData);
            setWorker(prevWorker => {
                return prevWorker.map(worker =>
                  worker.id === id ? { ...worker, ...updateWorker } : worker
                );
            });
            console.log('Empleado actualizada exitosamente:', updateWorker);
        } catch (error) {
            console.error('Error al actualizar el Empleado:', error);
        }
      };



    return (
        <WorkerContext.Provider value={{
            handleCreateWorker,worker,setWorker,handleEditWorker,handleDeleteworker,handleUpdateWorker
        }}>
            {children}
        </WorkerContext.Provider>
    )
}

export default WorkerProvider
