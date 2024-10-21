import React from 'react';
import AlertList from "../ducks/alerts/AlertList";
import ReportOptions from "../ducks/report/components/ReportOptions";
import LoadingBar from "../ducks/report/components/LoadingBar";
import ReportTable from "../ducks/report/components/ReportTable";

const App = () => {
    return (
        <div>
            <AlertList/>
            <ReportOptions/>
            <LoadingBar/>
            <LoadingBar/>
            <ReportTable/>
        </div>
    )
}

export default App;
