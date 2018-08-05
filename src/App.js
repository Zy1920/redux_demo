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