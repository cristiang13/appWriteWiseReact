import React, { useState } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import "../../styles/Home.css";
import { Container, Card,Button,Row,Col } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import "../../styles/Home.css";

const HistoricalReportView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title = "", type_report = "", timestamp = "", report = "" } = location.state || {};
    const [editedContent,setEditedContent] = useState(report);
//  funcion para dar formato a la fecha del reporte
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };
//   funcion para dar formato al titulo del reporte
    const formatTitle = (title) => {
        return title.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    };
    // funcion para editar el contenido del reporte
    const handleContentChange = (e) => {
      setEditedContent(e.target.value);
    };
  //  funcion para copiar el contenido del reporte
    const handleCopyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(editedContent);
        alert('The content has been copied to the clipboard');
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    };

    //  funcion para regresar a la pagina anterior
    const handleGoBack = () => {
      navigate(-1);
  };


  



   



    return (
        <Container>
            <br />
            <h2 className="report-title text-center">{title} </h2>
            <Card className="report-card">
                <Card.Body>
                    <h2 className="report-title text-center">{formatTitle(type_report)}</h2>
                    <p className="text-center"><em>{formatDate(timestamp)}</em></p>
                    <TextareaAutosize
                        className="report-content no-scrollbar"
                        value={editedContent}
                        readOnly={false}
                        onChange={handleContentChange}
                    />
                    <br></br><br></br>
                    <Row>
                      <Col md={8}></Col>
                      <Col md={4}>
                        <Button onClick={handleGoBack} className="mt-2 d-none d-md-inline-block" variant="light">
                         Go Back
                        </Button>{' '}
                        <Button  onClick={handleCopyToClipboard} className="mt-2 d-none d-md-inline-block" variant="primary" >
                          Copy
                        </Button>
                      </Col>
                    </Row>
                </Card.Body>
                <br></br>
                <Button  onClick={handleGoBack} className="mt-2 d-inline-block d-md-none copy-button" variant="light">
                  Go Back
                </Button>
                <Button  onClick={handleCopyToClipboard} className="mt-2 ml-2 d-inline-block d-md-none save-report-button" variant="primary">
                  Copy
                </Button>
            </Card>
        </Container>
    );
};

export default HistoricalReportView;
