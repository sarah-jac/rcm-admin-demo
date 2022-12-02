import React, {useState} from 'react';
import { Form } from 'react-bootstrap';

const FormTextArea = (props) => {
    
    return(
        <div className="mt-2">
          <Form.Label>{props.fieldDetails.elementTitle}</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </div>
    )
}

export default FormTextArea;