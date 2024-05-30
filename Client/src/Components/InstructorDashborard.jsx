// import { useEffect, useState } from "react"
import { useEffect, useState } from "react"
import { useAuth } from "../Context/Auth"
import Layout from "./Layout"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import Spinner from "./Spinner"
const InstructorDashboard = ()=>{
  // const [lecture,setLecture]=useState([])
  const [auth]=useAuth()
const [userId,setUserId] = useState()
const [lecture,setLecture]=useState([])
const [loading,setLoading]=useState(true)

useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    try {
      if (userId) {
        const response = await axios.get(`https://mern-2024-project.onrender.com/api/v1/schedule/getUserSchedule/${userId}`);
        setLecture(response.data.schedule)
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false)
    }
  };

  fetchData();
}, [userId])

useEffect(() => {
  if (auth && auth.token) {
    try {
      // Decode the token to get the payload
      const decodedToken = jwtDecode(auth.token);

      // Extract the user ID from the payload
      const { id } = decodedToken; // Assuming the user ID is stored in the 'id' field

      // Set the user ID state
      setUserId(id);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}, [auth])


  
  return (
    <Layout>
   <div className="lecture-container">
        {loading ? (
          <Spinner /> // Display Spinner while loading is true
        ) : lecture.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 g-4 mt-2">
            {lecture.map((lectureItem) => (
              <div className="col mb-4" key={lectureItem._id}>
                <div className="card h-100 lecture-card">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">{lectureItem.course.name}</h5>
                    <h5 className="card-title">{lectureItem.lecture}</h5>
                    <p className="card-text">Date: {new Date(lectureItem.date).toLocaleDateString()}</p>
                    <p className="card-text">Instructor: {lectureItem.instructor.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="container text-center"><h1>No Lectures available.</h1></div>
        )}
      </div>
    </Layout>
  )
}

export default InstructorDashboard