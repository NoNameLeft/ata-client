
const url = "http://localhost:3004/users";

export const register = (userData) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
}

export const login = (userData) => {
    let userUrl = url + `?email=${userData.email}&password=${userData.password}`;

    return fetch(userUrl)
        .then(res => res.json())
        .catch(err => console.log(err));
}

export const loggedInStatus = (userID) => {
    let userUrl = url + `?id=${userID}`;

    return fetch(userUrl)
        .then(res => res.json())
        .catch(err => console.log(err));
}