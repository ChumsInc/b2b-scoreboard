import React from 'react';
import {useAppSelector} from "../../../app/configureStore";
import {selectDataLoading} from "../selectors";
import ProgressBar from "react-bootstrap/ProgressBar";


export default function LoadingBar() {
    const loading = useAppSelector(selectDataLoading);

    if (loading === 'idle') {
        return null;
    }

    return (
        <div className="container my-3">
            <ProgressBar striped animated now={100}/>
        </div>
    )
}
