const db = require("../db")

class UserController {
  async createUser(req, res) {
    const {
      login,
      user_name,
      user_surname,
      user_group,
      password,
      user_type
    } = req.body

    const existingPersons = await db.query('SELECT * FROM users WHERE login = $1', [login])

    if (existingPersons.rows.length > 0) return res.status(452).send(`Error! user with login ${login} already exists.`)

    const newPerson = await db.query(
      `INSERT INTO users (login, user_name, user_surname, user_group, password, user_type) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [login, user_name, user_surname, user_group, password, user_type])
    res.json(newPerson.rows[0])
  }
  async getSingleUser(req, res) {
    const {login, password} = await req.query
    const users = await db.query('SELECT * FROM users WHERE login = $1 AND password = $2', [login, password])

    if (users.rows.length !== 1) return res.status(453).send('Пользователь не найден!')

    res.json(users.rows[0])
  }
  async getUsers(req, res) {
    const users = await db.query('SELECT * from users')
    res.json(users.rows)
  }
  async updateUser(req, res) {
    const {
      id,
      login,
      user_name,
      user_surname,
      user_group,
      password
    } = req.body

    const user = await db.query('UPDATE users SET user_group = $1 WHERE id = $2 RETURNING *', [user_group, id])

    res.json(user.rows[0])
  }
  async deleteUser(req, res) {
    const id = await req.params.id
    const users = await db.query('DELETE FROM users WHERE id = $1', [id])

    res.json(users.rows[0])
  }
  async truncateTable(req, res) {
    try {
      await db.query('TRUNCATE users')
    } catch (e) {
      console.log(e)
    }
  }
  async updatePassword(req, res) {
    try {
      const {
        new_password,
        login,
      } = await req.body
      const response = await db.query('UPDATE users SET password = $1 WHERE login = $2 AND user_type != 2', [new_password, login])

      if (response.rowCount < 1) return res.status(452).send(`Error! User not found. check the correct spelling of your login.`)
      else res.status(200).send('OK')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new UserController()