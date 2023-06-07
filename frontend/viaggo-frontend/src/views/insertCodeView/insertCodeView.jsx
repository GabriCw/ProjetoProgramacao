import { useNavigate } from "react-router"
import Card from "../../components/card/Card"
import InsertCodeInput from "../../components/insertCodeInput/insertCodeInput"
import "./styles.css"

const InsertCodeView = () => {
  
      const navigate = useNavigate()
  
      return <Card goToLogin={() => navigate(-1)}>
          <InsertCodeInput
          goToLogin={() => navigate('/newPassword')}
          />
      </Card>
  }

export default InsertCodeView