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
    const {user_type, user_id} = await req.query
    let sessions = null

    if (+user_type === 2) {
      sessions = await db.query('SELECT * from sessions WHERE creator_id = $1', [user_id])
    } else {
      sessions = await db.query('SELECT * from sessions')
    }

    res.json(sessions.rows)
  }
  async deleteSession(req, res) {
    const {session_id} = await req.query

    const deleted_linked_tickets = await db.query('DELETE FROM queue_tickets WHERE session_id = $1', [session_id])
    const session = await db.query('DELETE FROM sessions WHERE id = $1', [session_id])

    res.json({
      deleted_queue_tickets: deleted_linked_tickets.rows,
      deleted_session: session.rows
    })
  }
}

module.exports = new SessionController()