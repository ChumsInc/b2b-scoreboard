import React from 'react';
import {useAppSelector} from "../../../app/configureStore";
import {selectReportTotal} from "../selectors";
import numeral from 'numeral'
import {groupTotal} from "../utils";
import GroupTotalCols from "./GroupTotalCols";

export default function ReportTableFoot() {
    const grandTotal = useAppSelector(selectReportTotal);

    return (
        <tfoot>
        <tr className="table-primary">
            <td></td>
            <th colSpan={5}>Grand Total: {numeral(groupTotal(grandTotal.totals)).format('$0,0.00')}</th>
            <GroupTotalCols count={grandTotal.data.length} totals={grandTotal.totals}/>
        </tr>
        </tfoot>
    )
}
