import React from 'react'
import {B2BHistoryUser} from "../../../types";
import classNames from "classnames";

export default function UserIcon({userType}:Pick<B2BHistoryUser, 'userType'>) {
    const className = classNames('me-3', {
        'bi-person-fill': userType === 1,
        'bi-people-fill': userType === 2,
        'bi-cart-fill': userType === 4,

    })
    return (
        <span className={className} />
    )
}
