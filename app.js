//jshint esversion:6

const express = require("express");

const ejs = require("ejs");

var _ = require("lodash");

let posts = [];

const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home.ejs", {
    startingContent: homeStartingContent,
    posts: posts,
  });
  
});

app.get("/about", function (req, res) {
  res.render("about.ejs", { aboutPage: aboutContent });
});
// below: (got my brained really twisted up on what was what, so I wanted to make a note to make sure i understood it. ) it's  a get reqest to specify directory of dynamic url. (to be able to utilize my title line in the url to reach that post on a separate page) params is used to store what comes afte ":". for each is just to loop through all my array items specified above, so I can grab what i need. "posts" comes from the name i assigned to my aray. "post" is just a variable (generally the singular of array name) to atach to key value i need woth a "." "_" is the accepted variable assigned to my lodash library, which i used to transform all strings to lower case w/ space and ignore capital and special characters. if statement is just to deternine if those values (title name, inputed url), after lower casing, are the same. last function is to dynamically render it with assigned ejs page (post.ejs), the following function is to declare what I want sent. pre colon is key(variable defined in destination page)- where it's going) , post colon is what i'm sending from this page) I could"ve done shorter with more efficient variable declaration. will refactor
app.get("/posts/:postName", function (req, res) {
  const requestFile = req.params.postName;
  posts.forEach(function (post) {
    const storedTitle = post.title;
    const urlLine = _.lowerCase((string = requestFile));
    const postHeader = _.lowerCase((string = storedTitle));
    // const truncTitle = post.title.substring(0, 101);
    // const truncContent = post.content.substring(0, 101);

    if (postHeader === urlLine) {
     res.render("post.ejs", {
       title: post.title,
       content: post.content
     })
      
    }
  });
});

app.get("/contact", function (req, res) {
  res.render("contact.ejs", { callMe: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose.ejs");
});

app.post("/compose.ejs", function (req, res) {
  const journalText = {
    title: req.body.titleLine,
    content: req.body.postBody,
  };
  posts.push(journalText);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
// app.get("/posts/:day", function (req, res) {
//   const requestFile = req.params.day;
//   posts.forEach(function (post) {
//     const storedTitle = post.title;

//     if (storedTitle === requestFile) {
//       console.log("Match found");
//     }
//   });
// });
