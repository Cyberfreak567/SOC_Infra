import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchCourses = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${apiUrl}/api/courses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(res.data);
      } catch (err) {
        alert('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, [navigate]);

  return (
    <div>
      <h2>Courses</h2>
      <div className="courses">
        {courses.map(course => (
          <div key={course._id} className="course">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;