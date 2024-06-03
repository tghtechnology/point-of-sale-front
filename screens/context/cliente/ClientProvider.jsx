import React, { useState, useEffect, useContext } from 'react';
import {createClient,getClients, editClient, deleteClient, updateClient,getClientById} from "../../services/ClientService"
import ClientContext from "./ClientContext";
import AuthContext from '../auth/AuthContext';

const ClientProvider = ({children}) => {
  const { isAuth } = useContext(AuthContext);
  const [client,setClient] = useState([])

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

  const handleDeleteClient = async (id) => {
        const {status} = await deleteClient(id);
        if (status === 200 || status === 201) {
            return true;
        } else {
            return false;
        }
  };

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
