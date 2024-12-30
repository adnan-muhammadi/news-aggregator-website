import React, { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import CheckboxGroup from "../CheckBoxGroup/CheckBoxGroup";
import { useDispatch, useSelector } from "react-redux";
import {
  setPreferredAuthors,
  setPreferredCategories,
  setPreferredSources,
  selectPreferredSources,
  selectPreferredCategories,
  selectPreferredAuthors,
  fetchPersonalizedArticles,
} from "../../store/slices/articlesSlice";
import { availableSources, capitalize, newsCategories } from "../../config/config";

const FilterSidebar = ({
  show,
  handleToggleSidebar,
}) => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.articles);

  const PreferredSources = useSelector(selectPreferredSources);
  const PreferredCategories = useSelector(selectPreferredCategories);
  const PreferredAuthors = useSelector(selectPreferredAuthors);
  
  const [selectedSources, setSelectedSources] = useState(PreferredSources);
  const [selectedAuthors, setSelectedAuthors] = useState(PreferredAuthors);
  const [selectedCategories, setSelectedCategories] = useState(PreferredCategories);

  const uniqueSources = [...new Set(availableSources.map((article) => article.name))];
  const uniqueAuthors = [...new Set(articles.map((article) => article.author))];
  const uniqueCategories = [...new Set(newsCategories.map((article) => capitalize(article)))];

  const updateSelections = (selected, setSelected, updateAction) => (item) => {
    const updatedSelections = selected.includes(item)
      ? selected.filter((i) => i !== item)
      : [...selected, item];
    setSelected(updatedSelections);
    dispatch(updateAction(updatedSelections));
    dispatch(fetchPersonalizedArticles())
  };

  return (
    <Offcanvas show={show} onHide={handleToggleSidebar} variant="light" data-bs-theme="light">
          <Offcanvas.Header closeButton data-bs-theme="light">
            <Offcanvas.Title>
              <h1>Personalized Filter</h1>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <hr />
          <Offcanvas.Body>
            <CheckboxGroup
              title="Filter By Sources"
              items={uniqueSources}
              selectedItems={selectedSources}
              onChange={updateSelections(selectedSources, setSelectedSources, setPreferredSources)}
            />
            <CheckboxGroup
              title="Filter By Authors"
              items={uniqueAuthors}
              selectedItems={selectedAuthors}
              onChange={updateSelections(selectedAuthors, setSelectedAuthors, setPreferredAuthors)}
            />
            <CheckboxGroup
              title="Filter By Categories"
              items={uniqueCategories}
              selectedItems={selectedCategories}
              onChange={updateSelections(selectedCategories, setSelectedCategories, setPreferredCategories)}
            />
          </Offcanvas.Body>
          <div className="offcanvas-footer-custom">
            <Button variant="primary" onClick={handleToggleSidebar}>
              Close
            </Button>
          </div>
        </Offcanvas>
  )
};

export default FilterSidebar;
