import { useNavigate } from "react-router"
import HomePage from "../../components/homePage/HomePage"
import NavBar from "../../components/navBar/NavBar"
import SearchForm from "../../components/searchForm/SearchForm"

const HomePageView = () => {

    const navigate = useNavigate()

    return <div>
        <NavBar
            goToHome={() => navigate('/home')}
            goToLogin={() => navigate("/login")}
        />
        <SearchForm/>
        <HomePage />
    </div>
}

export default HomePageView
