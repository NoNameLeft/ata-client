import { Component } from 'react';
import './About.css';

export default class About extends Component {
    render() {
        return (
            <div className="about">
                <h1>Welcome to <span>ABOUT</span> page</h1>
                <h3>Current user has <span>{this.props.userStatus}</span> status!</h3>
            </div>
        );
    }
};