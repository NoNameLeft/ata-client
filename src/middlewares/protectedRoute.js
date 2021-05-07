import React from "react";
import { Route, Redirect } from "react-router-dom";

import { toast } from 'react-toastify';

import auth from "./auth";
import * as messages from '../shared/messages';

export const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth.isAuthenticated().isAuth) {
                    return <Component {...props} />;
                } else {
                    toast.error(messages.ACCESS_DENIED_MESSAGE);
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};