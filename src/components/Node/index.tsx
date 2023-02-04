import React, { useState } from 'react';
import { Container } from '../../styles/global'
import uuid from "react-uuid";
import { NodeEntry } from '../NodeEntry';
import { Header, Body, Footer } from "./styles";

type State = {
    inputs : Array<Input>,
    output : number
    entries : Array<Entry>,
}

type Props = {
    identifier : string,
    name : string,
    notifyCallback : Function,
    inputs : Array<string>
}

interface Entry {
    identifier: string,
    name : string,
    amount : number
}

interface Input {
    identifier : string,
    amount: number | undefined
}

export class Node extends React.Component<Props, State> {

    state = {
        inputs : [],
        entries : [],
        output : 0
    }

    constructor(props : Props) {
        super(props)
        let currentInputs : Array<Input> = this.state.inputs
        props.inputs.forEach(input => currentInputs.push({ identifier: input, amount : undefined }))

        console.log("Node created!" , this.state)
    }

    updateInputValue = (inputDraft : Input) => {
        let inputToChange : Input = this.state.inputs.find((i : Input) => i.identifier === inputDraft.identifier)!
        
        if(inputToChange != undefined) {
            inputToChange.amount = inputDraft.amount
            this.setState({ inputs : this.state.inputs })
        }
    }    

    getOutput = () => {
        return this.state.output
    }

    addEntry = (entry : Entry) => {
        console.log("Node.addEntry -> entry received ->", entry)
        console.log("Node.addEntry -> state before ->", this.state)

        let entries : Array<Entry> = this.state.entries
        let thisEntry = entries.find(e => e.identifier === entry.identifier)
        
        console.log("Node.addEntry -> node entry found ->", thisEntry)

        if(thisEntry != undefined) {
            thisEntry.amount = entry.amount
            thisEntry.name   = entry.name

            this.setState({
                entries : entries
            }) 
        }

        console.log("Node.addEntry -> state after ->", this.state)
    }

    deleteEntry = (identifier : string) => {
        console.log("Node.deleteEntry -> identifier to delete ->", identifier)
        console.log("Node.deleteEntry -> state before ->", this.state.entries)
        //let index = this.state.entries.map((e : Entry) => e.identifier).indexOf(identifier)
        let index = this.state.entries.findIndex((entry : Entry) => entry.identifier === identifier)

        console.log("Node.deleteEntry -> found index ->", index)

        this.state.entries.splice(index, 1)

        this.setState({
            entries : this.state.entries
        })
        console.log("Node.deleteEntry -> state after ->", this.state.entries)
    }

    newEntry = () => {
        console.log("Node.newEntry -> state before -> ", this.state)
        let identifier = uuid()

        let entries : Array<Entry> = this.state.entries

        entries.push({
            identifier : identifier,
            name : "",
            amount : 0
        })

        this.setState({
            entries : entries
        })
        console.log("Node.newEntry -> state after -> ", this.state)
    }
    
    calculate = () => {
        /*
        let previous_output = this.state.output

        let amount : number = this.state.input
        let entry_sum : number = this.state.entries.reduce((sum, obj : Entry) => sum + obj.amount, 0)

        //console.log("Node.calculate -> amount -> ", amount)
        //console.log("Node.calculate -> entry_sum -> ", entry_sum)

        this.state.output = amount + entry_sum

        //console.log("Node.calculate -> this.state.output -> ", this.state.output)

        if(this.state.output != previous_output) {
            this.props.notifyCallback(this.props.identifier)
        }
        */

    }

    render() {
        {this.calculate()}
        return (
            <Container>
                <Header>
                    <span>{this.props.name}</span>
                    <span>PLACEHOLDER</span>
                </Header>
                <Body>
                    {this.state.entries.map((entry : Entry) => {
                        console.log("Node.render -> rendering entry -> ", entry)
                        return <NodeEntry name={entry.name} amount={entry.amount} identifier={entry.identifier} callbackChange={this.addEntry} callbackDelete={this.deleteEntry}/>
                    })}
                </Body>
                <Footer>
                <button onClick={this.newEntry}>Neu</button>
                <span>Output: {this.state.output}</span>
                </Footer>
            </Container>
        )        
    }





    

    


    
  
    

}



// TODO mal mit einzelnen umsätzen probieren