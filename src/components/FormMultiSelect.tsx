import { Form } from 'react-bootstrap';
import React, {useState} from 'react';
import Select, {components} from "react-select";
import { useOSCStore } from '../useOSCStore';
const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
};
const FormMultiSelect = (props) => {
    const formResponse = useOSCStore(
        state => state.formResponse
    );
    const setFormResponse = useOSCStore(
        state => state.setFormResponse
    );
    const [optionSelected, setOptionSelected] = useState(null);
    const dropdownChangeHandle = (event: any) => {
        setOptionSelected(event)
        const responseTemp = { ...formResponse };
        responseTemp[props.fieldDetails.elementTitle] = event[0]?.value;
        setFormResponse(responseTemp);
        props.updateForm(props.fieldDetails.elementTitle, event);
    }
    return (
        <div className="mt-2">
            <Form.Label>{props.fieldDetails.elementTitle}</Form.Label>
            {/* <Select
                isClearable
                isMulti
                options={props.fieldDetails.elementConfig.options}
                onChange={dropdownChangeHandle}
            /> */}
            <Select
                options={props.fieldDetails.elementConfig.options}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                    Option
                }}
                onChange={dropdownChangeHandle}
                //allowSelectAll={true}
                value={optionSelected}
            />
            {props.fieldDetails.validation.error && <div>
                <span className='red-color'>{props.fieldDetails.validation.error} </span>
            </div>}
        </div>

    )
}
export default FormMultiSelect