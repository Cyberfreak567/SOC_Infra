import React from 'react';

const courses = [
  {
    id: 1,
    title: 'React',
    description: 'Build modern frontend apps using React, hooks and components.',
    instructor: 'Relearn Team'
  },
  {
    id: 2,
    title: 'Cybersecurity',
    description: 'Learn ethical hacking, SOC operations, and security defense.',
    instructor: 'Relearn Team'
  },
  {
    id: 3,
    title: 'DevOps',
    description: 'Master Docker, CI/CD, Kubernetes, Nginx and deployments.',
    instructor: 'Relearn Team'
  },
  {
    id: 4,
    title: 'MongoDB',
    description: 'Understand NoSQL, schema design, indexing and aggregation.',
    instructor: 'Relearn Team'
  }
];

const Courses = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Courses</h2>

      <div style={styles.grid}>
        {courses.map(course => (
          <div key={course.id} className="course-card" style={styles.card}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p style={{ opacity: 0.8 }}>Instructor: {course.instructor}</p>
          </div>
        ))}
      </div>

      <style>{`
        .course-card {
          transition: all 0.3s ease;
        }
        .course-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '60px 20px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff'
  },
  heading: {
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '40px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '30px',
    maxWidth: '1100px',
    margin: '0 auto'
  },
  card: {
    background: 'rgba(255,255,255,0.15)',
    padding: '25px',
    borderRadius: '16px',
    cursor: 'pointer'
  }
};

export default Courses;

