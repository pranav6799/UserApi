import {useNavigate} from 'react-router-dom'

const StartPage = () => {

const navigate = useNavigate()

const handleLoginClick = ()=>{
  navigate('/login  ')
}

const handleRegisterClick = ()=>{
  navigate('/register  ')
}


  return (
   
  <div className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabIndex={-1} role="dialog" id="modalSheet">
  <div className="modal-dialog" role="document">
    <div className="modal-content rounded-4 shadow">
      <div className="modal-header border-bottom-0">
        <h1 className="modal-title fs-5 ">Welcome to Course Scheduling</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
        <button type="button" className="btn btn-lg btn-primary" onClick={handleLoginClick}>Login</button>
        <button type="button" className="btn btn-lg btn-secondary" onClick={handleRegisterClick} >Register</button>
      </div>
    </div>
  </div>
</div>

   
  )
}

export default StartPage
