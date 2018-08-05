import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import { createStore ,applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { counter,addGUN,removeGUN ,addGUNAsync} from "./index.redux";

//react和redux建立连接的方式
//1.引入store 新建一个store
const store=createStore(counter,applyMiddleware(thunk))

function render(){
    //2.将store以组件属性的形式传递给子组件
    ReactDom.render(<App store={store} addGUN={addGUN} removeGUN={removeGUN} addGUNAsync={addGUNAsync} />,document.getElementById("root"))
}
render()

//3.外界用subscribe订阅render函数 状态变化即重新渲染整个界面
store.subscribe(render)

