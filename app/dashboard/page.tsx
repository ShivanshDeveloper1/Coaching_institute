import Link from "next/link";

const purchasedCourses = [
  { title: 'Chemistry for IIT-JEE', progress: '72%', status: 'In progress' },
  { title: 'CBSE Board Preparation', progress: '92%', status: 'Completed' },
  { title: 'Chemistry for NEET', progress: '64%', status: 'In progress' },
];

export default function DashboardPage() {
  return (
    <div className="container section-space dashboard-shell">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Student dashboard</h1>
        </div>
        <Link href="/courses" className="btn btn-primary">
          Explore more courses
        </Link>
      </section>

      <section className="stats-row">
        <div className="stat-card">
          <span>3</span>
          <small>Purchased courses</small>
        </div>
        <div className="stat-card">
          <span>2</span>
          <small>Upcoming classes</small>
        </div>
        <div className="stat-card">
          <span>87%</span>
          <small>Average progress</small>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <h3>My learning</h3>
            <Link href="/dashboard/courses">View all</Link>
          </div>

          <div className="course-list">
            {purchasedCourses.map((course) => (
              <div key={course.title} className="learning-item">
                <div>
                  <h4>{course.title}</h4>
                  <span className="status-tag">{course.status}</span>
                </div>
                <div className="progress-block">
                  <div className="progress-bar">
                    <span style={{ width: course.progress }} />
                  </div>
                  <strong>{course.progress}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <h3>Upcoming batches</h3>
          </div>

          <div className="batch-list">
            <div className="batch-item">
              <span className="batch-dot" />
              <div>
                <h4>Chemistry for JEE</h4>
                <p>Mon & Wed · 5:00 PM</p>
              </div>
            </div>
            <div className="batch-item">
              <span className="batch-dot" />
              <div>
                <h4>Board Revision</h4>
                <p>Tue & Thu · 4:30 PM</p>
              </div>
            </div>
            <div className="batch-item">
              <span className="batch-dot" />
              <div>
                <h4>NEET Chemistry</h4>
                <p>Sat · 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
