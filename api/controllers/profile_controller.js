const getTest = (req, res, next) => {
  res.json({ msg: "Profile works" });
};

const getProfile = (req, res, next) => {
  res.json({ msg: "Profile works" });
};

const createProfile = (req, res, next) => {
  res.json({ msg: "Profile works" });
};

module.exports = { getTest, createProfile };
