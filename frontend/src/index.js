import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
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
          <img src= "Assests/test.png" class = "img-fluid"></img> 
        </div>
        <div className = "col-6">
        <img src= "Assests/test.png" class = "img-fluid"></img> 
        </div>
      </div>
      <div className = "row">
        <div className = "col-6">
          <img src= "Assests/test.png" class = "img-fluid"></img> 
        </div>
        <div className = "col-6">
          <img src= "Assests/test.png" class = "img-fluid"></img> 
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

function LayoutFooter() {
  return (
    <div className = "container-fluid">
      <div className = "row">
        <Tabs classname = "mb-1">
          <Tab title = "Home">Test1</Tab>
          <Tab title = "Home">Test2</Tab>
          <Tab title = "Home">Test3</Tab>
        </Tabs>
      </div>
    </div>
  );
}

const rootFooter = ReactDOM.createRoot(document.getElementById('rootFooter'));
rootFooter.render(
  <React.StrictMode>
    <App />
    <LayoutFooter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
