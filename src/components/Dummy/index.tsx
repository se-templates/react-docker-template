import React from 'react'
import uuid from 'react-uuid'


interface Wrapper {
    identifier : string
    value : string
}

export class Dummy extends React.Component {

    state  = 0

    constructor(props : any) {
        super(props)

        this.state = 0
        
    }

    change = () => {
        
        let current_state = this.state

        this.state = 1000

        console.log("current_state", current_state)
        console.log("this.state",  this.state)


    }

    render() {
        return (
            <>
                <Parent></Parent>
            </>
        )
    }
}









type Entry = {
    identifier : string
}

class Parent extends React.Component<{},{ entries : Array<Entry> }> {

    state = {
        entries : []
    }

    createChild = () => {
        let entryList : Array<Entry> = this.state.entries
        entryList.push({  identifier : uuid() })
        this.setState({  entries : entryList })
    }

    deleteChild = (identifier : string) => {
        const index = this.state.entries.findIndex((e : Entry) => e.identifier === identifier)
        this.state.entries.splice(index, 1)
        this.setState({ entries : this.state.entries })
    }

    render() {
        return (
            <>
                {this.state.entries.map((entry : Entry) => {
                    console.log("rendering")
                    return <Child identifier={entry.identifier} deleteMeCallback={this.deleteChild} />
                })}
                <button onClick={this.createChild}>Create</button>
            </>
        )
    }
}






class Child extends React.Component<{ identifier : string, deleteMeCallback : Function }, { }> {

    render() {
        return (
            <>
                <span>{this.props.identifier}</span>
                <input type="text"></input>
                <button onClick={() => this.props.deleteMeCallback(this.props.identifier)}>Delete me!</button>
            </>
        )
    }


}