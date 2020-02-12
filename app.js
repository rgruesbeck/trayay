import React from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from '@trayio/builder-squad-event-emitter';


// App
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'Ron',
            time: Date.now(),
            connectors: [],
            list: []
        };
    }

    // update with new connectors
    static getDerivedStateFromProps(nextProps, prevState) {
        // generate id
        let id = Math.random().toString(16).slice(2);
        let newConnector = nextProps['data-tray'];

        // make sure new connector has both coords and connector properties
        if (newConnector && newConnector.coords && newConnector.connector) {
            return {
                connectors: [
                    ...prevState.connectors,
                    {
                        ...newConnector,
                        id: id
                    }
                ]
            }
        } else {
            return null;
        }
    }


    // handle dropping a connector into the interest list
    handleDrop(event) {
        let id = event.dataTransfer.getData("text");
        let connector = this.state.connectors.find(c => c.id === id)

        this.setState({
            list: [
                ...this.state.list,
                connector
            ],
            connectors: this.state.connectors
                        .filter(c => c.id != id)
        })
    }

    render() {
        return (
            <div>
                <Title name={this.state.name} />
                <Time time={this.state.time}/>
                <ConnectorVisualizer
                    connectors={this.state.connectors}
                />
                <ConnectorList
                    connectors={this.state.list}
                    handleDrop={(event) => { this.handleDrop(event) }}
                />
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
const ConnectorVisualizer = ({ connectors }) => {
    let style = {
        position: 'relative',
        width: '1000px',
        height: '1000px',
        border: 'dotted thin black'
    };

    return (
        <div style={style}>
            { connectors && connectors.map(c => {
                return <Connector
                key={c.id}
                id={c.id}
                coords={c.coords}
                connector={c.connector}
                />
            })}
        </div>
    );
}

// List
// list of selected connectors
const ConnectorList = ({ connectors, handleDrop }) => {
    let style = {
        border: 'dotted thin black',
        height: '100px'
    }
    return (
        <ul style={style}
            onDrop={handleDrop}
            onDragOver={(event) => { event.preventDefault();} }>
            { connectors && connectors
            .map((c, idx) => {
                return <li key={idx}>{c.connector.name}</li>
            })}
        </ul>
    )
}

// Connector
// connector commponent
const Connector = ({ id, coords, connector }) => {
    let style = {
        position: 'absolute',
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        border: 'dotted thin black',
        padding: '25px'
    }
    return <img
            id={id}
            src={connector.iconURL}
            draggable="true"
            onDragStart={(event) => {
                event.dataTransfer.setData("text", event.target.id)
            }}
            style={style}>
            </img>
}

// render app
ReactDOM.render(
    <EventEmitter>
        <App/>
    </EventEmitter>,
    document.getElementById('root')
);