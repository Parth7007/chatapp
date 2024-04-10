const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const collection = require("./mongo");

const templatesPath = path.join(__dirname, '../tempelates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatesPath);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render('login');
});

app.get("/signup", (req, res) => {
    res.render('signup');
});

app.post("/signup", async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword
    };

    await collection.insertMany([data]);

    res.render("index");
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ username:req.body.username });

        if (check.password===req.body.password) {
            res.render("index");
        } else {
            res.send("Wrong Pass"); 
        }
    } catch (error) {
        res.send("Wrong Details")
    }
});

app.listen(3000, () => {
    console.log("Server Started");
});
