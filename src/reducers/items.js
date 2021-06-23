export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS': {
            return action.items.sort((a,b) => a.id > b.id? 1: -1);
        }

        default:
            return state;
    }
}
