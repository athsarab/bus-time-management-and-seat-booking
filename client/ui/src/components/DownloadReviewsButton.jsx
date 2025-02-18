import React from 'react';
import axios from 'axios';

const DownloadReviewsButton = () => {
  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reviews/download-pdf", { responseType: 'blob' });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'all_reviews.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button className="btn btn-primary me-2" onClick={handleDownload}>Download Reviews as PDF</button>
  );
};

export default DownloadReviewsButton;
