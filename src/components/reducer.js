export const initialState = {
    openloginmodal: false,
    iserror: false,
    errorMessage: ""
}
const reducer = (state, action) => {
    switch (action.type) {
        case "OPEN_LOGIN_MODAL":
            return {
                ...state,
                openloginmodal: true
            }
        case "CLOSE_LOGIN_MODAL":
            return {
                ...state,
                openloginmodal: false
            }
        case "SHOW_ERROR":
            return {
                ...state,
                iserror: true,
                errorMessage: action.payload
            }
        case "REMOVE_ERROR":
            return {
                ...state,
                iserror: false,
                errorMessage: action.payload
            }

        default: return {
            ...state
        }
    }
}
export default reducer;