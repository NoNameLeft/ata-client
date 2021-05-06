# Getting Started with Authentication Template App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

You need to open the `server` folder in integrated terminal and then run:

### `json-server --watch db.json --port 3004`

Starts JSON Server on port 3004.\
Now if you go to [http://localhost:3004/users](http://localhost:3004/users), you will get all available users.

## Login Users Data

There are three users in the `db.json` file.\
Below you can see the `unhashed` passwords for of them:

1. #### <ins>email</ins>: `test@example.com` <ins>password</ins>: `test`

2. #### <ins>email</ins>: `admin@admin.com` <ins>password</ins>: `admin`

3. #### <ins>email</ins>: `valid@user.com` <ins>password</ins>: `vuser`
