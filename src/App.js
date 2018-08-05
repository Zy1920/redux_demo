import React from "react"
import { connect }  from "react-redux"
import {addGUN,removeGUN,addGUNAsync} from "./index.redux";

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
const mapStatetoProps=(state)=>{
    return {num:state}
}
const actionCreators={ addGUN, removeGUN, addGUNAsync}

//2.connect负责从外部获取组建需要的参数
App=connect(mapStatetoProps,actionCreators)(App)

export default App