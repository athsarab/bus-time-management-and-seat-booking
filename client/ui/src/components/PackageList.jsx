import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PackageCard from './PackageCard';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
});

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/packages')
      .then((res) => {
        setPackages(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log('Error while getting data');
      });
  }, []);

  // Function to generate PDF document
  const generatePDF = () => {
    const packageDetails = packages.map((pkg, index) => (
      <View key={index} style={styles.section}>
        <Text style={styles.heading}>Package {index + 1}</Text>
        <Text style={styles.text}>ID: {pkg.id}</Text>
        <Text style={styles.text}>Name: {pkg.name}</Text>
        <Text style={styles.text}>Description: {pkg.description}</Text>
        {/* Add more package details as needed */}
      </View>
    ));

    const doc = (
      <Document>
        <Page style={styles.page}>{packageDetails}</Page>
      </Document>
    );

    return doc;
  };

  // Function to handle downloading PDF
  const handleDownloadPDF = () => {
    const pdfDoc = generatePDF();
    const blob = pdfDoc.toBlob();
    saveAs(blob, 'package_reports.pdf');
  };

  const packagesList =
    packages.length === 0
      ? 'No packages found!'
      : packages.map((pkg, index) => (
          <PackageCard
            key={index}
            packages={pkg}
            style={{ width: '100px', margin: '10px' }} // Adjust card size and margin
          />
        ));

  return (
    <div className="Show_PackageList">
      <div className="d-grid gap-2 mb-3">
        <button className="btn btn-primary" onClick={handleDownloadPDF}>
          Download Package Reports
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {packagesList}
      </div>
    </div>
  );
};

export default PackageList;
