import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import Layout from './Layout'
import Spinner from './Spinner'

const InstructorLectures = () => {
  const [lecture,setLecture]=useState([])
const {instructorId} = useParams()
const [loading,setLoading]=useState(true)

useEffect(()=>{
  fetchInstructorLectures()
},[])

const fetchInstructorLectures = async()=>{
  try{
      const response = await axios.get(`https://mern-2024-project.onrender.com/api/v1/schedule/getUserSchedule/${instructorId}`)
      if(response.data.status){
      setLecture(response.data.schedule)
      }
  }catch(err){
    toast.error(err)
  }finally{
    setLoading(false)
  }
}


  return (
    <Layout>
      <div className="lecture-container">
        {loading ? (
          <Spinner /> 
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

export default InstructorLectures
