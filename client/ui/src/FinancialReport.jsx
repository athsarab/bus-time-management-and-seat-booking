import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import './App.css';
import { Document, Page, Text, View, PDFViewer, BlobProvider } from '@react-pdf/renderer';

const MyDocument = ({ data }) => (
  <Document>
    <Page>
      <View>
        {data && data.map((report, index) => (
          <View key={index}>
            <Text>Report {index + 1}</Text>
            <Text>Bus Number: {report.busNo}</Text>
            <Text>Date: {report.date}</Text>
            <Text>Description: {report.description}</Text>
            <Text>Amount Collected: {report.amountCollected}</Text>
            <Text>_________________________________</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const FinancialReport = () => {
  const [reportData, setReportData] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchFinancialReport = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/ReportRoutes');
        setReportData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFinancialReport();
  }, []);

  const handleUpdate = (report) => {
    setSelectedReport(report);
    setShowUpdateModal(true);
  };

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`http://localhost:3000/api/ReportRoutes/${reportId}`);
      const updatedReports = reportData.filter(report => report._id !== reportId);
      setReportData(updatedReports);
      console.log(`Report with ID ${reportId} deleted successfully`);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/ReportRoutes/${selectedReport._id}`, selectedReport);
      setShowUpdateModal(false);
      console.log(`Report with ID ${selectedReport._id} updated successfully`);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDownloadPDF = () => {
    const blob = new Blob([
      <BlobProvider document={<MyDocument data={reportData} />} >
        {({ url }) => (
          <a href={url} download="financial_report.pdf">Download PDF</a>
        )}
      </BlobProvider>
    ], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'financial_report.pdf';
    link.click();
  };

  return (
    <>
      <div className="grid-container">
        <div className="container mt-5">
          <h2>Financial Report</h2>
          {reportData ? (
            <div className="row">
              {reportData.map((report, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Report {index + 1}</h5>
                      <p className="card-text">Bus Number: {report.busNo}</p>
                      <p className="card-text">Date: {report.date}</p>
                      <p className="card-text">Description: {report.description}</p>
                      <p className="card-text">Amount Collected: {report.amountCollected}</p>
                      <button className="btn btn-primary me-2" onClick={() => handleUpdate(report)}>Update</button>
                      <button className="btn btn-danger" onClick={() => handleDelete(report._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBusNo">
              <Form.Label>Bus Number</Form.Label>
              <Form.Control type="text" placeholder="Enter bus number" value={selectedReport?.busNo || ''} onChange={(e) => setSelectedReport({...selectedReport, busNo: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={selectedReport?.date || ''} onChange={(e) => setSelectedReport({...selectedReport, date: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={selectedReport?.description || ''} onChange={(e) => setSelectedReport({...selectedReport, description: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="formAmountCollected">
              <Form.Label>Amount Collected</Form.Label>
              <Form.Control type="text" placeholder="Enter amount collected" value={selectedReport?.amountCollected || ''} onChange={(e) => setSelectedReport({...selectedReport, amountCollected: e.target.value})} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <Button variant="primary" onClick={handleDownloadPDF}>
        Download All Reports as PDF
      </Button>
    </>
  );
};

export default FinancialReport;
