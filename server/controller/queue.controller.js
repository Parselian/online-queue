const db = require("../db")

class QueueController {
  async createTicket(req, res) {
    const {
      session_id,
      student_id,
      user_surname,
      ticket_request,
    } = await req.body

    let lastTicketPosition = await db.query('SELECT MAX(ticket_position) FROM queue_tickets WHERE session_id = $1', [session_id])

    const ticketAbbreviation = await `${user_surname.substring(0, 1).toUpperCase()}${!!lastTicketPosition.rows[0].max ? lastTicketPosition.rows[0].max : 1}`

    const newTicket = await db.query(
      'INSERT INTO queue_tickets (session_id, student_id, ticket_request, ticket_abbreviation) values ($1, $2, $3, $4) RETURNING *',
      [+session_id, +student_id, ticket_request, ticketAbbreviation])

    res.json(newTicket.rows[0])
  }
  async getSingleTicket(req, res) {
    const {student_id, session_id} = await req.query

    const ticket = await db.query('SELECT * FROM queue_tickets WHERE student_id = $1 AND session_id = $2 AND is_ticket_closed = false', [student_id, session_id])

    if (ticket.rows.length !== 1) return res.status(453).send('Тикет не найден!')

    const studentInfo = await db.query('SELECT * FROM users WHERE id = $1', [ticket.rows[0].student_id])

    res.json({...ticket.rows[0], user_name: studentInfo.rows[0].user_name, user_surname: studentInfo.rows[0].user_surname, user_group: studentInfo.rows[0].user_group})
  }
  async getNextOrderTicket(req, res) {
    const {session_id} = await req.query

    const ticket = await db.query('SELECT * FROM queue_tickets WHERE ticket_position = (SELECT MIN(ticket_position) FROM queue_tickets WHERE session_id = $1 AND is_ticket_closed = false)', [session_id])

    if (ticket.rows.length === 0) return res.status(452).send(`Session tickets not found.`)

    const studentInfo = await db.query('SELECT * FROM users WHERE id = $1', [ticket.rows[0].student_id])

    res.json({...ticket.rows[0], user_name: studentInfo.rows[0].user_name, user_surname: studentInfo.rows[0].user_surname, user_group: studentInfo.rows[0].user_group})
  }
  async closeTicket(req, res) {
    const {ticket_id} = await req.body

    const closableTicket = await db.query('UPDATE queue_tickets SET is_ticket_closed = true WHERE id = $1', [ticket_id])
    res.json(closableTicket.rows[0])
  }
  async getQueueTickets(req, res) {
    const {session_id} = await req.query

    const queueTickets = await db.query('SELECT * FROM queue_tickets WHERE session_id = $1 AND is_ticket_closed = false', [session_id])

    res.json(queueTickets.rows)
  }
  async clearQueue(req, res) {
    try {
      const {session_id} = await req.query
      const deletedTickets = await db.query('DELETE FROM queue_tickets WHERE session_id = $1', [session_id])

      res.json(deletedTickets)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new QueueController()