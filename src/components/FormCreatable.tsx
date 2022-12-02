import CreatableSelect from "react-select/creatable";
import React, {useState} from 'react';
import { Form } from 'react-bootstrap'
import { useOSCStore } from '../useOSCStore';
const FormCreatable = (props) => {
    const formResponse = useOSCStore(
        state => state.formResponse
    );
    const setFormResponse = useOSCStore(
        state => state.setFormResponse
    );
    const onChangeHandle = (event) => {
        let tempList:any = [];
        event.forEach(option=>{
            if(option.__isNew__) {
                tempList.push({id: -1, label: option.label, value: option.value});
            }
            else {
                tempList.push(option);
            }
        });
        const responseTemp = { ...formResponse };
        responseTemp[props.fieldDetails.elementTitle] = tempList;
        setFormResponse(responseTemp);
        props.updateForm(props.fieldDetails.elementTitle, tempList);
    }
    return (
        <div className="mt-2">
            <Form.Label>{props.fieldDetails.elementTitle}</Form.Label>
            <CreatableSelect
                isClearable 
                isMulti 
                value={props.fieldDetails.value}
                //value={props.fieldDetails.elementConfig.options}
                onChange={onChangeHandle}
                //menuIsOpen={false}
             />
        </div>
        
    );
}

export default FormCreatable;