const db = require('../db');

const selectAll = db.prepare(`SELECT * FROM movies ORDER BY createdAt DESC`);
const selectById = db.prepare(`SELECT * FROM movies WHERE id = ?`);

const insertMovie = db.prepare(`
INSERT INTO movies (
  id, title, genre, platform, imageLink, price, description, availableInStock
) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const deleteMovieStmt = db.prepare(`DELETE FROM movies WHERE id = ?`);

function updateMovieDynamic(id, data) {
  const fields = [];
  const params = [];

  const updatable = ['title','genre','platform','imageLink','price','description','availableInStock'];
  updatable.forEach(k => {
    if (data[k] !== undefined) {
      fields.push(`${k} = ?`);
      params.push(data[k]);
    }
  });

  if (!fields.length) return selectById.get(id);

  fields.push(`updatedAt = datetime('now')`);
  const sql = `UPDATE movies SET ${fields.join(', ')} WHERE id = ?`;
  params.push(id);
  const stmt = db.prepare(sql);
  stmt.run(params);
  return selectById.get(id);
}

module.exports = {
  findAll: () => selectAll.all(),
  findById: (id) => selectById.get(id),
  create: (movie) => {
    insertMovie.run(
      movie.id,
      movie.title,
      movie.genre,
      movie.platform,
      movie.imageLink ?? null,
      movie.price ?? 0,
      movie.description ?? null,
      movie.availableInStock ?? 0
    );
    return selectById.get(movie.id);
  },
  update: updateMovieDynamic,
  remove: (id) => {
    const before = selectById.get(id);
    if (!before) return null;
    deleteMovieStmt.run(id);
    return before;
  }
};
