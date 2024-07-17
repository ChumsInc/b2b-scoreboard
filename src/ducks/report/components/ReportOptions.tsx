import React, {FormEvent} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/configureStore";
import {loadReportData} from "../actions";
import {selectLoadOptions} from "../selectors";
import MinDate from "./MinDate";
import MaxDate from "./MaxDate";

const ReportOptions = () => {
    const dispatch = useAppDispatch();
    const options = useAppSelector(selectLoadOptions)

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(loadReportData(options));
    }

    return (
        <div className="container">
            <form className="row g-3" onSubmit={submitHandler}>
                <div className="col-auto">
                    <MinDate/>
                </div>
                <div className="col-auto">
                    <MaxDate/>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-sm btn-primary">Load</button>
                </div>
                <div className="col"></div>
                <div className="col-auto"></div>
                <div className="col-auto"></div>
                <div className="col-auto"></div>
            </form>
        </div>
    )
}

export default ReportOptions;
