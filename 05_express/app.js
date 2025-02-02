const express = require("express");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/static", express.static(__dirname + "/public"));

app.get("/", (request, response) => {
  //   response.send("hello express!!");

  /* render의 두번째 인자에서 
  index.ejs 에서 사용할 정보 전달 */
  response.render("index.ejs", {
    btns: ["apple", "banana"],
    isLogin: true,
    userInfo: {
      name: "ohjin",
      msg: "식사는 맛있게 하셨나요?!",
    },
  });
});

//라우팅
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, function () {
  console.log("http://localhost" + PORT);
});
