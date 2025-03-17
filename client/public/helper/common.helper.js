"use strict";

import { loadingSelectArray } from "../redux/actions";

const isShowMainLoading = (subSetArray) => {
    return subSetArray.some((value) => {
        return loadingSelectArray.includes(value);
    });
};

export {
    isShowMainLoading
}