## Redux入门

### redux入门小demo

```javascript
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
```



### 手动实现 redux结合react使用

- 状态单独抽取出来 reducer

```javascript
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
```



- index引入store

```javascript
import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import { createStore } from "redux"
import { counter,addGUN,removeGUN } from "./index.redux";

//react和redux建立连接的方式
//1.引入store 新建一个store
const store=createStore(counter)

function render(){
    //2.将store以组件属性的形式传递给子组件
    ReactDom.render(<App store={store} addGUN={addGUN} removeGUN={removeGUN}/>,document.getElementById("root"))
}
render()

//3.外界用subscribe订阅render函数 状态变化即重新渲染整个界面
store.subscribe(render)
```

- app修改状态

```javascript
import React from "react"

class App extends React.Component{
    render(){
        //4.app内部通过属性获取store及相应的方法
        const store=this.props.store
        const addGUN=this.props.addGUN
        const removeGUN=this.props.removeGUN
        const num=store.getState()
        return(
            <div>
                <h1>现在有机枪{num}把</h1>
                //5.通过dispatch完成状态的修改
                <button onClick={()=>store.dispatch(addGUN())}>申请武器</button>
                <button onClick={()=>store.dispatch(removeGUN())}>上交武器</button>
            </div>
            )
    }
}

export default App
```

### redux处理异步

- 安装redux-thunk插件

```javascript
npm install redux-thunk --save
```

- 使用applyMiddleware开启thunk中间件

```javascript
const store=createStore(counter,applyMiddleware(thunk))
```

- 异步操作中Action可以返回函数，使用dispatch提交action

```javascript
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
```

### chorme中redux调试工具

- chrome搜素redux安装
- 新建store的时候判断window.devToolsExtension
- 使用compose结合thunk和window.devToolsExtension
- 调试窗的redux选项卡，实时看到state



### 使用react-redux

- npm install react-redux --save
- 忘记subscribe，记住reducer，action和dispatch即可
- react-redux提供provider和connect两个接口来连接
- index.js改写

```javascript
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
```

- app.js改写

```javascript
import React from "react"
import { connect }  from "react-redux"
import {addGUN,removeGUN,addGUNAsync} from "./index.redux";

const mapStatetoProps=(state)=>{
    return {num:state}
}
const actionCreators={ addGUN, removeGUN, addGUNAsync}

//2.connect负责从外部获取组建需要的参数
App=connect(mapStatetoProps,actionCreators)(App)

class App extends React.Component{
    render(){
        //4.app内部通过属性获取store及相应的方法
        return(
            <div>
                <h1>现在有机枪{this.props.num}把</h1>
                <button onClick={this.props.addGUN}>申请武器</button>
                <button onClick={this.props.removeGUN}>上交武器</button>
                <button onClick={this.props.addGUNAsync}>延迟发放武器</button>
            </div>
            )
    }
}

export default App
```

### connect装饰器的方法简化书写

- 运行npm run eject，package.json中显示全部的配置
- npm install  babel-plugin-transform-decorators-legacy --save 安装装饰器相关的插件
- 修改package.json配置 babel中添加配置

```javascript
"babel": {
    "plugins":["transform-decorators-legacy"]
  },
```

- app.js代码改编

```javascript
import React from "react"
import { connect }  from "react-redux"
import {addGUN,removeGUN,addGUNAsync} from "./index.redux";

@connect(
    //你要state什么属性 放到props里
    state=>({num:state}),
    //你要什么方法，放到props里，自动dispatch
    {addGUN , removeGUN, addGUNAsync}
)
class App extends React.Component{
    render(){
        //4.app内部通过属性获取store及相应的方法
        return(
            <div>
                <h1>现在有机枪{this.props.num}把</h1>
                <button onClick={this.props.addGUN}>申请武器</button>
                <button onClick={this.props.removeGUN}>上交武器</button>
                <button onClick={this.props.addGUNAsync}>延迟发放武器</button>
            </div>
            )
    }
}

export default App
```

