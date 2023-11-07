export const initialState={
    openloginmodal:false

}
const reducer=(state,action)=>{
    switch(action.type){
        case "OPEN_LOGIN_MODAL":
            return {
                ...state,
                openloginmodal:true
            }
        case "CLOSE_LOGIN_MODAL":
                return {
                    ...state,
                    openloginmodal:false
                }
            
        default: return{
            ...state
        }
    }
}
export default reducer;