const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./database");
const sequelize = require("sequelize");
const shortid = require("shortid");

app.use(express.json());
app.use(cors());

connection.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((error) => {
    console.error("Unable to connect to the database:", error);
})

const Link = connection.define("links", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    original_link: {
        type: sequelize.STRING
    },
    short_link: {
        type: sequelize.STRING
    }
})

Link.sync({force: false}).then(() => {
    console.log("Tabela criada com sucesso");
})


app.post("/encurtar", async (req, res) => {
    try {
        const original_link = req.body.originalLink;

        if (!original_link) {
            return res.status(400).json({ error: "Original link is required" });
        }

        const linkFinded = await Link.findOne({ where: { original_link: original_link } });

        if (linkFinded) {
            return res.json({ short_link: linkFinded.short_link });
        } else {
            const shortId = shortid.generate();
            const newLink = await Link.create({ original_link: original_link, short_link: shortId });
            return res.json({ short_link: newLink.short_link });
        }
    } catch (error) {
        console.error("Error in /encurtar route:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

})

app.get("/:shortId", async (req, res) => {

    try{
    const shortId = req.params.shortId;
    const linkFinded = await Link.findOne({ where: { short_link: shortId } });

    if (linkFinded) {
        return res.redirect(linkFinded.original_link);
    } else {
        return res.status(404).json({ error: "Link not found" });
    }
}catch(error){
    return res.status(500).json({ error: "Internal server error" });
}

})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})