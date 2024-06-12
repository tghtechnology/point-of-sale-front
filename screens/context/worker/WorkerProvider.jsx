import React, { useState, useEffect, useContext } from 'react';
import { createWorker,getWorkers,editworker,deleteworker,updatedWorker} from "../../services/WorkerService"
import WorkerContext from './WorkerContext';
import AuthContext from '../auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Proveedor de contexto para el manejo de trabajadores.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} El proveedor de contexto de trabajadores.
 */

const WorkerProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
    const [worker, setWorker] = useState([])

    /**
   * Crea un nuevo trabajador.
   *
   * @param {Object} newWorker - Datos del nuevo trabajador.
   * @returns {Object|null} Los datos del trabajador creado o null si hubo un error.
   * @throws {Error} Si ocurre un error al crear el trabajador.
   */

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

    /**
   * Obtiene la lista de trabajadores.
   *
   * @returns {void}
   * @throws {Error} Si ocurre un error al obtener los trabajadores.
   */

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
      if (isAuth) {
        fetchMyWorkers();
      }
      }, [isAuth]);

      /**
   * Edita un trabajador.
   *
   * @param {number} id - ID del trabajador a editar.
   * @param {Object} updatedData - Datos actualizados del trabajador.
   * @returns {void}
   * @throws {Error} Si ocurre un error al editar el trabajador.
   */

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
  
    /**
   * Elimina un trabajador.
   *
   * @param {number} id - ID del trabajador a eliminar.
   * @returns {boolean} True si se eliminó exitosamente, false en caso contrario.
   * @throws {Error} Si ocurre un error al eliminar el trabajador.
   */

      const handleDeleteworker = async (id) => {
        const {status} = await deleteworker(id);
        if (status === 200 || status === 201) {
            return true;
        } else {
            return false;
        }
  }

    /**
   * Actualiza un trabajador.
   *
   * @param {number} id - ID del trabajador a actualizar.
   * @param {Object} newData - Datos nuevos del trabajador.
   * @returns {void}
   * @throws {Error} Si ocurre un error al actualizar el trabajador.
   */
  
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
