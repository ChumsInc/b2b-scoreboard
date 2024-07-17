import {
    B2BGroupSort,
    B2BHistoryOrder,
    B2BSCGroupBy,
    B2BSortProps,
    B2BTotalGroup, CustomerList,
    SalespersonList,
    UserList, VisibilityList
} from "../../types";
import {createReducer} from "@reduxjs/toolkit";
import {
    loadReportData,
    setDetailSort,
    setGroupBy,
    setGroupSort,
    setMaxDate,
    setMinDate,
    toggleShowAllDetail, toggleShowGroup
} from "./actions";
import {
    buildCustomerList, buildGroup,
    buildGroups,
    buildRepList,
    buildUserList, buildVisibilityList,
    getDefaultMaxDate,
    getDefaultMinDate,
    groupSorter
} from "./utils";

export interface ReportState {
    options: {
        minDate: string;
        maxDate: string;
        showAllDetail: boolean;
        groupBy: B2BSCGroupBy;
        groupSort: B2BGroupSort;
        sort:B2BSortProps;
    },
    status: 'idle'|'loading';
    data: B2BHistoryOrder[];
    groupTotals: B2BTotalGroup[];
    total: B2BTotalGroup;
    users: UserList;
    reps:SalespersonList;
    customers: CustomerList;
    dates: string[];
    visibility: VisibilityList;
}

const defaultGroupSort:B2BGroupSort = {
    field: 'name',
    asc: true,
}
const initialState = ():ReportState => ({
    options: {
        minDate: getDefaultMinDate(),
        maxDate: getDefaultMaxDate(),
        showAllDetail: false,
        groupBy: "UserId",
        groupSort: {
            field: 'OrderTotal',
            asc: false,
        },
        sort: {
            field: 'OrderTotal',
            asc: false,
        },
    },
    status: 'idle',
    data: [],
    groupTotals: [],
    total: {
        key: 'total',
        entity: {
            title: 'Grand Total',
            subtitle: '',
        },
        data: [],
        totals: {
            cart: 0,
            open: 0,
            shipped: 0,
        },
    },
    customers: {},
    dates: [],
    reps: {},
    users: {},
    visibility: {},
})

const reportState = createReducer(initialState, (builder) => {
    builder
        .addCase(setMinDate, (state, action) => {
            state.options.minDate = action.payload;
        })
        .addCase(setMaxDate, (state, action) => {
            state.options.maxDate = action.payload;
        })
        .addCase(toggleShowAllDetail, (state, action) => {
            state.options.showAllDetail = action.payload ?? !state.options.showAllDetail;
        })
        .addCase(setGroupBy, (state, action) => {
            state.options.groupBy = action.payload;
            state.groupTotals = buildGroups(state).sort(groupSorter(defaultGroupSort));
            state.visibility = buildVisibilityList(state.groupTotals);
        })
        .addCase(setGroupSort, (state, action) => {
            state.options.groupSort = action.payload;
        })
        .addCase(setDetailSort, (state, action) => {
            state.options.sort = action.payload;
        })
        .addCase(loadReportData.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loadReportData.fulfilled, (state, action) => {
            state.status = 'idle';
            state.data = action.payload;
            state.customers = buildCustomerList(action.payload);
            state.reps = buildRepList(action.payload);
            state.users = buildUserList(action.payload);
            state.groupTotals = buildGroups(state).sort(groupSorter(defaultGroupSort));
            state.visibility = buildVisibilityList(state.groupTotals);
            state.total = buildGroup('none', '', state.data);
        })
        .addCase(loadReportData.rejected, (state) => {
            state.status = 'idle';
        })
        .addCase(toggleShowGroup, (state, action) => {
            state.visibility[action.payload.groupKey] = action.payload.show ?? !state.visibility[action.payload.groupKey];
        })
});

export default reportState;
