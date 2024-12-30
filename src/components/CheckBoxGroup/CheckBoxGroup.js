import Form from "react-bootstrap/Form";

// CheckboxGroup Component
function CheckboxGroup({ title, items, selectedItems, onChange }) {
    return (
      <>
        <h4>{title}</h4>
        <Form className={`${title.toLowerCase().replace(" ", "-")} checkbox-group-container`}>
          {items.map((item) => (
            <div key={`default-${item}`} className="mb-3">
              <Form.Check
                type="checkbox"
                id={`default-${item}`}
                label={item}
                value={item}
                checked={selectedItems.includes(item)}
                onChange={() => onChange(item)}
              />
            </div>
          ))}
        </Form>
        <hr />
      </>
    );
  }

export default CheckboxGroup;