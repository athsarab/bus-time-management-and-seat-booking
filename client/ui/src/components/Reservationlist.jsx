import React, { useState, useEffect } from 'react';
import axios from "axios";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Reservations from './Reservations';
import "./Reservationlist.css";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
});

const Reservationlist = () => {
  const [reservations, setRes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/books")
      .then((res) => {
        setRes(res.data);
      })
      .catch(() => {
        console.log("Error while getting data");
      });
  }, []);

  const reslist = reservations.length === 0
    ? "No reservations found !!!"
    : reservations.map((reservation, index) => (
      <Reservations key={index} reservation={reservation} id={reservation._id} />
    ));

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>My Reservations</Text>
        <View>
          {reservations.map((reservation, index) => (
            <View key={index}>
              <Text>{reservation.startLocation}-{reservation.endLocation}</Text>
             <Text>{reservation.seats} Seats</Text>
              <Text>Time: {reservation.time}</Text>

              <Text> </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="Show_Reservationlist">
      <div className="container">
        <h1>My Reservations</h1>
        <br />
        <br />
        <PDFDownloadLink document={<MyDocument />} fileName="reservations.pdf"style={{
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
  }}
  className="download-pdf-btn">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF'
          }
        </PDFDownloadLink>
        <br /><br />
        <div className="list">{reslist}</div>
      </div>
    </div>
  );
};

export default Reservationlist;