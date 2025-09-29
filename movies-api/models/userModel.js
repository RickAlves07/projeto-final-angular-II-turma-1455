const db = require('../db');

const selectAll = db.prepare(`SELECT id, username, email, createdAt FROM users ORDER BY createdAt DESC`);
const selectById = db.prepare(`SELECT id, username, email, createdAt FROM users WHERE id = ?`);
const selectByIdWithPass = db.prepare(`SELECT * FROM users WHERE id = ?`);
const selectByEmail = db.prepare(`SELECT * FROM users WHERE email = ?`);

const insertUser = db.prepare(`
INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)
`);

function updateUserDynamic(id, data) {
  const fields = [];
  const params = [];

  if (data.username !== undefined) { fields.push(`username = ?`); params.push(data.username); }
  if (data.email !== undefined)    { fields.push(`email = ?`);    params.push(data.email); }
  if (data.password !== undefined) { fields.push(`password = ?`); params.push(data.password); }

  if (!fields.length) return selectById.get(id);

  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
  params.push(id);
  const stmt = db.prepare(sql);
  stmt.run(params);
  return selectById.get(id);
}

const deleteUserStmt = db.prepare(`DELETE FROM users WHERE id = ?`);

module.exports = {
  findAll: () => selectAll.all(),
  findById: (id) => selectById.get(id),
  findByIdWithPassword: (id) => selectByIdWithPass.get(id),
  findByEmail: (email) => selectByEmail.get(email),
  create: (user) => {
    insertUser.run(user.id, user.username, user.email, user.password);
    return selectById.get(user.id);
  },
  update: updateUserDynamic,
  remove: (id) => {
    const before = selectById.get(id);
    if (!before) return null;
    deleteUserStmt.run(id);
    return before;
  }
};
