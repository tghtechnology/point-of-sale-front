import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import useRecibos from "../hooks/useRecibos";
import useSale from "../hooks/useSale";

const ReceiptDetail = ({ route }) => {
  const { idVenta } = route.params;
  const { handleReciboById } = useRecibos();
  const { handleSaleById } = useSale();
  const { handleClientById } = useSale();
  const [reciboDetails, setReciboDetails] = useState(null);
  const [saleDetails, setSaleDetails] = useState(null);
  const [clienteDetails, setClienteDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fetchedRecibo = await handleReciboById(idVenta);
        console.log('Fetched Recibo:', fetchedRecibo);
        if (fetchedRecibo) {
          setReciboDetails(fetchedRecibo[0]); 

          const fetchedSale = await handleSaleById(fetchedRecibo[0].id_venta);
          if (fetchedSale) {
            console.log('Cliente ID:', fetchedSale.clienteId);
            setSaleDetails(fetchedSale)
            const fetchedCliente = await handleClientById(fetchedSale.clienteId);
            if (fetchedCliente) {
              setClienteDetails(fetchedCliente);
                }
          } else {
            console.error(`Failed to fetch sale for ID: ${fetchedRecibo[0].id_venta}`);
          }
        } else {
          console.error(`Failed to fetch recibo for ID: ${idVenta}`);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    if (idVenta) {
      fetchDetails();
    } else {
      console.error("ID de la venta está indefinido");
    }
  }, [idVenta, handleReciboById, handleSaleById]);

  if (!reciboDetails || !saleDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Recibo</Text>
      <Text>Referencia: {reciboDetails.ref}</Text>
      <Text>Fecha: {new Date(reciboDetails.fecha_creacion).toLocaleString()}</Text>
      <Text>Monto Reembolsado: {reciboDetails.monto_reembolsado ? reciboDetails.monto_reembolsado : 'No disponible'}</Text>
      <Text>Valor Descuento Total: {reciboDetails.valorDescuentoTotal ? reciboDetails.valorDescuentoTotal : 'No disponible'}</Text>
      <Text>Valor Impuesto Total: {reciboDetails.valorImpuestoTotal ? reciboDetails.valorImpuestoTotal : 'No disponible'}</Text>
      {/* Mostrar detalles de la venta */}
      <Text style={styles.title}>Detalles de la Venta</Text>
      <Text>Nombre del Cliente: {clienteDetails ? clienteDetails.nombre : 'No disponible'}</Text>

      <Text>Tipo de Pago: {saleDetails.tipoPago}</Text>
      <Text>Total: {saleDetails.total}</Text>
      <Text>Dinero Recibido: {saleDetails.dineroRecibido}</Text>
      <Text>Cambio: {saleDetails.cambio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  }
});

export default ReceiptDetail;
