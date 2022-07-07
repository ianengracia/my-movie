const connection = require("../config/database.config");

const mapper = require("../mappers/movie.mapper");

const findAll = async () => {
  const query = `SELECT * FROM view_movie vm ORDER BY vm.timestamp DESC`;

  try {
    const [result] = await connection.query(query);

    return mapper.mapResult(result);
  } catch (err) {
    throw new Error(err);
  }
};

const findAllContainingTitle = async (title) => {
  const query = `SELECT * FROM view_movie vm WHERE vm.title LIKE "%${title}%" ORDER BY vm.timestamp DESC`;

  try {
    const [result] = await connection.query(query);

    return mapper.mapResult(result);
  } catch (err) {
    throw new Error(err);
  }
};

const findById = async (id) => {
  const query = `SELECT * FROM view_movie vm WHERE vm.id = ?`;

  try {
    const [result] = await connection.query(query, [id]);

    return mapper.mapResult(result)[0];
  } catch (err) {
    throw new Error(err);
  }
};

const MOVIE_LABELS = [
  "title",
  "release_date",
  "runtime",
  "country",
  "genre",
  "production",
  "director",
  "cast",
  "poster",
  "summary",
  "user_id",
];

const insert = async (movie) => {
  const labels = MOVIE_LABELS.join(",");

  const query = `INSERT INTO movie (${labels}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  const params = [
    movie.title,
    movie.releaseDate,
    movie.runtime,
    movie.country,
    movie.genre,
    movie.production,
    movie.director,
    movie.cast,
    movie.poster,
    movie.summary,
    movie.user?.id,
  ];

  try {
    const [result] = await connection.query(query, params);

    if (result.insertId) return await findById(result.insertId);
    else return null;
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (movie) => {
  const sets = MOVIE_LABELS.map((label) => `${label} = ?`).join(",");

  let query = `UPDATE movie SET ${sets} WHERE id = ?`;

  const params = [
    movie.title,
    movie.releaseDate,
    movie.runtime,
    movie.country,
    movie.genre,
    movie.production,
    movie.director,
    movie.cast,
    movie.poster,
    movie.summary,
    movie.user?.id,
    movie.id,
  ];

  try {
    const [result] = await connection.query(query, params);

    if (result.affectedRows > 0) return await findById(movie.id);
    else return null;
  } catch (err) {
    throw new Error(err);
  }
};

const findAllByUserId = async (userId) => {
  const query = `SELECT * FROM view_movie vm WHERE vm.user_id = ?`;

  try {
    const [result] = await connection.query(query, [userId]);

    return mapper.mapResult(result);
  } catch (err) {
    throw new Error(err);
  }
};

const deleteByMovieId = async (movieId) => {
  let query = `UPDATE movie SET is_active = 0 WHERE id = ?`;

  try {
    const [result] = await connection.query(query, [movieId]);

    if (result.affectedRows > 0) return true;
    else return false;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  findAll,
  findAllContainingTitle,
  findById,
  insert,
  update,
  deleteByMovieId,
  findAllByUserId,
};
