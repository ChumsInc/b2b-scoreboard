import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/configureStore";
import {selectMaxDate} from "../selectors";
import {setMaxDate} from "../actions";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";

const MaxDate = () => {
    const dispatch = useAppDispatch();
    const maxDate = useAppSelector(selectMaxDate);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setMaxDate(ev.target.value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>To</InputGroup.Text>
            <FormControl type="date" id={id} value={maxDate} onInput={changeHandler} className="form-control" required/>
        </InputGroup>
    )
}

export default MaxDate;
