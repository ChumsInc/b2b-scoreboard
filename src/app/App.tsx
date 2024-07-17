import React, {useEffect} from 'react';
import {useAppDispatch} from "./configureStore";
import AlertList from "../ducks/alerts/AlertList";
import ReportOptions from "../ducks/report/components/ReportOptions";
import LoadingBar from "../ducks/report/components/LoadingBar";
import ReportTable from "../ducks/report/components/ReportTable";

const App = () => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <AlertList/>
            <ReportOptions />
            <LoadingBar />
            <ReportTable />
        </div>
    )
}

export default App;
