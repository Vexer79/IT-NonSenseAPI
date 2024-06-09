const path = require("path");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbName = process.env.dbName;

const authRoutes = require("./routes/auth");
const appRoutes = require("./routes/feed");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/auth", authRoutes);
app.use("/feed", appRoutes);

app.get("/posts", (req, res, next) => {
    res.status(200).json([
        {
            title: "New Patch ",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis lorem ex, et vulputate magna dignissim ut. Nam et placerat tortor, eget ullamcorper justo. Quisque rutrum lacus et elit gravida, ut scelerisque mauris lobortis. Morbi varius nisl a hendrerit condimentum. Etiam mollis facilisis vestibulum. Donec erat tellus, accumsan et molestie ac, tempor ac neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc feugiat eu lectus in pulvinar. Aliquam erat volutpat. Curabitur arcu mi, dapibus a consectetur eu, bibendum nec turpis.",
            author: "Vexer69",
            createdAt: new Date().toISOString(),
        },
        {
            title: "New Patch",
            content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mattis lorem ex, et vulputate magna dignissim ut. Nam et placerat tortor, eget ullamcorper justo. Quisque rutrum lacus et elit gravida, ut scelerisque mauris lobortis. Morbi varius nisl a hendrerit condimentum. Etiam mollis facilisis vestibulum. Donec erat tellus, accumsan et molestie ac, tempor ac neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc feugiat eu lectus in pulvinar. Aliquam erat volutpat. Curabitur arcu mi, dapibus a consectetur eu, bibendum nec turpis.",
            author: "Vexer69",
            createdAt: new Date().toISOString(),
            game: "minecraft",
        },
    ]);
});

app.get("/games", (req, res, next) => {
    res.status(200).json([
        {
            id: "1",
            title: "Test Game g fd gnfdgndgf n gfn gfd ngf",
            pageUrl: "game/test",
            imageUrl: "image/games/game2.png",
        },
        {
            id: "2",
            title: "Test Game",
            pageUrl: "game/test",
            imageUrl: "image/games/game2.png",
        },
        {
            id: "3",
            title: "Test Game",
            pageUrl: "game/test",
            imageUrl: "image/games/game2.png",
        },
        {
            id: "4",
            title: "Test Game",
            pageUrl: "game/test",
            imageUrl: "image/games/game2.png",
        },
        {
            id: "5",
            title: "Test Game",
            pageUrl: "game/test",
            imageUrl: "image/games/game2.png",
        },
        {
            id: "6",
            title: "Test Game",
            pageUrl: "game/test",
            imageUrl: "image/games/game2.png",
        },
    ]);
});

app.get("/", (req, res, next) => {
    res.status(200).json({ hello: "world" });
});
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(process.env.MONGO_DB_URL, { dbName })
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
