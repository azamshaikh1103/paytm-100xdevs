const Router = express.Router();

Router.get("/signup", (req, res) => {
  res.send("Create profile please !!! ");
});

Router.get("/signin", (req, res) => {
  res.send("Login please !!! ");
});

Router.get("/update", (req, res) => {
  res.send("Update profile !!! ");
});

export default Router;
