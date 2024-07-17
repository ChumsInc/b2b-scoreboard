import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {B2BGroupSort, B2BHistoryOrder, B2BLoadOptions, B2BSCGroupBy, B2BSortProps} from "../../types";
import {RootState} from "../../app/configureStore";
import {selectDataLoading} from "./selectors";
import {fetchReportData} from "./api";

export const setMinDate = createAction<string>('report/options/setMinDate');
export const setMaxDate = createAction<string>('report/options/setMaxDate');
export const toggleShowAllDetail = createAction<boolean|undefined>('report/options/toggleShowAllDetail');
export const setGroupBy = createAction<B2BSCGroupBy>('report/options/setGroupBy');
export const setGroupSort = createAction<B2BGroupSort>('report/options/setGroupSort');
export const setDetailSort = createAction<B2BSortProps>('report/options/setSort');
export const toggleShowGroup = createAction<{groupKey: string; show: boolean|undefined}>('reports/data/toggleShowGroup');

export const loadReportData = createAsyncThunk<B2BHistoryOrder[], B2BLoadOptions>(
    'report/loadData',
    async (arg) => {
        return await fetchReportData(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !!arg.minDate && !!arg.maxDate && selectDataLoading(state) === 'idle';
        }
    }
)

