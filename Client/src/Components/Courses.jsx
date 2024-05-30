// import { useEffect ,useState} from 'react'
// import axios from 'axios';

import { useNavigate } from "react-router-dom"

  // eslint-disable-next-line react/prop-types
  const Courses = ({courses}) => {
    const navigate = useNavigate()
    
    const handleOnClick = (courseId)=>{
        navigate(`/add-lecture/${courseId}`)
    }

  return (
    <div className="container">
      <div className="row">
        {courses.map(course => (
          <div className="col-md-4" key={course._id}>
            <div className="card" style={{ width: '18rem', margin: '10px' }} onClick={()=> handleOnClick(course._id)}>
              <img 
                src={`https://mern-2024-project.onrender.com/${course.photo}`} 
                className="card-img-top" 
                alt={course.name} 
              />
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
                <p className="card-text">Level: {course.level}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses
