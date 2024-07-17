import React, {ChangeEvent, useId} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/configureStore";
import {selectMaxDate, selectMinDate} from "../selectors";
import {setMaxDate, setMinDate} from "../actions";
import {InputGroup} from "chums-components";

const MaxDate = () => {
    const dispatch = useAppDispatch();
    const maxDate = useAppSelector(selectMaxDate);
    const id = useId();

    const changeHandler = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setMaxDate(ev.target.value));
    }

    return (
        <InputGroup bsSize="sm">
            <label htmlFor={id} className="input-group-text">To</label>
            <input type="date" value={maxDate} onInput={changeHandler} className="form-control" required />
        </InputGroup>
    )
}

export default MaxDate;
