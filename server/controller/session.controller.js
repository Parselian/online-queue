const db = require("../db")

class SessionController {
  async createSession(req, res) {
    const {
      session_name,
      creator_id,
    } = req.body

    console.log(req.body)
    const related_subject_id = await db.query('SELECT * FROM subjects WHERE responsible_user_id = $1', [creator_id])
    console.log(related_subject_id.rows[0].ID)

    const newSession = await db.query(
      `INSERT INTO sessions (session_name, creator_id, subject_id) values ($1, $2, $3) RETURNING *`,
      [session_name, creator_id, related_subject_id.rows[0].ID])

    res.json(newSession.rows[0])
  }

  async getSingleSession(req, res) {
    const {session_id} = await req.query
    const session = await db.query('SELECT * FROM sessions WHERE id = $1', [session_id])

    if (session.rows.length !== 1) return res.status(453).send('Пользователь не найден!')

    res.json(session.rows[0])
  }

  async getSessions(req, res) {
    const {
      user_type,
      user_id,
      selected_subject_id,
    } = await req.query

    let sessions = null

    if (+user_type === 2) {
      sessions = await db.query('SELECT * from sessions WHERE creator_id = $1 AND subject_id = $2', [user_id, selected_subject_id])
    } else {
      sessions = await db.query('SELECT * from sessions WHERE subject_id = $1', [selected_subject_id])
    }

    res.json(sessions.rows)
  }

  async getSubjects(req, res) {
    const {
      user_id,
      user_type,
    } = await req.query
    let subjectsList = null

    if (+user_type === 2) {
      subjectsList = await db.query('SELECT * FROM subjects WHERE responsible_user_id = $1', [user_id])
    } else {
      subjectsList = await db.query('SELECT * FROM subjects')
    }

    res.json(subjectsList.rows)
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