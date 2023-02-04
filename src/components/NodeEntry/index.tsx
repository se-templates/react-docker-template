import React from 'react'

type Prop = {
    callbackChange : Function,
    callbackDelete : Function,
    name : string,
    amount : number,
    identifier : string
}

type State = {
    name : string,
    amount : number,
    identifier : string,
    dirty : boolean
}

export class NodeEntry extends React.Component<Prop, State> {
    
    constructor(props : Prop) {
        super(props)
        this.state = {
            name : this.props.name,
            amount : this.props.amount,
            identifier : this.props.identifier,
            dirty : true
        }
    }

    changeName = (event: { target: { value: any } } ) => {
        this.setState({
            name : event.target?.value
        })
    }

    changeAmount = (event: { target: { value: any } }) => {
        this.setState({
            amount : Number(event.target?.value)
        })
    }

    submit = () => {
        console.log("Submit", this.state)
        this.setState({ dirty : false })
        this.props.callbackChange(this.state)
    }

    delete = () => {
        this.props.callbackDelete(this.state.identifier)
    }

    render() {
        return (
            <div>
                <label>
                    Beschreibung
                    <input type="text" readOnly={!this.state.dirty} onClick={() => this.setState({dirty : true})} value={this.state?.name} onChange={this.changeName}/>
                </label>
                <label>
                    Wert
                    <input type="text" readOnly={!this.state.dirty} value={this.state?.amount} onChange={this.changeAmount}/>
                </label>
                <button onClick={this.submit}>Fertig</button>
                <button onClick={this.delete}>Löschen</button>
            </div>
        )
    } 
}