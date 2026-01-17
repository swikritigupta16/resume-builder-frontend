import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="text-center">
        <p className="text-light">
          Create a professional resume in minutes
        </p>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/builder")}
        >
          Create Resume
        </button>
      </div>
    </div>
  );
}

export default Home;
