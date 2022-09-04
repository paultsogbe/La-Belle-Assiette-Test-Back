const express = require("express");
const cors = require("cors");
const app = express();
const port = 2001;
const { ChefsManager } = require("./managers/ChefsManager");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/chefs", async function (req, res) {
  const { firstname, lastname, description } = req.body;
  const photo =
    "https://www.jmw-vpc.com/blog/wp-content/uploads/2015/12/chef-750x350.jpg";
  const chefsManager = new ChefsManager({
    firstname,
    lastname,
    description,
    photo,
  });
  try {
    const json = await chefsManager.save();
    res.send(json);
  } catch (e) {
    console.error("Chef insertion error :");
    console.error(e);
  }
});

app.get("/chefs", async function (req, res) {
  const chefsManager = new ChefsManager();
  try {
    const json = await chefsManager.getChefs();
    // res.status(200).json(json);
    let sorted = json.sort(function (a, b) {
      const aFirstChar = a.firstname.charAt(0);
      const bFirstChar = b.firstname.charAt(0);
      if (aFirstChar > bFirstChar) {
        return 1;
      } else if (aFirstChar < bFirstChar) {
        return -1;
      } else {
        const aLastChar = a.lastname.charAt(0);
        const bLastChar = b.lastname.charAt(0);
        if (aLastChar > bLastChar) {
          return 1;
        } else if (aLastChar < bLastChar) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    console.log(sorted);
    res.status(200).json(sorted);
  } catch (e) {
    console.error("Error server");
    console.error(e);
  }
});

// **Delete**
app.post("/delete", async (req, res) => {
  const chefsManager = new ChefsManager();
  const chef = await chefsManager.getChefById({ _id: req.params.id });
  console.log(chef);
  console.log(chef._id.toString());
  try {
    if (chef) {
      await chef.delete();

      console.log(chef);

      res.json({ message: "Chef removed" });
    } else {
      res.status(400).json({ message: "Missing id" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **Update**
app.post("/update", async (req, res) => {
  const chefsManager = new ChefsManager();
  const chef = await chefsManager.getChefById({ _id: req.params.id });
  try {
    if (chef) {
      console.log(chef);
      chef.description = req.body.description;
      chef.firstname = req.body.firstname;
      chef.lastname = req.body.lastname;
      await chef.save();
      res.json(chef);
    } else {
      res.status(400).json({ message: "Missing parameter" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`LBA_usecase listening on port ${port}`);
});
