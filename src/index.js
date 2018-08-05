//redux的导入
import {createStore} from "redux"
//创建counter
function counter(state=0,action) {
    switch (action.type){
        case "加机关枪":
            return state+1;
        case "减机关枪":
            return state-1;
        default :
            return 10;
    }
}
//1.createStore新建store, 将counter函数当作参数传递
const store=createStore(counter)
const init=store.getState()
console.log(init)

//2.dispatch派发事件 传递action 通过type修改state状态
store.dispatch({type:"加机关枪"})
store.dispatch({type:"减机关枪"})

//3.subscribe进行事件的监听 根据state状态的变化执行相应的操作
store.subscribe(listener)
function listener(){
    const current=store.getState()
    console.log(`现在有{current}把机关枪`)
}