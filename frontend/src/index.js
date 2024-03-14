import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';




function Layout() {
  return (
    <Container>
      <Row>
        <Col sm={1}>
        </Col>
        <Col sm={10}>
        </Col>
        <Col sm={1}>
          <Button>hi</Button>
        </Col>
      </Row>
    </Container>
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
