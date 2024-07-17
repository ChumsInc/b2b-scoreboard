import {RootState} from "../../app/configureStore";
import {Root} from "react-dom/client";
import {createSelector} from "@reduxjs/toolkit";
import {B2BLoadOptions} from "../../types";
import {groupSorter} from "./utils";

export const selectMinDate = (state:RootState) => state.report.options.minDate;
export const selectMaxDate = (state:RootState) => state.report.options.maxDate;
export const selectShowAllDetail = (state:RootState) => state.report.options.showAllDetail;
export const selectGroupBy = (state:RootState) => state.report.options.groupBy;
export const selectGroupSort = (state:RootState) => state.report.options.groupSort;
export const selectDetailSort = (state:RootState) => state.report.options.sort;

export const selectLoadOptions = createSelector(
    [selectMinDate, selectMaxDate],
    (minDate, maxDate):B2BLoadOptions => {
        return {minDate, maxDate}
    }
)

export const selectDataLoading = (state:RootState) => state.report.status;
export const selectReportData = (state:RootState) => state.report.data;
export const selectReportGroups = (state:RootState) => state.report.groupTotals;
export const selectReportTotal = (state:RootState) => state.report.total;
export const selectReportUsers = (state:RootState) => state.report.users;
export const selectReportReps = (state:RootState) => state.report.reps;
export const selectReportCustomers = (state:RootState) => state.report.customers;
export const selectReportDates = (state:RootState) => state.report.dates;
export const selectVisibility = (state:RootState) => state.report.visibility;

export const selectSortedGroups = createSelector(
    [selectReportGroups, selectGroupSort],
    (groups, sort) => {
        return [...groups].sort(groupSorter(sort));
    }
)
