import React from 'react';

const courses = [
  {
    id: 1,
    title: 'React',
    description:
      'Build modern, fast, and scalable frontend applications using React, hooks, and component-based architecture.',
    instructor: 'Relearn Team'
  },
  {
    id: 2,
    title: 'Cybersecurity',
    description:
      'Learn ethical hacking, SOC operations, vulnerability analysis, and real-world cyber defense techniques.',
    instructor: 'Relearn Team'
  },
  {
    id: 3,
    title: 'DevOps',
    description:
      'Master CI/CD pipelines, Docker, Kubernetes, Nginx, and production-grade deployments.',
    instructor: 'Relearn Team'
  },
  {
    id: 4,
    title: 'MongoDB',
    description:
      'Understand NoSQL concepts, schema design, indexing, aggregation, and database optimization.',
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
            <h3 style={styles.title}>{course.title}</h3>
            <p style={styles.description}>{course.description}</p>
            <p style={styles.instructor}>
              Instructor: {course.instructor}
            </p>
          </div>
        ))}
      </div>

      {/* Hover effect */}
      <style>{`
        .course-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .course-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    padding: '60px 20px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '32px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '30px',
    maxWidth: '1100px',
    margin: '0 auto'
  },
  card: {
    background: 'rgba(255,255,255,0.12)',
    borderRadius: '16px',
    padding: '25px',
    backdropFilter: 'blur(10px)',
    cursor: 'pointer'
  },
  title: {
    fontSize: '22px',
    marginBottom: '10px'
  },
  description: {
    fontSize: '14px',
    lineHeight: '1.6',
    opacity: 0.9
  },
  instructor: {
    marginTop: '15px',
    fontSize: '13px',
    opacity: 0.8
  }
};

export default Courses;
