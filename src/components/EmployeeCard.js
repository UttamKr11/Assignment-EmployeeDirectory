import { Link } from "react-router-dom"

export const EmployeeCard = ({ employee }) => {
  return (

    <div className="employee-card">
      <div className="employee-portrait">
        <div className="avatar" aria-label="Employee avatar" >
          <Link to={`/employeeprofile/${employee.id}`}>
            <img src={`https://api.dicebear.com/10.x/initials/svg?seed=${employee.name}`} alt={employee.name} />
          </Link>
        </div>

      </div>

      <div className="employee-details">
        <Link to={`/employeeprofile/${employee.id}`}><h1>{employee.name}</h1></Link>

        <p className="detail-row">
          <span className="field">Email:</span>
          <span className="value">
            <a href={`mailto:${employee.email}`}>{employee.email}</a>
          </span>
        </p>

        <p className="detail-row">
          <span className="field">Phone:</span>
          <span className="value">{employee.phone}</span>
        </p>

        <p className="detail-row">
          <span className="field">Company:</span>
          <span className="value">{employee.company.name}</span>
        </p>

        <p className="detail-row">
          <span className="field">Website:</span>
          <span className="value website">
            <a href={`https://${employee.website}`} target="_blank" >
              {employee.website}
            </a>
          </span>
        </p>

        <p className="detail-row address-row">
          <span className="field">Address:</span>
          <span className="value">{employee.address.city}</span>
        </p>
      </div>
    </div >

  )
}
