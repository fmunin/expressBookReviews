const express = require('express');
let books = require("./booksdb.js");
let isUserDefined = require("./auth_users.js").isUserDefined;
let users = require("./auth_users.js").users;
const public_users = express.Router();



public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.query.username;
  const password = req.query.password;
  console.log(`registering user: ${username} - password: ${password}`);

  if (username && password) {
    if (!isUserDefined(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).send(JSON.stringify(books,null,4)); //UPDATED TO STRINGIFY
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn ;
  let book = books[isbn];
  return res.status(300).json(book);

 // return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author =req.params.author ;
  let result = Object.keys(books).find(key =>
    books[key].author === author);
  return res.status(300).json(books[result]);  
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title =req.params.title ;
  let result = Object.keys(books).find(key =>
    books[key].title === title);
  return res.status(300).json(books[result]);  
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn =req.params.isbn ;
  let book = books[isbn];
  return res.status(300).json(book.reviews);
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
