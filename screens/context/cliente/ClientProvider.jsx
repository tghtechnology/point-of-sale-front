import React, { useState, useEffect } from 'react';
import {createClient,getClients, editClient, deleteClient, updateClient} from "../../services/ClientService"
import ClientContext from "./ClientContext";
const ClientProvider = ({children}) => {
  const [client,setClient] = useState([])
    const handleCreateClient = async (newClient) => {
        const { status } = await createClient(newClient);
        if(status === 200 || status === 201){
          return true;
        }else {     
          return false;
        }
    }

    const fetchMyClients = async () => {
      try {
          const client = await getClients();
          console.log("Descuentos obtenidos:", client);
          setClient(client);
      } catch (error) {
          console.error('Error al obtener los descuentos:', error);
      }
  };

  useEffect(() => {
    fetchMyClients();
  }, []);

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
  }

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
  return (
    <ClientContext.Provider value={{
        handleCreateClient, client, handleEditClient,handleDeleteClient,handleUpdateClient
    }}> 
      {children}
    </ClientContext.Provider>
  )
}

export default ClientProvider
