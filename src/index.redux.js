const ADD_GUN="加机关枪"
const REMOVE_GUN="减机关枪"

//reducer
export function counter(state=0,action) {
    switch (action.type){
        case ADD_GUN:
            return state+1;
        case REMOVE_GUN:
            return state-1;
        default :
            return 10;
    }
}

//action creator
export function addGUN() {
    return {type:ADD_GUN}
}
//action creator
export function removeGUN() {
    return {type:REMOVE_GUN}
}

//延迟执行，拖两天再给
export function addGUNAsync() {
    //chunk插件的使用，这里可以返回函数
    return dispatch=>{
        setTimeout(()=>{
            //异步结束后，手动执行dispatch
            dispatch(addGUN())
        },2000)
    }
}