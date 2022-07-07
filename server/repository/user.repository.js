const connection = require("../config/database.config");

const mapper = require("../mappers/user.mapper");

const findById = async (id) => {
  const query = `SELECT * FROM user u
                        WHERE u.id = ?`;

  try {
    const [result] = await connection.query(query, [id]);

    return mapper.mapResult(result)[0];
  } catch (err) {
    throw new Error(err);
  }
};

const findByUsername = async (username) => {
  const query = `SELECT * FROM user u
                    WHERE u.username = ?`;

  try {
    const [result] = await connection.query(query, [username]);

    return mapper.mapResult(result)[0];
  } catch (err) {
    throw new Error(err);
  }
};

const save = async (user) => {
  const query = "INSERT INTO user(name, avatar, username, password) VALUES (?, ?, ?, ?)";

  try {
    const [result] = await connection.query(query, [user.name, user.avatar, user.username, user.password]);

    return await findById(result.insertId);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  findById,
  findByUsername,
  save,
};
