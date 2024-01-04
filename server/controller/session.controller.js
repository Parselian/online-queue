const db = require("../db")

class SessionController {
  async createSession(req, res) {
    const {
      session_name,
      creator_id,
    } = req.body

    const newSession = await db.query(
      `INSERT INTO sessions (session_name, creator_id) values ($1, $2) RETURNING *`,
      [session_name, creator_id])

    res.json(newSession.rows[0])
  }
  async getSingleSession(req, res) {
    const {session_id} = await req.query
    const session = await db.query('SELECT * FROM sessions WHERE id = $1', [session_id])

    if (session.rows.length !== 1) return res.status(453).send('Пользователь не найден!')

    res.json(session.rows[0])
  }
  async getSessions(req, res) {
    const sessions = await db.query('SELECT * from sessions')
    res.json(sessions.rows)
  }
  async deleteSession(req, res) {
    const id = await req.params.id
    const queue_items = await db.query('DELETE * FROM queue_items WHERE session_id = $1', [id])
    const session = await db.query('DELETE FROM sessions WHERE id = $1', [id])

    res.json({
      deleted_queue_items: queue_items.rows,
      deleted_session: session.rows[0]
    })
  }
  async truncateTable(req, res) {
    try {
      await db.query('TRUNCATE users')
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new SessionController()