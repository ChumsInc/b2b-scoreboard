import React from 'react';
import {B2BHistoryOrder} from "../../../types";
import {customerKey, orderShipDate, toTotal} from "../utils";
import dayjs from "dayjs";
import numeral from "numeral";
import Decimal from "decimal.js";

export default function ReportOrderRow({so}:{
    so:B2BHistoryOrder
}) {
    const total = toTotal(so);
    const soParams = new URLSearchParams({company: 'CHI', salesorderno: so.SalesOrderNo});
    const soURL = `/reports/account/salesorder/?${soParams.toString()}`;
    return (
        <tr className="table-active">
            <td></td>
            <td>{customerKey(so)}</td>
            <td>{so.BillToName}</td>
            <td>{so.ShipToName}</td>
            <td>
                <a href={soURL} target="_blank">{so.SalesOrderNo}</a>
            </td>
            <td>{dayjs(so.OrderDate).format('MM/DD/YYYY')}</td>
            <td className="text-center">{so.OrderStatus}</td>
            <td>{orderShipDate(so)}</td>
            <td className="text-end">{new Decimal(total.cart).eq(0) ? null : numeral(total.cart).format('$0,0.00')}</td>
            <td className="text-end">{new Decimal(total.open).eq(0) ? null : numeral(total.open).format('$0,0.00')}</td>
            <td className="text-end">{new Decimal(total.shipped).eq(0) ? null : numeral(total.shipped).format('$0,0.00')}</td>
            <td />
        </tr>
    )
}
