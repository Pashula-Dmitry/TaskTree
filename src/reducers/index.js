import { combineReducers } from 'redux';
import { items } from './items';
import {newItems} from "./newItems";
import {disabledReducer} from "./disabled";

export default combineReducers({
    items,
    newItems,
    disabledReducer,
});
