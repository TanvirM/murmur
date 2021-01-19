export default (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                userData: action.payload
            };
        case 'UPDATE_FOLLOWER_DATA':
            return {
                ...state,
                follower: action.payload
            };
        default: return state;
    }
}