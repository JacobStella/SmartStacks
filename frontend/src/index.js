import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>



function Layout() {
  return (
    <div className = "container">
      <div className = "row">
        <div className = "col-sm-1"></div>
        <div className="col-sm-10"></div>
        <div className="col-sm-1"> 
          <Button variant = "primary">Plus</Button>
        </div>
      </div>
    </div>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Layout />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
