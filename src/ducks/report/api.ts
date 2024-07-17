import {B2BHistoryOrder, B2BLoadOptions, LoadOrdersResponse} from "../../types";
import dayjs from "dayjs";
import {fetchJSON} from "chums-components";

export async function fetchReportData(options:B2BLoadOptions):Promise<B2BHistoryOrder[]> {
    try {
        const params = new URLSearchParams();
        params.set('minDate', dayjs(options.minDate).format('YYYY-MM-DD'));
        params.set('maxDate', dayjs(options.maxDate).format('YYYY-MM-DD'));
        if (options.userId) {
            params.set('userId', String(options.userId));
        }
        if (options.arDivisionNo) {
            params.set('arDivisionNo', options.arDivisionNo);
        }
        if (options.customerNo) {
            params.set('customerNo', options.customerNo);
        }
        const url = `/api/sales/b2b/order-history.json?${params.toString()}`;
        const res = await fetchJSON<LoadOrdersResponse>(url, {credentials: 'same-origin', cache: 'no-cache'});
        return res?.orders ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("loadReportData()", err.message);
            return Promise.reject(err);
        }
        console.debug("loadReportData()", err);
        return Promise.reject(new Error('Error in loadReportData()'));
    }
}
