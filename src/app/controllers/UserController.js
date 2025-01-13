class UserContrller {
  index(req, res) {
    return res.status(200).json({ data: [] });
  }
}

module.exports = new UserContrller();
