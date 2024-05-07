import React, { useState, useEffect } from 'react';
import { createWorker,getWorkers,editworker,deleteworker,updatedWorker} from "../../services/WorkerService"
import WorkerContext from './WorkerContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkerProvider = ({ children }) => {
    const [worker, setWorker] = useState([])

    const handleCreateWorker = async (newWorker) => {
      try {
        const propietarioId =  await AsyncStorage.getItem("usuarioid");
        const res= await createWorker(newWorker, propietarioId);
        if(res.status === 200 || res.status === 201){
          return res.data;
        }
         else {     
          return null;
        }
      }catch(error){

          console.log("Error creating worker:", error);
          return null;
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

    const handleEditWorker = async (id,updatedData) => {
        console.log(id)
        try {
          const response = await editworker(id,updatedData);
          if (response && response.status === 200) {
            const updatedWorkers = worker.map((workers)=>
            workers.id === id ? {...workers, ...updatedData} : workers
          );
          setWorker(updatedWorkers);
          console.log('edicion correcta')
        } else if (response && response.status === 204) {
          console.log('emeplado editado exitosamente');
        }
      } catch (error) {
        console.error('Error editing worker:', error);
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
