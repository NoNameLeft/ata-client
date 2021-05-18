import { Component } from "react";
import { Link } from "react-router-dom";

import { FaExclamationTriangle } from "react-icons/fa";

import './ErrorBoundary.css';
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <section className="error">
                    <h3>Error Page</h3>
                    <h1>4 <FaExclamationTriangle /> 4</h1>
                    <p>We are so sorry. Something went wrong.</p>
                    <p>{this.state.error && this.state.error.toString()}</p>
                    <Link to="/">Back To Home</Link>
                </section>
            )
        }

        return this.props.children
    }
}