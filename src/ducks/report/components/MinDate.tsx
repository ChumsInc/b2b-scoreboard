import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/configureStore";
import {selectMinDate} from "../selectors";
import {setMinDate} from "../actions";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

const MinDate = () => {
    const dispatch = useAppDispatch();
    const minDate = useAppSelector(selectMinDate);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setMinDate(ev.target.value));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>From</InputGroup.Text>
            <FormControl type="date" value={minDate} onInput={changeHandler} required />
        </InputGroup>
    )
}

export default MinDate;
