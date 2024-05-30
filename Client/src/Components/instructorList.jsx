import axios from "axios"
import { useAuth } from "../Context/Auth"
import { useState,useEffect} from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const Instructor = ()=>{
  const [instructor,setInstructor]=useState([])
  const [auth]=useAuth()
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()



  useEffect(() => {
    if (auth?.token) {
      getInstructor();
    }
  }, [auth?.token]);

const getInstructor = async()=>{
  try{
    const response = await axios.get(`https://mern-2024-project.onrender.com/api/v1/user/getAllInstructor`,{
  headers:{
    'Authorization':auth?.token
  }  
})
toast.success(response.data.message)
setInstructor(response.data.admin)
  }catch(err){
    toast.error(err.message)
    setInstructor([])
  }finally {
    setLoading(false);
  } 
}


if (loading) {
  return <div>Loading...</div>;
}

const handleOnClick=(instructorId)=>{
  navigate(`/lectures/${instructorId}`)
}
  
 
return (
  <div className="instructor-container">
    {instructor.length > 0 ? (
      instructor.map((i) => 
        <div className="instructor-card" key={i.id} onClick={()=> handleOnClick(i._id)} >
          <h1 className="card-title">{i.name}</h1>
        </div>
      )
    ) : (
      <div>No instructors available.</div>
    )}
  </div>
);
};


export default Instructor