import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

/*
App:
contains our visualizer board,
interesting connectors list,
timer, and connector sub-components
*/
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Ron',
            time: Date.now(),
            connectors: [
                {
                    coords: {
                        x: 100,
                        y: 100
                    },
                    connector: {
                        name: "test",
                        iconURL: "test",
                    }
                }
            ]
        };
    }

    render() {
        return (
            <div>
                <Title name={this.state.name} />
                <Time time={this.state.time}/>
                <ConnectorVisualizer connectors={this.state.connectors} />
                <ConnectorList connectors={this.state.connectors} />
            </div>
        );
    }
}

// Title
const Title = ({ name }) => {
    return <h1>{name}'s Visualizer</h1>
}

// Time
const Time = ({ time }) => {
    return <span>{time}</span>
}

// Visualizer
const ConnectorVisualizer = () => {
    let style = {
        width: '1000px',
        height: '400px',
        border: 'dotted thin black'
    };

    return (
        <div style={style}>visualizer</div>
    );
}

// List
// list of selected connectors
const ConnectorList = (connectors) => {
    let style = {
        border: 'dotted thin black',
        padding: '25px'
    }
    return (
        <ul style={style}>
            <li>connectors</li>
        </ul>
    )
}

// Connector
// connector commponent
const Connector = ({ coords, connector }) => {
    let style = {
        border: 'dotted thin black',
        padding: '25px'
    }
    return <span style={style}>{connector.name}</span>
}

// render app
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);