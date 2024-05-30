import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/Auth'
import AddCourse from './AddCourse'
import Layout from './Layout'
import Instructor from './instructorList'
import Courses from './Courses'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const AdminDashboard = () => {

const [auth,setAuth]=useAuth()
const navigate = useNavigate()
const [courses, setCourses] = useState([]);
  
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await axios.get('https://mern-2024-project.onrender.com/api/v1/course/get');
          setCourses(...courses, response.data.data);
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchCourses();
    }, []);

    const handleCourseAdded = (newCourse) => {
      setCourses([...courses, newCourse]); // Update the courses state with the new course
    };

  return (
   <Layout title={'Admin Dashboard'}>
    <div className='row' style={{flexWrap : 'nowrap'}}>
    <div className='col-md-5' style={{ backgroundColor: 'bisque' }}>
      <div className="card mt-2" style={{ backgroundColor: 'cadetblue' }} >
      <h2 className='text-center p-2'>Instructors</h2>
      </div>
    <Instructor></Instructor>
    </div>
    <div className='col-md-7'>
        <AddCourse onCourseAdded={handleCourseAdded}/>
      </div>
    </div>  
    <hr  style={{ borderTop: '1px solid black' }}/>  
    <Courses courses={courses}></Courses>
   </Layout>
  )
}

export default AdminDashboard
