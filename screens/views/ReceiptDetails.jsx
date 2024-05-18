import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import useRecibos from "../hooks/useRecibos";
import useSale from "../hooks/useSale";
import useImpuesto from "../hooks/useImpuesto";
import useClient from "../hooks/useClient";
import useDiscount from "../hooks/useDiscount";

const ReceiptDetail = ({ route }) => {
  const { idVenta } = route.params;
  const { handleReciboById } = useRecibos();
  const { handleSaleById} = useSale();
  const { handleDiscountById} = useDiscount();
  const { handleTaxById} = useImpuesto();
  const {handleClientById} = useClient();
  const [reciboDetails, setReciboDetails] = useState(null);
  const [saleDetails, setSaleDetails] = useState(null);
  const [clienteDetails, setClienteDetails] = useState(null);
  const [discountDetails, setDiscountDetails] = useState(null);
  const [taxDetails, setTaxDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fetchedRecibo = await handleReciboById(idVenta);
        if (fetchedRecibo) {
          setReciboDetails(fetchedRecibo[0]);
          const fetchedSale = await handleSaleById(fetchedRecibo[0].id_venta);
          if (fetchedSale) {
            setSaleDetails(fetchedSale);
            const [fetchedCliente, fetchedDiscount, fetchedTax] = await Promise.all([
              fetchedSale.clienteId ? handleClientById(fetchedSale.clienteId) : null,
              fetchedSale.descuentoId ? handleDiscountById(fetchedSale.descuentoId) : null,
              fetchedSale.impuestoId ? handleTaxById(fetchedSale.impuestoId) : null
            ]);
            setClienteDetails(fetchedCliente);
            setDiscountDetails(fetchedDiscount);
            setTaxDetails(fetchedTax);
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
  }, [idVenta, handleReciboById, handleSaleById, handleClientById, handleDiscountById, handleTaxById]);

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
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Referencia:</Text>
        <Text>{reciboDetails.ref}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <Text>{new Date(reciboDetails.fecha_creacion).toLocaleString()}</Text>
      </View>
      {reciboDetails.monto_reembolsado !== null && (
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Monto Reembolsado:</Text>
          <Text>{reciboDetails.monto_reembolsado}</Text>
        </View>
      )}
      {reciboDetails.valorDescuentoTotal !== null && (
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Valor Descuento Total:</Text>
          <Text>{reciboDetails.valorDescuentoTotal}</Text>
        </View>
      )}
      {reciboDetails.valorImpuestoTotal !== null && (
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Valor Impuesto Total:</Text>
          <Text>{reciboDetails.valorImpuestoTotal}</Text>
        </View>
      )}
      {/* Mostrar detalles de la venta */}
      <Text style={styles.title}>Detalles de la Venta</Text>
      {clienteDetails && clienteDetails.nombre && (
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Nombre del Cliente:</Text>
          <Text>{clienteDetails.nombre}</Text>
        </View>
      )}
      {discountDetails && discountDetails.valor && (
        <View style={styles.detailsContainer}>
        <Text style={styles.label}>Descuento:</Text>
        <Text>
          {discountDetails.tipo_descuento === "MONTO"
            ? `S/. ${discountDetails.valor}`
            : `${discountDetails.valor}%`}
        </Text>
      </View>
      )}
      {taxDetails && taxDetails.tasa && (
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Impuesto:</Text>
          <Text>{taxDetails.tasa}%</Text>
        </View>
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Tipo de Pago:</Text>
        <Text>{saleDetails.tipoPago}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Total:</Text>
        <Text>S/. {saleDetails.total}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Dinero Recibido:</Text>
        <Text>S/. {saleDetails.dineroRecibido}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Cambio:</Text>
        <Text>S/. {saleDetails.cambio}</Text>
      </View>
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
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default ReceiptDetail;
