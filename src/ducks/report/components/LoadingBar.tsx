import React from 'react';
import {useAppSelector} from "../../../app/configureStore";
import {selectDataLoading} from "../selectors";
import {LoadingProgressBar} from "chums-components";


export default function LoadingBar() {
    const loading = useAppSelector(selectDataLoading);

    return (
        <div className="container my-3">
            <LoadingProgressBar height={loading === 'idle' ? '0' : '5px'} striped animated />
        </div>
    )
}
