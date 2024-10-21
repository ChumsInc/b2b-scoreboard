import React, {FormEvent} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/configureStore";
import {loadReportData} from "../actions";
import {selectLoadOptions} from "../selectors";
import MinDate from "./MinDate";
import MaxDate from "./MaxDate";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const ReportOptions = () => {
    const dispatch = useAppDispatch();
    const options = useAppSelector(selectLoadOptions)

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        dispatch(loadReportData(options));
    }

    return (
        <Container>
            <Row as="form" className="g-3" onSubmit={submitHandler}>
                <Col xs="auto">
                    <MinDate/>
                </Col>
                <Col xs="auto">
                    <MaxDate/>
                </Col>
                <Col xs="auto">
                    <Button type="submit" size="sm" variant="primary">Load</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default ReportOptions;
