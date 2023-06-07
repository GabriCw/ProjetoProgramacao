import { useNavigate } from "react-router"
import Card from "../../components/card/Card"
import NewPasswordInput from "../../components/newPasswordInput/newPasswordInput"
import "./styles.css"

const NewPasswordView = () => {
  
      const navigate = useNavigate()
  
      return <Card goToLogin={() => navigate(-1)}>
          <NewPasswordInput 
            goToLogin={() => navigate('/login')}
          />
      </Card>
  }

export default NewPasswordView