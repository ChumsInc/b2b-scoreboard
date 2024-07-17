import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import alertsReducer from "../ducks/alerts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import reportState from "../ducks/report";

const rootReducer = combineReducers({
    alerts: alertsReducer,
    report: reportState,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.error', 'meta.arg.signal'],
        }
    })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export default store;
