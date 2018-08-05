import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import { createStore ,applyMiddleware,compose } from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { counter} from "./index.redux";

//react和redux建立连接的方式
//1.引入store 新建一个store
const store=createStore(counter,compose(
    applyMiddleware(thunk)
))

//1.provider组建在应用最外层，传入store即可，只用一次
ReactDom.render(
    <Provider store={store}>
        <App  />
    </Provider>,
    document.getElementById("root")
)





