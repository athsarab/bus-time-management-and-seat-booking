import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter'; // Import the AppRouter component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter /> {/* Render the AppRouter component */}
  </React.StrictMode>
);
