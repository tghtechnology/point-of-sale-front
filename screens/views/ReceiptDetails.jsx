import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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
  const { handleReciboById, listRecibo } = useRecibos();
  const { handleSaleById } = useSale();
  const { handleDiscountById } = useDiscount();
  const { handleTaxById } = useImpuesto();
  const { handleClientById } = useClient();
  const { handleArticleById } = useArticle();
  const { handleDetalleReembolsoByReciboId, handleDetalleByVentaId } = useDetalle(); 
  const { handleGetUserById } = useUser();
  const [reciboDetails, setReciboDetails] = useState(null);
  const [saleDetails, setSaleDetails] = useState(null);
  const [clienteDetails, setClienteDetails] = useState(null);
  const [discountDetails, setDiscountDetails] = useState(null);
  const [taxDetails, setTaxDetails] = useState(null);
  const [articleDetails, setArticleDetails] = useState([]);
  const [detalleDetails, setDetalleDetails] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [reembolsoDetails, setReembolsoDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const fetchedRecibo = await handleReciboById(idVenta);
        if (fetchedRecibo) {
          setReciboDetails(fetchedRecibo[0]);
          const fetchedSale = await handleSaleById(fetchedRecibo[0].id_venta);
          if (fetchedSale) {
            setSaleDetails(fetchedSale);
            const [fetchedCliente, fetchedDiscount, fetchedTax, fetchedUser, fetchedDetalles, fetchedDetallesReembolso] = await Promise.all([
              fetchedSale.clienteId ? handleClientById(fetchedSale.clienteId) : null,
              fetchedSale.descuentoId ? handleDiscountById(fetchedSale.descuentoId) : null,
              fetchedSale.impuestoId ? handleTaxById(fetchedSale.impuestoId) : null,
              fetchedSale.usuarioId ? handleGetUserById(fetchedSale.usuarioId) : null,
              handleDetalleByVentaId(fetchedSale.id),
              handleDetalleReembolsoByReciboId(fetchedRecibo[0].id),
            ]);
            setClienteDetails(fetchedCliente);
            setDiscountDetails(fetchedDiscount);
            setTaxDetails(fetchedTax);
            setUserDetails(fetchedUser);
    
            if (Array.isArray(fetchedDetallesReembolso)) {
              setReembolsoDetails(fetchedDetallesReembolso);
              const articlePromises = fetchedDetallesReembolso.map(detalleReembolso => handleArticleById(detalleReembolso.articuloId) );
              const articles = await Promise.all(articlePromises);
              setArticleDetails(articles);
            } else {
              console.error("El detalle de reembolso no es un array ni un objeto");
            }
    
            if (Array.isArray(fetchedDetalles)) {
              setDetalleDetails(fetchedDetalles);
              const articlePromises = fetchedDetalles.map(detalle => handleArticleById(detalle.articuloId) );
              const articles = await Promise.all(articlePromises);
              setArticleDetails(articles);
            } else {
              console.error("El detalle de la venta no es un array ni un objeto");
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
  }, [idVenta, handleReciboById, handleSaleById, handleClientById, handleDiscountById, handleTaxById, handleArticleById, handleDetalleByVentaId, handleGetUserById, handleDetalleReembolsoByReciboId]);

  const getMontoReembolsado = () => {
    if (reciboDetails && reciboDetails.monto_reembolsado !== null) {
      const reciboReembolsado = listRecibo.find(item => item.id_venta === reciboDetails.id_venta);
      return reciboReembolsado ? reciboReembolsado.ref : 'No disponible';
    }
    return '';
  };

  const getTotalOrReembolsado = () => {
    return reciboDetails.monto_reembolsado !== null ? reciboDetails.monto_reembolsado : saleDetails.total;
  };

  const getDescuento = () => {
    if (reciboDetails.monto_reembolsado !== null) {
      return `S/. ${reciboDetails.valorDescuentoTotal}`;
    } else {
      if (discountDetails?.tipo_descuento === "MONTO") {
        return `S/. ${discountDetails.valor}`;
      } else if (discountDetails?.tipo_descuento === "PORCENTAJE") {
        return `${discountDetails.valor}%`;
      }
    }
  };

  const getImpuesto = () => {
    if (reciboDetails.monto_reembolsado !== null) {
      return `S/. ${reciboDetails.valorImpuestoTotal}`;
    } else {
      return taxDetails?.tasa ? `${taxDetails.tasa}%` : "0%";
    }
  };

  if (!reciboDetails || !saleDetails) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.reembolsadoText}>{getMontoReembolsado()}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Total:</Text>
        <Text>S/. {getTotalOrReembolsado()}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Referencia:</Text>
        <Text>{reciboDetails.ref}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <Text>{new Date(reciboDetails.fecha_creacion).toLocaleString()}</Text>
      </View>
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
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Descuento:</Text>
        <Text>{getDescuento()}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Impuesto:</Text>
        <Text>{getImpuesto()}</Text>
      </View>
      {reciboDetails.monto_reembolsado === null && (
        <>
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

      {reciboDetails.monto_reembolsado !== null && (
        <>
{reembolsoDetails.map((detalleReembolso, index) => (
  <View key={index} style={styles.detailsContainer}>
    <Text style={styles.label}>Artículo:</Text>
    {detalleReembolso.articulo && detalleReembolso.articulo.nombre ? (
      <Text>{detalleReembolso.articulo.nombre}</Text>
    ) : (
      <Text>Nombre no disponible</Text>
    )}
    <Text>Cantidad Devuelta: {detalleReembolso.cantidadDevuelta}</Text>
  </View>
))}

        </>
      )}
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
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  reembolsadoText: {
    fontSize: 13,
    color: '#d9534f', 
    alignSelf: 'flex-end',
    marginRight: 10,
  },
});

export default ReceiptDetail;
