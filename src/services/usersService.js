const url = "https://floating-fortress-59246.herokuapp.com/users";

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
    try {
        const res = await fetch(`${url}?email=${userData.email}&password=${userData.password}`);
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
}

export const getCurrentUser = async (userID) => {
    try {
        const res = await fetch(`${url}/${userID}`);
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

export const update = (userID, userData) => {
    return fetch(`${url}/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
}

export const deleteUser = (userID) => {
    return fetch(`${url}/${userID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}