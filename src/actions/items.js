export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function newList(newItems) {
    return {
        type: 'NEW_LIST',
        newItems
    };
}

export function disabledd(ans) {
    return {
        type: 'IS_DISABLED',
        ans
    };
}

export function fetchData(url) {
    return (dispatch) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)));
    };
}
