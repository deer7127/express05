const express = require("express");

const { singers } = require("./singers.json");

console.log(singers);

const app = express();

app.get("/", (req, res) => {
    res.send("Main Page")
})

app.get("/singers/:id.html", (req, res) => {
    const { id } = req.params;
    const result = singers.find(singers => {
        if (singers.id == id) {
            return true;
        }
    });
    console.log(result);
    if (!result) {
        res.send("<h1>404 - 找不到歌手</h1>")
    }
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        img{
            width: 100%;
        }
    </style>
    <title>歌手：${result.singer_name}</title>
</head>
<body>
    <h1>${result.singer_name}</h1>
    <h3>${result.singer_id}</h3>
    <img src="${result.singer_img}" alt="">
</body>
</html>`)
})

app.all("*", (req, res) => {
    res.send("<h1>404找不到</h1>");
})
app.listen(3000, () => {
    console.log("服務已啟動於 http://localhost:3000");
})