const stats = [
  { label: 'Courses', value: '12' },
  { label: 'Leads', value: '48' },
  { label: 'Students', value: '20' },
  { label: 'Revenue', value: '₹4.2L' },
];

const enquiries = [
  { name: 'Aarav', course: 'Chemistry for JEE', status: 'New' },
  { name: 'Diya', course: 'CBSE Board Preparation', status: 'Contacted' },
  { name: 'Rohit', course: 'Chemistry for NEET', status: 'Qualified' },
];

export default function AdminPage() {
  return (
    <div className="container section-space admin-shell">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Admin area</p>
          <h1>Institute overview</h1>
        </div>
      </section>

      <section className="stats-row">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card admin-stat">
            <span>{stat.value}</span>
            <small>{stat.label}</small>
          </div>
        ))}
      </section>

      <section className="admin-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>Recent enquiries</h3>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.course}</td>
                  <td>
                    <span className="status-tag">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Quick actions</h3>
          </div>
          <div className="action-stack">
            <button type="button" className="btn btn-primary full-width">Add new course</button>
            <button type="button" className="btn btn-secondary full-width">Review payments</button>
            <button type="button" className="btn btn-secondary full-width">Manage leads</button>
          </div>
        </div>
      </section>
    </div>
  );
}
