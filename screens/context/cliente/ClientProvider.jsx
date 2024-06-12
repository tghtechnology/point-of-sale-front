import React, { useState, useEffect, useContext } from 'react';
import {createClient,getClients, editClient, deleteClient, updateClient,getClientById} from "../../services/ClientService"
import ClientContext from "./ClientContext";
import AuthContext from '../auth/AuthContext';


/**
 * Componente ClientProvider
 *
 * Este componente proporciona funcionalidades relacionadas con clientes y gestión del estado
 * a sus componentes hijos. Utiliza la API de Contexto de React para gestionar clientes y
 * manejar operaciones CRUD.
 *
 * @param {Object} props - El objeto de propiedades.
 * @param {React.ReactNode} props.children - Los componentes hijos que tendrán acceso al contexto.
 *
 * @returns {JSX.Element} El componente ClientProvider.
 */

const ClientProvider = ({children}) => {
  const { isAuth } = useContext(AuthContext);
  const [client,setClient] = useState([])


  /**
   * Crea un nuevo cliente.
   * @param {Object} newClient - El nuevo cliente a crear.
   * @returns {Object|null} El cliente creado o null si la creación falló.
   * @throws {Error} - Devuelve un error si hay un problema al crear el cliente.
   */

    const handleCreateClient = async (newClient) => {
      try {
        const res= await createClient(newClient);
        if(res.status === 200 || res.status === 201){
          return res.data;
        }
        else {     
          return null;
        }
      }catch(error){

          console.log("Error creating impuesto:", error);
          return null;
      }

    }

    /**
   * Obtiene todos los clientes.
   * @returns {void}
   * @throws {Error} - Devuelve un error si hay un problema al obtener los clientes.
   */

    const fetchMyClients = async () => {
      try {
          const client = await getClients();
          console.log("Clientes obtenidos:", client);
          setClient(client);
      } catch (error) {
          console.error('Error al obtener los clientes:', error);
      }
  };

  useEffect(() => {
    if (isAuth) {
      fetchMyClients();
    }
  }, [isAuth]);

  /**
   * Edita un cliente existente.
   * @param {number|string} id - El ID del cliente a editar.
   * @param {Object} updatedData - Los datos actualizados del cliente.
   * @returns {void}
   * @throws {Error} - Devuelve un error si hay un problema al editar el cliente.
   */

  const handleEditClient = async (id, updatedData) => {
    console.log(id)
    try {
      const response = await editClient(id, updatedData);
      if (response && response.status === 200) {
        const updatedClients = client.map((clients) =>
        clients.id === id ? { ...clients, ...updatedData } : clients
        );
        setClient(updatedClients);
        console.log('cliente editado exitosamente');
      } else if (response && response.status === 204) {
        console.log('cliente editado exitosamente');
      }
    } catch (error) {
      console.error('Error editing client:', error);
    }
  };


  /**
   * Elimina un cliente.
   * @param {number|string} id - El ID del cliente a eliminar.
   * @returns {boolean} True si la eliminación fue exitosa, false en caso contrario.
   * @throws {Error} - Devuelve un error si hay un problema al eliminar el cliente.
   */

  const handleDeleteClient = async (id) => {
        const {status} = await deleteClient(id);
        if (status === 200 || status === 201) {
            return true;
        } else {
            return false;
        }
  };

  /**
   * Actualiza un cliente.
   * @param {number|string} id - El ID del cliente a actualizar.
   * @param {Object} newData - Los nuevos datos del cliente.
   * @returns {void}
   * @throws {Error} - Devuelve un error si hay un problema al actualizar el cliente.
   */

  const handleUpdateClient = async (id, newData) => {
    try {
        const updatedDiscount = await updateClient(id, newData);
        setClient(prevClient => {
            return prevClient.map(client =>
              client.id === id ? { ...client, ...updatedDiscount } : client
            );
        });
        console.log('Cliente actualizada exitosamente:', updatedDiscount);
    } catch (error) {
        console.error('Error al actualizar el Cliente:', error);
    }
  };


  /**
   * Obtiene un cliente por ID.
   * @param {number|string} id - El ID del cliente a obtener.
   * @returns {Object|null} El cliente obtenido o null si la obtención falló.
   * @throws {Error} - Devuelve un error si hay un problema al obtener el cliente.
   */
  
  const handleClientById = async (id) => {
    try {
      const res = await getClientById(id);
      if (res.status === 200 || res.status === 201) {
        return res.data;
      } else {
        console.error("Failed to get client by ID:", res.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching client by ID:", error);
      return null;
    }
  }

  return (
    <ClientContext.Provider value={{
        handleCreateClient, client,setClient, handleEditClient,handleDeleteClient,handleUpdateClient,handleClientById
    }}> 
      {children}
    </ClientContext.Provider>
  )
}

export default ClientProvider
