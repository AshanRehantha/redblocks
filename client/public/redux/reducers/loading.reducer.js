"use strict";

import { isShowMainLoading } from "../../helper/common.helper";
import { commonConstants } from "../constants";

const INITIAL_STATE = { pendingRequests: [], show: false };

export function loadingSpinnerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case commonConstants.PENDING_ACTIONS:
            const pendingRequests = [...state.pendingRequests, action.payload];
            const isShow = isShowMainLoading(pendingRequests);
            return {
                pendingRequests: [...pendingRequests],
                show: isShow,
            };
        case commonConstants.REMOVE_PENDING_ACTIONS:
            state = {
                ...state,
                pendingRequests: state.pendingRequests.filter(
                    (item) => item !== action.payload,
                ),
            };

            if (
                !isShowMainLoading(state.pendingRequests) ||
                state.pendingRequests.length === 0
            ) {
                state = {
                    ...state,
                    show: false,
                };
            }

        return state;  
        
        case commonConstants.SYSTEM_ERROR:
            return INITIAL_STATE;      

    }
    return state;
}