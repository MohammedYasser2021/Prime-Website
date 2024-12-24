
import { useSelector,useDispatch,TypedUseSelectorHook } from "react-redux";
import {AppDispatch,RootState}from './store/store'

export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector
export const useAppDispach=useDispatch<AppDispatch>