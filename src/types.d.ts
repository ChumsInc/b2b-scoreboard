export interface Customer {
    ARDivisionNo: string;
    CustomerNo: string;
    ShipToCode: string | null;
    BillToName: string;
}

export interface CustomerList {
    [key: string]: Customer;
}

export interface Salesperson {
    SalespersonDivisionNo: string;
    SalespersonNo: string;
    SalespersonName: string;
}

export interface SalespersonList {
    [key: string]: Salesperson;
}

export interface B2BHistoryUser {
    userId: number;
    email: string;
    name: string;
    company: string;
    userType: number;
}

export interface UserList {
    [key: string]: B2BHistoryUser;
}

export interface B2BHistoryUserAction {
    userId: number;
    action: string;
}

export interface B2BHistoryAction {
    action: string;
    CartName?: string;
    SalesOrderNo: string;
    ItemCode: string;
    QuantityOrdered: string | number;
    Comment: string | null;
    promo_code?: string;
    versionNo?: string;
    referrer?: string;
}

export interface B2BHistoryOrder {
    SalesOrderNo: string;
    OrderStatus: string;
    ARDivisionNo: string;
    CustomerNo: string;
    ShipToCode: string | null;
    BillToName: string;
    ShipToName: string;
    SalespersonDivisionNo: string;
    SalespersonNo: string;
    SalespersonName: string | null;
    OrderDate: string;
    PromotedDate: string | null;
    ShipExpireDate: string;
    LastInvoiceDate: string | null;
    OrderTotal: number | string;
    users: B2BHistoryUser[];
    userActions: B2BHistoryUserAction[];
    actions: B2BHistoryAction[]
}

export interface GenericGroup {
    title: string;
    subtitle: string;
}

export interface B2BSortProps {
    field: keyof Pick<B2BHistoryOrder, 'OrderDate' | 'ShipExpireDate' | 'SalesOrderNo' | 'PromotedDate' | 'CustomerNo' | 'OrderTotal'>
        | 'cartTotal' | 'openTotal' | 'shippedTotal';
    asc: boolean;
}

export type B2BGroupSortField ='name' | 'account' | 'OrderTotal';

export interface B2BGroupSort {
    field: B2BGroupSortField;
    asc: boolean;
}

export type B2BSCGroupBy = 'CustomerNo' | 'UserId' | 'OrderDate' | 'Rep' | 'Month' | 'OrderStatus' | 'none';

export interface B2BTotal {
    cart: number | string;
    open: number | string;
    shipped: number | string;
}

export type B2BGroupEntity = B2BHistoryUser | Customer | Salesperson | GenericGroup|null;

export interface B2BTotalGroup {
    key: string;
    entity: B2BGroupEntity;
    totals: B2BTotal;
    data: B2BHistoryOrder[];
}

export interface B2BLoadOptions {
    minDate: string;
    maxDate: string;
    userId?: string|number;
    arDivisionNo?: string;
    customerNo?: string;
}

export interface LoadOrdersResponse {
    params: unknown;
    orders: B2BHistoryOrder[]
}

export interface VisibilityList {
    [key:string]: boolean;
}
