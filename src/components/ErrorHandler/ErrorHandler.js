import { Component } from "react";
import { Link } from "react-router-dom";

import { FaExclamationTriangle } from "react-icons/fa";

import './ErrorHandler.css';
class ErrorHandler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, info) {
        console.log('Error from errorHandler: ', error);
        console.log('Error info from errorHandler: ', info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <section className="error">
                    <h3>Error Page</h3>
                    <h1>4 <FaExclamationTriangle /> 4</h1>
                    <p>We are so sorry! Something must have went wrong! Please reload or try again later!</p>
                    <Link to="/">Back To Home</Link>
                </section>
            )
        }

        return this.props.children
    }
}

export default ErrorHandler;