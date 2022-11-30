import { Row, Col, Form } from 'react-bootstrap'
import React from 'react'
import Select from "react-select";
import { useOSCStore } from './useOSCStore';
const FormMultiSelect = (props) => {
    const formResponse = useOSCStore(
        state => state.formResponse
    );
    const setFormResponse = useOSCStore(
        state => state.setFormResponse
    );
    const dropdownChangeHandle = (event: any) => {
        const responseTemp = { ...formResponse }
        console.log(event)
        responseTemp[props.fieldDetails.elementTitle] = event[0]?.value
        setFormResponse(responseTemp)
        console.log(responseTemp)
        props.updateForm(props.fieldDetails.elementTitle, event)
    }
    return (

        <div>
            <Form.Label>{props.fieldDetails.elementTitle}</Form.Label>
            <Select
                isClearable
                isMulti
                options={props.fieldDetails.elementConfig.options}
                onChange={dropdownChangeHandle}
            />
            {props.fieldDetails.validation.error && <div>

                <span className='red-color'>{props.fieldDetails.validation.error} </span>

            </div>}
        </div>

    )
}
export default FormMultiSelect