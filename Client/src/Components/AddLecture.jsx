// import axios from 'axios'
// import React from 'react'
// import toast from 'react-hot-toast'
// import { Select } from 'antd'; 
// import { useState,useEffect } from 'react'
// import { useAuth } from '../Context/Auth';
// import { useNavigate, useParams } from 'react-router-dom';

// const {Option} = Select


// const AddLecture = () => {

// const [courses,setCourses]=useState([])
// const [instructors,setInstructors]=useState([])
// const [course,setCourse]=useState(null)
// const[instructor,setInstructor]=useState(null)
// const[lectureName,setLectureName]=useState()
// const[date,setDate]=useState('')
// const[lecture,setLecture]=useState([])
// const navigate=useNavigate()
// const { courseId } = useParams()

// const [auth]= useAuth()

// useEffect(() => {
//   fetchCourses();
//   getInstructor();
//   if (courseId) {
//     fetchLectures(courseId);
//   }
// }, [courseId]);


//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get('https://mern-2024-project.onrender.com/api/v1/course/get',{
//         headers:{
//           'Authorization':auth?.token
//         }  
//       });
//       setCourses(response.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };
// // useEffect(()=>{
// //   fetchCourses()
// // },[])


// const getInstructor = async()=>{
//   try{
//     const response = await axios.get(`https://mern-2024-project.onrender.com/api/v1/user/getAllInstructor`,{
//   headers:{
//     'Authorization':auth?.token
//   }  
// })
// setInstructors(response.data.admin)
//   }catch(err){
//     toast.error(err.message)
//     setInstructors([])
//   }
// }

// // useEffect(()=>{
// //   getInstructor()
// // },[])

// const fetchLectures = async (courseId) => {
//   try {
//     const response = await axios.get(`https://mern-2024-project.onrender.com/api/v1/schedule/getSchedule/${courseId}`, {
//       headers: {
//         'Authorization': auth?.token
//       }
//     });
//     if (response.data.status) {
//       setLecture(prevLectures => [...prevLectures, response.data.schedule]);
//       toast.success('Lecture Added Successfully');
//       navigate(`/add-lecture/${course}`);
//     }
//   } catch (err) {
//     toast.error(err.message);
//   }
// }



// const handleCreate = async(e)=>{
//   e.preventDefault()
//   try{
//      const lectureData = {
//   lecture: lectureName,
//   course,
//   date,
//   instructor
// }

//     const response = await axios.post(`https://mern-2024-project.onrender.com/api/v1/schedule/add`,lectureData,{
//       headers:{
//         Authorization:auth?.token
//       }
//     })

//     if(response.data.status){
//       setLecture(response.data.schedule)
//       toast.success('Lecture Added Successfully')
//       navigate('/lecture')
//     }
//   }catch(err){
//     toast.error(err)
//   }
// }



//   return (
//  <div className='container'>   
// <div className='row'>
//   <div className="col-md-6">
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title text-center">Add Lecture</h5>
//         <form id="add-lecture-form" onSubmit={handleCreate}>
//         <Select bordered={false} placeholder='Select a category' size='large'  value={course} showSearch className='form-select mb-3' onChange={(value)=>{setCourse(value)}}>
//           {courses?.map((c)=> (<Option key={c._id} value={c._id}>{c.name}</Option>))}
//         </Select>
//           <div className="form-group">
//             <input type="text" className="form-control" id="lectureName" value={lectureName} onChange={(e)=> setLectureName(e.target.value)}placeholder="Enter Lecture Name" required />
//           </div>
//           <div className="form-group">
//             <input type="date" className="form-control" value={date} onChange={(e)=> setDate(e.target.value)}id="lectureDate" required />
//           </div>
//           <Select bordered={false} placeholder='Select a category' size='large' showSearch className='form-select mb-3' value={instructor} onChange={(value)=>{setInstructor(value)}}>
//           {instructors?.map((c)=> (<Option key={c._id} value={c._id}>{c.name}</Option>))}
//         </Select>
//           <button type="submit" className="btn btn-primary">Add Lecture</button>
//         </form>
//       </div>
//     </div>
//   </div>
//   <div className="col-md-6">
//           <h5 className="text-center">Lectures for {courseId && courses.find(c => c._id === courseId)?.name}</h5>
//           <div className="row">
//             {lecture.map(lecture => (
//               <div className="col-md-6" key={lecture._id}>
//                 <div className="card" style={{ width: '18rem', margin: '10px' }}>
//                   <div className="card-body">
//                     <h5 className="card-title">{lecture.lecture}</h5>
//                     <p className="card-text">Date: {new Date(lecture.date).toLocaleDateString()}</p>
//                     <p className="card-text">Instructor: {lecture.instructor.name}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AddLecture



import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useState, useEffect } from 'react'
import { useAuth } from '../Context/Auth'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from './Layout'

const { Option } = Select

const AddLecture = () => {
  const [courses, setCourses] = useState([])
  const [instructors, setInstructors] = useState([])
  const [course, setCourse] = useState(null)
  const [instructor, setInstructor] = useState(null)
  const [lectureName, setLectureName] = useState('')
  const [date, setDate] = useState('')
  const[lecture,setLecture]=useState([])
  const navigate = useNavigate()
  const{courseId}=useParams()
  const [auth] = useAuth()

  useEffect(() => {
    fetchCourses()
    getInstructors()
    if(courseId){  
      fetchLecture(courseId)
    }
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://mern-2024-project.onrender.com/api/v1/course/get', {
        headers: {
          'Authorization': auth?.token
        }
      })
      setCourses(response.data.data)
    } catch (err) {
      console.error(err)
    }
  }

  const getInstructors = async () => {
    try {
      const response = await axios.get('https://mern-2024-project.onrender.com/api/v1/user/getAllInstructor', {
        headers: {
          'Authorization': auth?.token
        }
      })
      setInstructors(response.data.admin)
    } catch (err) {
      toast.error(err.data.response.message)
      setInstructors([])
    }
  }

  


  const fetchLecture = async(courseId)=>{
try{
const response = await axios.get(`https://mern-2024-project.onrender.com/api/v1/schedule/getSchedule/${courseId}`)
if(response.data.status){
  setLecture(response.data.schedule)
}
}catch(err){
  console.log(err)
}
  }


  const checkAvailability = async () => {
    try {
      const response = await axios.post('https://mern-2024-project.onrender.com/api/v1/schedule/checkAvailability', {
        date,
        instructor,
      }, {
        headers: {
          Authorization: auth?.token
        }
      });

      return response.data.available;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };




  const handleCreate = async (e) => {
    e.preventDefault()
    const isAvailable = await checkAvailability();
    if (!isAvailable) {
      toast.error('Instructor is already assigned to a lecture on this date');
      return;
    }

    try {
      const lectureData = {
        lecture: lectureName,
        course,
        date,
        instructor
      }

      const response = await axios.post('https://mern-2024-project.onrender.com/api/v1/schedule/add', lectureData, {
        headers: {
          Authorization: auth?.token
        }
      })
      if(response.data.status){
        const newLecture = response.data.schedule;
        
      if (newLecture.course === courseId) {
        setLecture(prevLectures => [...prevLectures, newLecture]);
      }else{
        toast.success('Lecture Added Successfully')
      }

      setCourse(null)
        setLectureName('')
        setDate('')
        setInstructor(null)
      }
      
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <Layout>
    <div className='container'>
    <div className='row'>
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">Add Lecture</h5>
            <form id="add-lecture-form" onSubmit={handleCreate}>
              <Select
                bordered={false}
                placeholder='Select a course'
                size='large'
                value={course}
                showSearch
                className='form-select mb-3'
                onChange={(value) => setCourse(value)}
              >
                {courses.map((c) => (<Option key={c._id} value={c._id}>{c.name}</Option>))}
              </Select>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="lectureName"
                  value={lectureName}
                  onChange={(e) => setLectureName(e.target.value)}
                  placeholder="Enter Lecture Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  id="lectureDate"
                  required
                />
              </div>
              <Select
                bordered={false}
                placeholder='Select an instructor'
                size='large'
                showSearch
                className='form-select mb-3'
                value={instructor}
                onChange={(value) => setInstructor(value)}
              >
                {instructors.map((c) => (<Option key={c._id} value={c._id}>{c.name}</Option>))}
              </Select>
              <button type="submit" className="btn btn-primary">Add Lecture</button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-6">
          <h5 className="text-center">Lectures for {courseId && courses.find((c) => c._id === courseId)?.name}</h5>
          <div className="row">
            {lecture.map((lecture) => (
              <div className="col-md-6" key={lecture._id}>
                <div className="card" style={{ width: '18rem', margin: '10px' }}>
                  <div className="card-body">
                    <h5 className="card-title">{lecture.lecture}</h5>
                    <p className="card-text">Date: {new Date(lecture.date).toLocaleDateString()}</p>
                    <p className="card-text">Instructor: {lecture.instructor.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default AddLecture

