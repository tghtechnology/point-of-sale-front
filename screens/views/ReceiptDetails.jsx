import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useRecibos from "../hooks/useRecibos";
import useSale from "../hooks/useSale";
import useImpuesto from "../hooks/useImpuesto";
import useClient from "../hooks/useClient";
import useDiscount from "../hooks/useDiscount";
import useArticle from "../hooks/useArticle";
import useDetalle from "../hooks/useDetalle";
import useUser from "../hooks/useUser";

const ReceiptDetail = ({ route }) => {
  const { idVenta } = route.params;
  const { handleReciboById } = useRecibos();
  const { handleSaleById } = useSale();
  const { handleDiscountById } = useDiscount();
  const { handleTaxById } = useImpuesto();
  const { handleClientById } = useClient();
  const { handleArticleById } = useArticle();
  const { handleDetalleById } = useDetalle();
  const { handleGetUserById } = useUser();
  const [reciboDetails, setReciboDetails] = useState(null);
  const [saleDetails, setSaleDetails] = useState(null);
  const [clienteDetails, setClienteDetails] = useState(null);
  const [discountDetails, setDiscountDetails] = useState(null);
  const [taxDetails, setTaxDetails] = useState(null);
  const [articleDetails, setArticleDetails] = useState([]);
  const [detalleDetails, setDetalleDetails] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fetchedRecibo = await handleReciboById(idVenta);
        if (fetchedRecibo) {
          setReciboDetails(fetchedRecibo[0]);
          const fetchedSale = await handleSaleById(fetchedRecibo[0].id_venta);
          if (fetchedSale) {
            setSaleDetails(fetchedSale);
            const [fetchedCliente, fetchedDiscount, fetchedTax, fetchedDetalles,fetchedUser] = await Promise.all([
              fetchedSale.clienteId ? handleClientById(fetchedSale.clienteId) : null,
              fetchedSale.descuentoId ? handleDiscountById(fetchedSale.descuentoId) : null,
              fetchedSale.impuestoId ? handleTaxById(fetchedSale.impuestoId) : null,
              handleDetalleById(fetchedSale.id),
              fetchedSale.usuarioId? handleGetUserById(fetchedSale.usuarioId) : null,
            ]);
            setClienteDetails(fetchedCliente);
            setDiscountDetails(fetchedDiscount);
            setTaxDetails(fetchedTax);
            setDetalleDetails(fetchedDetalles);
            setUserDetails(fetchedUser);

            const articlePromises = fetchedDetalles.map(detalle => handleArticleById(detalle.articuloId));
            const articles = await Promise.all(articlePromises);
            setArticleDetails(articles);
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
  }, [idVenta, handleReciboById, handleSaleById, handleClientById, handleDiscountById, handleTaxById, handleArticleById, handleDetalleById]);

  if (!reciboDetails || !saleDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de Venta</Text>
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
      {clienteDetails && clienteDetails.nombre && (
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Nombre del Cliente:</Text>
          <Text>{clienteDetails.nombre}</Text>
        </View>
      )}
      {userDetails && userDetails.nombre && (
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Nombre del Empleado:</Text>
          <Text>{userDetails.nombre}</Text>
        </View>
      )}
      {(reciboDetails.monto_reembolsado === null) && (
        <>
          {reciboDetails.valorDescuentoTotal !== null && (
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Valor Descuento Total:</Text>
              <Text>S/.-{reciboDetails.valorDescuentoTotal}</Text>
            </View>
          )}
          {reciboDetails.valorImpuestoTotal !== null && (
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Valor Impuesto Total:</Text>
              <Text>S/. {reciboDetails.valorImpuestoTotal}</Text>
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
            <Text>S/. -{saleDetails.vDescuento}</Text>
          </View>
          )}
          {taxDetails && taxDetails.tasa && (
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Impuesto:</Text>
              <Text>{taxDetails.tasa}%</Text>
              <Text>S/.{saleDetails.VImpuesto}</Text>
            </View>
          )}
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
        </>
        
      )}
      <Text style={styles.title}>Detalles de los Artículos</Text>
      {articleDetails.map((article, index) => (
        <View key={index} style={styles.detailsContainer}>
          <Text style={styles.label}>Artículo:</Text>
          <Text>{article.nombre}</Text>
          <Text>X{detalleDetails[index].cantidad}</Text>
        </View>
      ))}
      <View style={styles.detailsContainer}>
            <Text style={styles.label}>Tipo de Pago:</Text>
            <Text>{saleDetails.tipoPago}</Text>
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
  detailsContainer1: {
    padding: 9,
    textAlign: 'center',
    marginLeft: 130,
  },
  totalText: {
    fontSize: 29,
  },
  labelTotal: {
    marginLeft: 25,
    fontSize: 20,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  buttonContainer: {
    marginTop: 25,
    overflow: "hidden",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0258FE',
    backgroundColor: '#0258FE',
    width: 237,
    height: 39,
    marginLeft: 55,
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ReceiptDetail;
