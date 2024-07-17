import React from 'react';
import {DataTable} from "chums-components";
import ReportTableFoot from "./ReportTableFoot";
import {useAppDispatch, useAppSelector} from "../../../app/configureStore";
import {selectGroupSort, selectReportGroups, selectSortedGroups} from "../selectors";
import ReportTableGroup from "./ReportTableGroup";
import {B2BGroupSort} from "../../../types";
import classNames from "classnames";
import {setGroupSort} from "../actions";

const SortableTH = ({sort, field, className, children}:{
    field: 'name'|'account'|'OrderTotal';
    sort:B2BGroupSort;
    className?: string;
    children: React.ReactNode;
}) => {
    const dispatch = useAppDispatch();

    const clickHandler = () => {
        const nextSort = sort.field === field
            ? {...sort, asc: !sort.asc}
            : {field, asc: field !== 'OrderTotal'}
        dispatch(setGroupSort(nextSort));
    }
    const iconClassName = classNames('ms-1', {
        'bi-arrow-down-up': field !== sort.field,
        'text-secondary': field !== sort.field,
        'bi-arrow-down': field === sort.field && sort.asc,
        'bi-arrow-up': field === sort.field && !sort.asc,
        })
    return (
        <th style={{cursor: 'pointer'}} className={className} onClick={clickHandler}>
            {children}
            <span className={iconClassName}/>
        </th>
    )
}


export default function ReportTable() {
    const groups = useAppSelector(selectSortedGroups);
    const groupSort = useAppSelector(selectGroupSort);


    return (
        <table className="table table-sm">
            <thead>
            <tr>
                <th><span className="bi-eye" /></th>
                <SortableTH field="account" sort={groupSort}>Account</SortableTH>
                <SortableTH field="name" sort={groupSort}>Customer</SortableTH>
                <th>Ship To</th>
                <th>Order No</th>
                <th>Order Date</th>
                <th className="text-center">Order Status</th>
                <th>Ship Date</th>
                <th className="text-end">Cart Total</th>
                <th className="text-end">Open Total</th>
                <th className="text-end">Shipped Total</th>
                <SortableTH field="OrderTotal" sort={groupSort} className="text-end">Total</SortableTH>
            </tr>
            </thead>
            {groups.map(group => (<ReportTableGroup key={group.key} group={group} />))}
            <ReportTableFoot />
        </table>
    )
}
