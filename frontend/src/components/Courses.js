import React from 'react';

const Courses = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Courses</h2>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>React</h3>
          <p>Modern frontend development with components, hooks, and routing.</p>
          <p><b>Instructor:</b> Relearn Team</p>
        </div>

        <div style={styles.card}>
          <h3>MongoDB</h3>
          <p>NoSQL database, aggregation, indexing, and backend integration.</p>
          <p><b>Instructor:</b> Relearn Team</p>
        </div>

        <div style={styles.card}>
          <h3>Cybersecurity</h3>
          <p>Ethical hacking, SOC, tools, attacks, and defense techniques.</p>
          <p><b>Instructor:</b> Relearn Team</p>
        </div>

        <div style={styles.card}>
          <h3>DevOps</h3>
          <p>Docker, CI/CD, Nginx, Kubernetes, and production deployment.</p>
          <p><b>Instructor:</b> Relearn Team</p>
        </div>
      </div>
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
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px'
  },
  card: {
    background: 'rgba(255,255,255,0.15)',
    padding: '25px',
    borderRadius: '16px',
    transition: '0.3s'
  }
};

export default Courses;


