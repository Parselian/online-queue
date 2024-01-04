const db = require("../db")

class QueueController {
  async createTicket(req, res) {
    const {
      session_id,
      student_id,
      user_surname,
      ticket_request,
    } = req.body

    let lastTicketPosition = await db.query('SELECT MAX(ticket_position) FROM queue_tickets WHERE session_id = $1', [session_id])

    const ticketAbbreviation = await `${user_surname.substring(0, 1).toUpperCase()}${!!lastTicketPosition.rows[0].max ? lastTicketPosition.rows[0].max : 1}`
    console.log(ticketAbbreviation);

    const newSession = await db.query(
      'INSERT INTO queue_tickets (session_id, student_id, ticket_request, ticket_abbreviation) values ($1, $2, $3, $4) RETURNING *',
      [+session_id, +student_id, ticket_request, ticketAbbreviation])

    res.json(newSession.rows[0])
  }
  async getSingleTicket(req, res) {
    const {student_id} = await req.query
    const lastTicketPosition = await db.query('SELECT MAX(ticket_position) FROM queue_tickets WHERE session_id = 1')

    const ticket = await db.query('SELECT * FROM queue_tickets WHERE student_id = $1', [+student_id])

    if (ticket.rows.length !== 1) return res.status(453).send('Тикет не найден!')

    res.json(ticket.rows[0])
  }
  /*
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
  } */
}

module.exports = new QueueController()