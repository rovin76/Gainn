import React, { useEffect, useRef, useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { importData } from '../Redux/Appreducer/actions';
const Buttons = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    dispatch(importData(file));
  };

  return (
    <Container>
      <Row className='mt-5'>
        <Col md={{ span: 4, offset: 4 }}>
          <Form>
            <input type='file' onChange={handleFileChange} />
            <Button onClick={handleUpload}>Import</Button>
          </Form>
        </Col>
        <Col><Button>Export</Button></Col>
      </Row>
    </Container>
  )
}

export default Buttons