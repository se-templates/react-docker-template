import React, {forwardRef, useImperativeHandle, useRef, Ref} from 'react';

import { HomeContainer } from "./styles";

export class Home extends React.Component {

    constructor(props : any) {
        super(props)
    }
    
    render() {
        return (
            <>
                <HomeContainer>
                    HOME
                </HomeContainer>
            </>
        )
            
    }
}

