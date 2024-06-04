const db = require("../db")

class QueueController {
  async createTicket(req, res) {
    const {
      session_id,
      student_id,
      user_surname,
      ticket_request,
    } = await req.body

    // let selectedSessionTickets = await db.query('SELECT * FROM queue_tickets WHERE session_id = $1', [session_id])

    // const selectedSessionTicketsAmount = selectedSessionTickets.rows.length
    
    // console.log(selectedSessionTicketsAmount);

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

    const rawTicketsData = await db.query('SELECT * FROM queue_tickets WHERE session_id = $1 AND is_ticket_closed = false', [session_id])

    const students = await db.query('SELECT * FROM users WHERE user_type = 1')

    const tickets = []
    

    function buildTickets() {
      rawTicketsData.rows.forEach(async (ticket) => {
        const student = await students.rows.find(student => +student.id === +ticket.student_id);

        tickets.push({
          ...ticket,
          user_name: student.user_name,
          user_surname: student.user_surname,
          user_group: student.user_group,
        });
      })
    }
    await buildTickets()

    res.json(tickets);
  }
  async moveTicketToEnd(req, res) {
    try {
      const {
        session_id,
        ticket_id,
      } = await req.body
      let lastTicketPosition = await db.query('SELECT MAX(ticket_position) FROM queue_tickets WHERE session_id = $1', [session_id])
      
      lastTicketPosition = lastTicketPosition.rows[0].max + 1

      await db.query('UPDATE queue_tickets SET ticket_position = $1 WHERE id = $2 AND session_id = $3', [lastTicketPosition, ticket_id, session_id])

      res.status(200).send('Тикет успешно перемещён в конец очереди!')
    } catch (e) {
      console.log('Что-то пошло не так', e)
      res.status(400).send('Ошибка перемещения тикета в конец очереди')
    }
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