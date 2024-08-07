import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useRecibos from "../../hooks/useRecibos";
import useSale from "../../hooks/useSale";
import useImpuesto from "../../hooks/useImpuesto";
import useClient from "../../hooks/useClient";
import useDiscount from "../../hooks/useDiscount";
import useArticle from "../../hooks/useArticle";
import useDetalle from "../../hooks/useDetalle";
import useDetalleReembolso from "../../hooks/useDetalleReembolso";
import useUser from '../../hooks/useUser';
import { useTotal } from "../../Global State/TotalContext";

const ReceiptDetail = ({ route }) => {
  const navigation = useNavigation();
  const { idRecibo } = route.params;
  const { handleDetalleReembolsoByReciboId } = useDetalleReembolso();
  const { handleReciboById } = useRecibos();
  const { handleSaleById } = useSale();
  const { handleDiscountById } = useDiscount();
  const { handleTaxById } = useImpuesto();
  const { handleClientById } = useClient();
  const { handleArticleById } = useArticle();
  const { handleDetalleByVentaId } = useDetalle();
  const {handleGetUserById}=useUser();
  const { setArticleNames, setArticleQuantities, setVentaId,setArticleIds, setarticleQuantitiesReembolsadas } = useTotal(); // Added setArticleQuantities
  const [reciboDetails, setReciboDetails] = useState(null);
  const [saleDetails, setSaleDetails] = useState(null);
  const [clienteDetails, setClienteDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [discountDetails, setDiscountDetails] = useState(null);
  const [taxDetails, setTaxDetails] = useState(null);
  const [articleDetails, setArticleDetails] = useState([]);
  const [detalleDetails, setDetalleDetails] = useState([]);
  const [reembolsoArticleDetails, setReembolsoArticleDetails] = useState([]);

  const fetchDetails = async () => {
    try {
      const fetchedRecibo = await handleReciboById(idRecibo);
      if (fetchedRecibo) {
        const fetchedSale = await handleSaleById(fetchedRecibo[0].id_venta);
        if (fetchedSale) {
          const fetchedDetalles = await handleDetalleByVentaId(fetchedSale.id);
  
          const [fetchedCliente,fetchedUser,fetchedDiscount,fetchedTax,articles,reembolsoDetallesArray] = await Promise.all([
            fetchedSale.clienteId ? handleClientById(fetchedSale.clienteId) : null,
            fetchedSale.usuarioId ? handleGetUserById(fetchedSale.usuarioId) : null,
            fetchedSale.descuentoId ? handleDiscountById(fetchedSale.descuentoId) : null,
            fetchedSale.impuestoId ? handleTaxById(fetchedSale.impuestoId) : null,
            fetchedDetalles ? Promise.all(fetchedDetalles.map(detalle => handleArticleById(detalle.articuloId))) : [],
            handleDetalleReembolsoByReciboId(fetchedRecibo[0].id)
          ]);
  
          setReciboDetails(fetchedRecibo[0]);
          setSaleDetails(fetchedSale);
          setClienteDetails(fetchedCliente);
          setUserDetails(fetchedUser);
          setDiscountDetails(fetchedDiscount);
          setTaxDetails(fetchedTax);
          setDetalleDetails(fetchedDetalles);
          setArticleDetails(articles);
  
          const articleNames = articles.map(article => article.nombre);
          setArticleNames(articleNames);
  
          const articleIds = articles.map(article => article.id);
          setArticleIds(articleIds);
  
          const articleQuantities = fetchedDetalles.map(detalle => detalle.cantidad);
          setArticleQuantities(articleQuantities);
  
          const articleQuantitiesReembolsadas = fetchedDetalles.map(detalle => detalle.cantidadReembolsadaTotal);
          setarticleQuantitiesReembolsadas(articleQuantitiesReembolsadas);
  
          setVentaId(fetchedSale.id);
  
          const reembolsoArticlePromises = (Array.isArray(reembolsoDetallesArray) ? reembolsoDetallesArray : [reembolsoDetallesArray])
            .map(detalle => handleArticleById(detalle.articuloId));
          const reembolsoArticles = await Promise.all(reembolsoArticlePromises);
          setReembolsoArticleDetails(reembolsoArticles.map((article, index) => ({
            nombre: article.nombre,
            cantidad: reembolsoDetallesArray[index].cantidadDevuelta
          })));
        } else {
          console.error(`Failed to fetch sale for ID: ${fetchedRecibo[0].id_venta}`);
        }
      } else {
        console.error(`Failed to fetch recibo for ID: ${idRecibo}`);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };
  
  useEffect(() => {
    if (idRecibo) {
      fetchDetails();
    } else {
      console.error("ID de la venta está indefinido");
    }
  }, [idRecibo, handleReciboById, handleSaleById, handleClientById, handleDiscountById, handleTaxById, handleArticleById, handleDetalleByVentaId, handleDetalleReembolsoByReciboId, setArticleNames, setArticleQuantities, setVentaId, setArticleIds, setarticleQuantitiesReembolsadas, handleGetUserById]);
  if (!reciboDetails || !saleDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  function padLeft(number) {
    return number < 10 ? `0${number}` : number;
  }
  const fecha = new Date(reciboDetails.fecha_creacion);
    const formattedDate = `${padLeft(fecha.getUTCDate())}-${padLeft(fecha.getUTCMonth() + 1)}-${fecha.getUTCFullYear()} ${padLeft(fecha.getUTCHours())}:${padLeft(fecha.getUTCMinutes())}:${padLeft(fecha.getUTCSeconds())}`;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles de Venta</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Referencia:</Text>
        <Text>{reciboDetails.ref}</Text>
      </View>
      {clienteDetails && clienteDetails.nombre && (
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Nombre del Cliente:</Text>
              <Text>{clienteDetails.nombre}</Text>
            </View>
          )}
          {userDetails && userDetails.nombre && (
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Nombre del Vendedor:</Text>
              <Text>{userDetails.nombre}</Text>
            </View>
          )}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <Text>{formattedDate}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Tipo de Pago:</Text>
        <Text>{saleDetails.tipoPago}</Text>
      </View>
      {reciboDetails.monto_reembolsado === null ? (
        <>
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
          {/* Detalles de Artículos */}
          <Text style={styles.title}>Detalles de los Artículos</Text>
          {articleDetails.map((article, index) => (
            <View key={index} style={styles.detailsContainer}>
              <Text style={styles.label}>Artículo:</Text>
              <Text>{article.nombre}</Text>
              <Text>X{detalleDetails[index]?.cantidad}</Text>
            </View>
          ))}
          <TouchableOpacity onPress={() => navigation.navigate("Reembolsar")} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Reembolsar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Detalles de Venta con Reembolso */}
          {reciboDetails.monto_reembolsado !== null && (
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Monto Reembolsado:</Text>
              <Text>{reciboDetails.monto_reembolsado}</Text>
            </View>
          )}
          {reciboDetails.valorDescuentoTotal !== null && (
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Valor Descuento Total:</Text>
              <Text>S/. -{reciboDetails.valorDescuentoTotal}</Text>
            </View>
          )}
          {reciboDetails.valorImpuestoTotal !== null && (
            <View style={styles.detailsContainer}>
              <Text style={styles.label}>Valor Impuesto Total:</Text>
              <Text>S/. {reciboDetails.valorImpuestoTotal}</Text>
            </View>
          )}
          {/* Detalles de Artículos Reembolsados */}
          <Text style={styles.title}>Detalles de los Artículos Reembolsados</Text>
          {reembolsoArticleDetails.map((article, index) => (
            <View key={index} style={styles.detailsContainer}>
              <Text style={styles.label}>Artículo Reembolsado:</Text>
              <Text>{article.nombre}</Text>
              <Text>X{article.cantidad}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
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
    marginBottom: 10, 
  },
  label: {
    fontWeight: "500",
    marginRight: 5,
    color: "#333",
  },
  buttonContainer: {
    marginTop: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0258FE',
    backgroundColor: '#0258FE',
    width: '50%',
    alignSelf: 'center', 
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default ReceiptDetail;
