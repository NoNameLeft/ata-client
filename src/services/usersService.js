
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

export const login = async (userData) => {
    let userUrl = url + `?email=${userData.email}&password=${userData.password}`;

    try {
        const res = await fetch(userUrl);
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
}

export const getCurrentUser = async (userID) => {
    let userUrl = url + `?id=${userID}`;

    try {
        const res = await fetch(userUrl);
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
}

export const getAllUsers = async () => {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
}