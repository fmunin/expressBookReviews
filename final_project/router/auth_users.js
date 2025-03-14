const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{'username':'frm','password':'mypassword'}];


// Function to check if the user is authenticated
const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validusers.length > 0;
};

const isUserDefined = (username)=>{ //returns boolean
//write code to check is the username is valid
let userFound = users.filter((user) => {
  return user.username === username;
});
return userFound.length > 0;
}



//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`username ${username} \ password: ${password}`);

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let isbn = req.params.isbn ;
  let book = books[isbn];
  let review = req.body.review ;
  let username = req.session.authorization.username ; 
  book.reviews = { "username": username, "password": review };
  return res.status(300).json(book);
});

module.exports.authenticated = regd_users;
module.exports.isUserDefined = isUserDefined;
module.exports.users = users;
