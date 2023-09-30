import { Link } from "react-router-dom"
import Users from './UsersPage'

function AdminPage() {
  return (
    <section>
        <h1>AdminPage</h1>
        <br/>
        <Users/>
        <br/>
        <p>You must have assigned Admin Role</p>
        <Link to='/'>Home</Link>
    </section>
  )
}

export default AdminPage