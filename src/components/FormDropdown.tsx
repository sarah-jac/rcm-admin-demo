import { Row, Col, Form, DropdownButton, Dropdown } from 'react-bootstrap'
import React from 'react'
import { useOSCStore } from '../useOSCStore';
const FormDropdown = (props) => {
    const formResponse = useOSCStore(
        state => state.formResponse
    );
    const setFormResponse = useOSCStore(
        state => state.setFormResponse
    );
    const dropdownChangeHandle = (event: any) => {
        const responseTemp = { ...formResponse };
        responseTemp[props.fieldDetails.elementTitle] = event.target.text;
        setFormResponse(responseTemp);
        console.log(responseTemp);
        props.updateForm(props.fieldDetails.elementTitle, event.target.text);
    }
    return (
      
            <div className="mt-2">
                <Form.Label>{props.fieldDetails.elementTitle}</Form.Label>
                {/* <Form.Control
                    id="controlTitle"
                    // maxLength={OSCConstants.MAX_INPUT_TEXT_LENGTH_CONTROL}
                    type="text"
                    placeholder={props.fieldDetails.elementConfig.placeholder}
                    value={props.fieldDetails.value}
                    onChange={dropdownChangeHandle}
                /> */}
                <DropdownButton title={props.fieldDetails.value} className="display-inline ms-2">
                    {props.fieldDetails.elementConfig.options.map(res => (
                        <Dropdown.Item
                            key={res.id}
                            onClick={dropdownChangeHandle}
                        >
                            {res.value}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
                {props.fieldDetails.validation.error && <div>

<span className='red-color'>{props.fieldDetails.validation.error} </span>

</div>}
            </div>
    
    )
}
export default FormDropdown