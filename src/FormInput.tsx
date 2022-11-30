import { Row, Col, Form } from 'react-bootstrap'
import React from 'react'
import { useOSCStore } from './useOSCStore';
const FormInput = (props: any) => {
    const formResponse = useOSCStore(
        state => state.formResponse
    );
    const setFormResponse = useOSCStore(
        state => state.setFormResponse
    );
    const inputChangeHandle = (event: any) => {
        const responseTemp = { ...formResponse }
        responseTemp[props.fieldDetails.elementTitle] = event.target.value
        setFormResponse(responseTemp)
        console.log(responseTemp)
        props.updateForm(props.fieldDetails.elementTitle, event.target.value)
    }
    return (
        
            <div >
                <Form.Label>{props.fieldDetails.elementTitle}</Form.Label>
                <Form.Control
                className='display-inline'
                    id="controlTitle"
                    // maxLength={OSCConstants.MAX_INPUT_TEXT_LENGTH_CONTROL}
                    type="text"
                    placeholder={props.fieldDetails.elementConfig.placeholder}
                    value={props.fieldDetails.value}
                    onChange={inputChangeHandle}
                />
                 {props.fieldDetails.validation.error && <div>

<span className='red-color'>{props.fieldDetails.validation.error} </span>

</div>}
            </div>
        
    )
}
export default FormInput