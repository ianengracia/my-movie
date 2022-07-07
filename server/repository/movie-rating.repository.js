const connection = require("../config/database.config");

const mapper = require("../mappers/movie-rating.mapper");

const findAll = async () => {
  const query = `SELECT * FROM movie_rating mr`;

  try {
    const [result] = await connection.query(query);

    return mapper.mapResult(result);
  } catch (err) {
    throw new Error(err);
  }
};

const findById = async (id) => {
  const query = `SELECT * FROM movie_rating mr WHERE mr.id = ?`;

  try {
    const [result] = await connection.query(query, [id]);

    return mapper.mapResult(result)[0];
  } catch (err) {
    throw new Error(err);
  }
};

const insert = async (rating) => {
  const query = `INSERT INTO movie_rating (movie_id, user_id, rating) VALUES (?, ?, ?);`;

  try {
    const [result] = await connection.query(query, [rating.movieId, rating.userId, rating.rating]);

    if (result.insertId) return await findById(result.insertId);
    else return null;
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (rating) => {
  let query = `UPDATE movie_rating mr SET mr.rating = ? WHERE mr.id = ? `;

  try {
    const [result] = await connection.query(query, [rating.rating, rating.id]);

    if (result.affectedRows > 0) return await findById(rating.id);
    else return null;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  findAll,
  insert,
  update,
};
