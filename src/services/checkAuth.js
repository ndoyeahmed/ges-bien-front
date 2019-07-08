import React from "react";
import {Redirect, Route} from "react-router-guard";

export const checkAuth = () => new Promise((resolve, reject) => {
    // some my own notification set up with Redux
    const storedUser = sessionStorage.getItem("userData");
    if (!storedUser) {
        // end of notification set-up
        reject(
          <Route>
            <Redirect to="/login" />
          </Route>
        );
    }
    resolve(true);
});
