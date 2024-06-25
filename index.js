const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database/database.js");
const {encurtar , redirecionar} = require("./controllers/linkController");


connection.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((error) => {
    console.error("Unable to connect to the database:", error);
})

app.use(express.static("public"));
app.use(express.json());
app.use(cors());


//ROTAS
app.post("/encurtar", encurtar);

app.get("/:shortId", redirecionar);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})