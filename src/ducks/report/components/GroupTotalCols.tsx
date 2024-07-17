import React from 'react';
import {B2BTotal} from "../../../types";
import numeral from "numeral";
import {groupTotal} from "../utils";

export default function GroupTotalCols({count, totals}:{
    count: number;
    totals: B2BTotal;
}) {
    return (
        <>
            <td colSpan={2}>Orders: {numeral(count).format('0,0')}</td>
            <td className="text-end">{numeral(totals.cart).format('$0,0.00')}</td>
            <td className="text-end">{numeral(totals.open).format('$0,0.00')}</td>
            <td className="text-end">{numeral(totals.shipped).format('$0,0.00')}</td>
            <td className="text-end">{numeral(groupTotal(totals)).format('$0,0.00')}</td>
        </>
    )
}
