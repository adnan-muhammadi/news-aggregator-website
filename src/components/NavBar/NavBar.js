import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import moment from "moment";
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import "../NavBar/NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setQuery,
  setSource,
  fetchArticles,
  setDate,
  setCategory,
} from "../../store/slices/articlesSlice";
import { availableSources , newsCategories , capitalize } from "../../config/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NavBar() {
  const dispatch = useDispatch();
  // Get the current location object
  const location = useLocation();

  // Extract the pathname from the location object
  const currentPath = location.pathname;

  const isPagePersonalized = /\/personalized/.test(currentPath);

  const [searchInputValue, setSearchInputValue] = useState("");

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState(availableSources[0]);
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [selectedCategory, setSelectedCategory] = useState(newsCategories[0]);

  const isSearchButtonDisabled = searchInputValue.trim() === "";
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(searchInputValue));
    dispatch(fetchArticles({ query: searchInputValue, source: selected.key, date: startDate }));
    // setSearchInputValue("");
  };

  // Handle the selection of a new source
  const handleSelectSource = (eventKey) => {
    const selectedSource = availableSources.find((source) => source.key === eventKey);
    setSelected(selectedSource);
    dispatch(setSource(selectedSource));
  };

  const handleSelectCategory = (eventKey) => {
    const selectedCategory = newsCategories.find(
      (category) => category === eventKey
    );
    setSelectedCategory(selectedCategory);
    dispatch(setCategory(selectedCategory));
  };

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setStartDate(formattedDate);
    dispatch(setDate(formattedDate));
  };

  useEffect(() => {
    dispatch(setSource(selected));
    dispatch(setDate(startDate));
    dispatch(setCategory(selectedCategory));
    dispatch(
      fetchArticles({
        query: searchInputValue,
        source: selected.key,
        category: selectedCategory,
        date: startDate,
      })
    );
    // dispatch(setQuery(''));
    // eslint-disable-next-line
  }, [dispatch, selected, selectedCategory, startDate]);

  return (
    <Navbar
      className="navbar"
      variant="light"
      data-bs-theme="light"
      bg="light"
      expand="lg"
      fixed="top"
      expanded={!isCollapsed}
    >
      <Navbar.Brand className="nav-brand" href="/">
        <img
          src={
            "./images/logo.jpg"
          }
          alt="Logo"
          className="logo"
        />
      </Navbar.Brand>
      {isCollapsed && (
        <Navbar.Toggle
          className="border-0 navbar-ham-color"
          aria-controls="basic-navbar-nav"
          data-bs-theme="dark"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      )}

      {!isCollapsed && (
        <IoCloseOutline
          size={40}
          className="close-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      )}
      {isPagePersonalized ? (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/personalized" className="active">
              Personalized News
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="active">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/personalized">
              Personalized
            </Nav.Link>
            <NavDropdown
              id="dropdown-basic-button"
              title={capitalize(selectedCategory)} // Display the selected source's name
              onSelect={handleSelectCategory} // Handle the selection event
              data-bs-theme="light"
            >
              {newsCategories.map((element, index) => (
                <NavDropdown.Item key={index} eventKey={element}>
                  {capitalize(element)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown
              id="dropdown-basic-button"
              title={selected.name} // Display the selected source's name
              onSelect={handleSelectSource} // Handle the selection event
              data-bs-theme="light"
            >
              {availableSources.map((element, index) => (
                <NavDropdown.Item key={index} eventKey={element.key}>
                  {element.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <div className="date-picker">
            <DatePicker selected={startDate} onChange={handleDateChange} />
          </div>
          <Form className="search-form" onSubmit={handleSubmit}>
            <FormControl
              type="text"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder="Explore news..."
              className="form-input color-white form-control-lg mt-lg-2 mt-md-2 mt-sm-2 mt-xl-0"
            />
            <Button
              onClick={handleSubmit}
              className="search-btn mt-lg-2 ml-2 mt-md-2 mt-sm-2 mt-xl-0"
              disabled={isSearchButtonDisabled}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}

export default NavBar;