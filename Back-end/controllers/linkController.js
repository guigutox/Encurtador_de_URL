const Link = require("../database/Link");
const shortid = require("shortid");

async function encurtar(req, res) {
  try {
    const original_link = req.body.originalLink;

    if (!original_link) {
      return res.status(400).json({ error: "Original link is required" });
    }

    const linkFinded = await Link.findOne({
      where: { original_link: original_link },
    });

    if (linkFinded) {
      return res.json({ short_link: linkFinded.short_link });
    } else {
      const shortId = shortid.generate();
      const newLink = await Link.create({
        original_link: original_link,
        short_link: shortId,
      });
      return res.json({ short_link: newLink.short_link });
    }
  } catch (error) {
    console.error("Error in /encurtar route:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function redirecionar(req, res) {
  try {
    const shortId = req.params.shortId;
    const linkFinded = await Link.findOne({ where: { short_link: shortId } });

    if (linkFinded) {
      return res.redirect(linkFinded.original_link);
    } else {
      return res.status(404).json({ error: "Link not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  encurtar,
  redirecionar,
};
