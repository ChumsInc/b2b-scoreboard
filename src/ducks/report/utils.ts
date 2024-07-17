import {
    B2BGroupEntity,
    B2BGroupSort,
    B2BHistoryOrder,
    B2BHistoryUser, B2BSCGroupBy, B2BSortProps, B2BTotal,
    B2BTotalGroup,
    Customer, CustomerList,
    Salesperson, SalespersonList, UserList, VisibilityList
} from "../../types";
import Decimal from "decimal.js";
import dayjs from "dayjs";
import {ReportState} from "./index";

export const getDefaultMinDate = () => {
    const startDate = dayjs(new Date()).startOf('month');
    return startDate.add(startDate.toDate().getTimezoneOffset(), 'minutes').format('YYYY-MM-DD');
}

export const getDefaultMaxDate = () => {
    const endDate = dayjs(new Date()).endOf('month').startOf('day');
    return endDate.add(endDate.toDate().getTimezoneOffset(), 'minutes').format('YYYY-MM-DD');
}
export const newGroupTotal: B2BTotal = {
    cart: 0,
    open: 0,
    shipped: 0,
}

export const groupSorter = ({field, asc}: B2BGroupSort) => (a: B2BTotalGroup, b: B2BTotalGroup) => {
    const sortMod = asc ? 1 : -1;
    switch (field) {
        case 'name':
            return (
                groupName(a).toLowerCase() === groupName(b).toLowerCase()
                    ? (groupTotal(a.totals) - groupTotal(b.totals))
                    : (groupName(a).toLowerCase() > groupName(b).toLowerCase() ? 1 : -1)
            ) * sortMod;
        case 'account':
            return (
                groupAccount(a.entity).toLowerCase() === groupAccount(b.entity).toLowerCase()
                    ? (groupTotal(a.totals) - groupTotal(b.totals))
                    : (groupAccount(a.entity).toLowerCase() > groupAccount(b.entity).toLowerCase() ? 1 : -1)
            ) * sortMod;
        default:
            return (groupTotal(a.totals) - groupTotal(b.totals)) * sortMod;
    }
}

export function groupName(group: B2BTotalGroup): string {
    if (!group.entity) {
        return '';
    }
    if (isUser(group.entity)) {
        return `${group.entity.company}:${group.entity.name}`;
    }
    if (isSalesperson(group.entity)) {
        return `${repKey(group.entity)}:${group.entity.SalespersonName}`;
    }
    if (isCustomer(group.entity)) {
        return `${customerKey(group.entity)}:${group.entity.BillToName}`;
    }
    return `${group.entity.title}:${group.entity.subtitle}`;
}

export function groupAccount(entity:B2BGroupEntity):string {
    if (isUser(entity)) {
        return entity.company;
    }
    if (isSalesperson(entity)) {
        return repKey(entity);
    }
    if (isCustomer(entity)) {
        return customerKey(entity)
    }
    return '';
}

export function groupTotal(totals: B2BTotal): number {
    return new Decimal(totals.cart).add(totals.shipped).add(totals.open).toNumber();
}

export function isUser(entity: B2BGroupEntity): entity is B2BHistoryUser {
    return !!entity && (entity as B2BHistoryUser).userId !== undefined;
}

export function isCustomer(entity: B2BGroupEntity): entity is Customer {
    return !!entity && (entity as Customer).ARDivisionNo !== undefined;
}

export function isSalesperson(entity: B2BGroupEntity): entity is Salesperson {
    return !!entity && (entity as Salesperson).SalespersonNo !== undefined;
}


export function customerKey(props: Pick<B2BHistoryOrder, 'ARDivisionNo' | 'CustomerNo' | 'ShipToCode'>): string {
    const customerKey = `${props.ARDivisionNo}-${props.CustomerNo}`;
    if (!props.ShipToCode) {
        return customerKey;
    }
    return `${customerKey}/${props.ShipToCode}`;
}

export function repKey(props: Pick<B2BHistoryOrder, 'SalespersonDivisionNo' | 'SalespersonNo'>): string {
    return `${props.SalespersonDivisionNo}-${props.SalespersonNo}`;
}


const detailSorter = ({field, asc}: B2BSortProps) => (a: B2BHistoryOrder, b: B2BHistoryOrder): number => {
    const sortMod = asc ? 1 : -1;
    switch (field) {
        case 'OrderDate':
        case 'ShipExpireDate':
        case 'PromotedDate':
            return (
                dayjs(a[field] ?? new Date()).isSame(b[field] ?? new Date(), 'date')
                    ? (a.SalesOrderNo > b.SalesOrderNo ? 1 : -1)
                    : (dayjs(a[field] ?? new Date()).isAfter(b[field]) ? 1 : -1)
            ) * sortMod;
        case 'OrderTotal':
            return (Number(a[field]) - Number(b[field])) * sortMod;
        default:
            return (a.SalesOrderNo > b.SalesOrderNo ? 1 : -1) * sortMod;

    }
}

export function buildGroup(groupBy: B2BSCGroupBy, groupKey: string, rows:B2BHistoryOrder[]): B2BTotalGroup {
    const group: B2BTotalGroup = {
        key: groupKey,
        entity: null,
        totals: {
            cart: 0,
            open: 0,
            shipped: 0,
        },
        data: [],
    }

    switch (groupBy) {
        case 'CustomerNo':
            group.data = rows.filter(row => customerKey(row) === groupKey);
            break
        case 'UserId':
            group.data = rows.filter(row => row.users.map(u => u.userId).includes(+groupKey))
            break;
        case 'OrderDate':
            group.data = rows.filter(row => dayjs(row.OrderDate).isSame(groupKey, 'date'));
            break;
        case 'Rep':
            group.data = rows.filter(row => repKey(row) === groupKey);
            break;
        default:
            group.data = [...rows];
    }
    group.totals = group.data.reduce((pv, cv) => {
        const total = toTotal(cv);
        return {
            cart: new Decimal(pv.cart).add(total.cart).toString(),
            open: new Decimal(pv.open).add(total.open).toString(),
            shipped: new Decimal(pv.shipped).add(total.shipped).toString(),
        }
    }, {...newGroupTotal} as B2BTotal);

    return group;
}

function isCart(row: B2BHistoryOrder): boolean {
    return row.OrderStatus === 'Q';
}

function isShipped(row: B2BHistoryOrder): boolean {
    return row.OrderStatus === 'C';
}

function isOpen(row: B2BHistoryOrder): boolean {
    return !isCart(row) && !isShipped(row);
}


export function toTotal(row: B2BHistoryOrder): B2BTotal {
    return {
        cart: isCart(row) ? row.OrderTotal : 0,
        open: isOpen(row) ? row.OrderTotal : 0,
        shipped: isShipped(row) ? row.OrderTotal : 0,
    }
}

export function buildCustomerList(rows:B2BHistoryOrder[]):CustomerList {
    const customers:CustomerList = {};
    rows.forEach(row => {
        const key = customerKey(row);
        const {ARDivisionNo, CustomerNo, ShipToCode, BillToName} = row;
        if (!customers[key]) {
            customers[key] = {ARDivisionNo, CustomerNo, ShipToCode, BillToName};
        }
    })
    return customers;
}

export function buildRepList(rows:B2BHistoryOrder[]):SalespersonList {
    const reps:SalespersonList = {};
    rows.forEach(row => {
        const key = repKey(row);
        const {SalespersonDivisionNo, SalespersonNo, SalespersonName} = row;
        if (!reps[key]) {
            reps[key] = {SalespersonDivisionNo, SalespersonNo, SalespersonName: SalespersonName ?? ''};
        }
    })
    return reps;
}

export function buildUserList(rows:B2BHistoryOrder[]):UserList {
    const users:UserList = {};
    rows.forEach(row => {
        row.users.forEach(u => {
            const key = `${u.userId}`
            if (!users[key]) {
                users[key] = {...u};
            }
        })
    })
    return users;
}


export function buildDates(rows:B2BHistoryOrder[], field: keyof Pick<B2BHistoryOrder, 'OrderDate' | 'PromotedDate' | 'ShipExpireDate' | 'LastInvoiceDate'>):string[] {
    const dates:string[] = [];
    rows.forEach(row => {
        if (!!row[field] && !dates.includes(row[field])) {
            dates.push(row[field]);
        }
    })
    return dates;
}

export function buildGroups(state:ReportState):B2BTotalGroup[] {
    const groupTotals:B2BTotalGroup[] = [];
    switch (state.options.groupBy) {
        case 'UserId':
            Object.keys(state.users)
                .forEach(key => {
                    const group = buildGroup(state.options.groupBy, key, state.data);
                    group.entity = state.users[key];
                    groupTotals.push(group);
                });
            return groupTotals;
        case 'Rep':
            Object.keys(state.reps)
                .forEach(key => {
                    const group = buildGroup(state.options.groupBy, key, state.data);
                    group.entity = state.reps[key];
                    groupTotals.push(group);
                });
            return groupTotals;
        case 'CustomerNo':
            Object.keys(state.customers)
                .forEach(key => {
                    const group = buildGroup(state.options.groupBy, key, state.data);
                    group.entity = state.customers[key];
                    groupTotals.push(group);
                });
            return groupTotals;
        case 'none':
            const group = buildGroup(state.options.groupBy, '', state.data);
            groupTotals.push(group);
            return groupTotals;

    }
    return groupTotals;
}

export function buildVisibilityList(groups:B2BTotalGroup[]):VisibilityList {
    const list:VisibilityList = {};
    groups.forEach(g => {
        list[g.key] = false;
    })
    return list;
}

export function orderShipDate(row: B2BHistoryOrder): string|null {
    switch (row.OrderStatus) {
        case 'Q':
            return null;
        case 'C':
            return dayjs(row.LastInvoiceDate).format('MM/DD/YYYY');
        default:
            return dayjs(row.ShipExpireDate).format('MM/DD/YYYY');
    }
}
