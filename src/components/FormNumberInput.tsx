import { Form } from 'react-bootstrap';
import React, {useState} from 'react';
import { useOSCStore } from '../useOSCStore';
const FormDateField = (props) => {
    const formResponse = useOSCStore(
        state => state.formResponse
    );
    const setFormResponse = useOSCStore(
        state => state.setFormResponse
    );
    const inputChangeHandle = (event: any) => {
        console.log(event)
        const responseTemp = { ...formResponse };
        responseTemp[props.fieldDetails.elementTitle] = event.target.value;
        setFormResponse(responseTemp);
        console.log(responseTemp);
        props.updateForm(props.fieldDetails.elementTitle, event.target.value);
    } 
    return(
        <div className="mt-2">
            {props.title && <Form.Label>{props.fieldDetails.elementTitle}</Form.Label>}
            <Form.Control
                className='display-inline ms-2'
                id="controlTitle"
                // maxLength={OSCConstants.MAX_INPUT_TEXT_LENGTH_CONTROL}
                type="number"
                //placeholder={props.fieldDetails.elementConfig.placeholder}
                //value={props.value}
                onChange={inputChangeHandle}
            />
            {props.fieldDetails.validation.error && <div>
                <span className='red-color'>{props.fieldDetails.validation.error} </span>
                </div>
            }
        </div>
    )
}

export default FormDateField;