import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./PersonalizedPage.css";
import { useSelector } from "react-redux";
import { FilterSidebar, News } from "../../components";
import {
  selectPersonalizedArticles,
} from "../../store/slices/articlesSlice";

// PersonalizedPage Component
function PersonalizedPage() {
  const [show, setShow] = useState(false);

  const personalizedArticles = useSelector(selectPersonalizedArticles);


  const handleToggleSidebar = () => setShow((prevShow) => !prevShow);

  return (
    <>
      <div className="mt-500" style={{ marginTop: "120px", textAlign: "center" }}>
        <Button variant="primary" onClick={handleToggleSidebar}>
          Set Personalized News
        </Button>
      </div>
      <div style={{ marginTop: '-100px'}}>
        <News personalized={personalizedArticles} handleShowSidebar={handleToggleSidebar} />
        <FilterSidebar show={show} handleToggleSidebar={handleToggleSidebar}  />
      </div>
    </>
  );
}

export default PersonalizedPage;
