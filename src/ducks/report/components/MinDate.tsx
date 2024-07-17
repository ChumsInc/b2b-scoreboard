import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/configureStore";
import {selectMinDate} from "../selectors";
import {setMinDate} from "../actions";
import {InputGroup} from "chums-components";

const MinDate = () => {
    const dispatch = useAppDispatch();
    const minDate = useAppSelector(selectMinDate);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setMinDate(ev.target.value));
    }

    return (
        <InputGroup bsSize="sm">
            <label htmlFor={id} className="input-group-text">From</label>
            <input type="date" value={minDate} onInput={changeHandler} className="form-control" required />
        </InputGroup>
    )
}

export default MinDate;
