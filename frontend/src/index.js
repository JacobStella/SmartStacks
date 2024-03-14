import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



function Layout() {
  return (
    <div className = "container-fluid">
      <div className = "row">
        <div className = "col-1">
          <Button>
            <span className ="bi-list"></span>
          </Button>
        </div>
        <div className="col-10"></div>
        <div className="col-1"> 
          <Button>
            <span className ="bi bi-plus"></span>
          </Button>
        </div>
      </div>
      <div className = "row">
        <div className = "col-6">
          <img src= "public/Assests/test.png" className= "img-fluid rounded"></img> 
        </div>
        <div className = "col-6">
        </div>
      </div>
      <div className = "row">
        <div className = "col-6">
        </div>
        <div className = "col-6">
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
