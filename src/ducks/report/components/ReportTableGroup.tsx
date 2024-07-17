import React from 'react';
import {B2BGroupEntity, B2BTotalGroup} from "../../../types";
import {customerKey, isCustomer, isSalesperson, isUser, repKey} from "../utils";
import UserIcon from "./UserIcon";
import GroupTotalCols from "./GroupTotalCols";
import {useAppDispatch, useAppSelector} from "../../../app/configureStore";
import {selectShowAllDetail, selectVisibility} from "../selectors";
import ReportOrderRow from "./ReportOrderRow";
import classNames from "classnames";
import {toggleShowGroup} from "../actions";

function ReportTableTitles({entity}: { entity: B2BGroupEntity }) {
    if (!entity) {
        return <th colSpan={5}>Unknown Group</th>
    }

    if (isUser(entity)) {
        return (
            <>
                <th colSpan={2}>
                    <UserIcon userType={entity.userType}/>
                    {entity.company}
                </th>
                <th colSpan={3}>
                    <a href={`mailto:${entity.email}`} target="_blank" rel="noopener">
                        {entity.name}
                    </a>
                </th>
            </>
        )
    }

    if (isCustomer(entity)) {
        return (
            <th colSpan={5}>
                <span className="me-1">{customerKey(entity)}</span>
                {entity.BillToName}
            </th>
        )
    }

    if (isSalesperson(entity)) {
        return (
            <th colSpan={5}>
                <span className="me-1"> {repKey(entity)}</span>
                {entity.SalespersonName}
            </th>
        )

    }
    return (
        <>
            <th colSpan={2}>
                {entity.title}
            </th>
            <th colSpan={3}>
            {entity.subtitle}
            </th>
        </>
    )
}

function VisibilityToggle({groupKey, visible}:{
    groupKey: string;
    visible: boolean;
}) {
    const dispatch = useAppDispatch();
    const clickHandler = () => {
        dispatch(toggleShowGroup({groupKey: groupKey, show: !visible}))
    }

    const btnClassName = classNames(
        'btn btn-sm',
        {
            'btn-outline-secondary': !visible,
            'btn-outline-primary': visible,
        }
    )
    const iconClassName = classNames(
        {
        'bi-caret-right': !visible,
        'bi-caret-down-fill': visible,
    })

    return (
        <button type="button" className={btnClassName} onClick={clickHandler}>
            <span className={iconClassName} />
        </button>
    )
}

export default function ReportTableGroup({group}: {
    group: B2BTotalGroup
}) {
    const visibility = useAppSelector(selectVisibility);
    const allVisible = useAppSelector(selectShowAllDetail);
    return (
        <tbody>
        <tr>
            <td><VisibilityToggle groupKey={group.key} visible={visibility[group.key]} /></td>
            <ReportTableTitles entity={group.entity}/>
            <GroupTotalCols count={group.data.length} totals={group.totals}/>
        </tr>
        {(allVisible || visibility[group.key]) && group.data.map(row => (
            <ReportOrderRow key={row.SalesOrderNo} so={row}/>
        ))}
        </tbody>
    )
}
