export function homeRouter(router) {
  router.get("/", async (req, res) => {
    try {
      res.send("OK");
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}
