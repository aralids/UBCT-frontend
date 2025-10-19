import { Form, Dropdown } from "react-bootstrap";
import { usePiecesContext } from "../context/PiecesContext";
import { useState } from "react";

const TextInputFilter = ({ filterName }) => {
	const { handleFilterChange, filter } = usePiecesContext();
	const [inputValue, setInputValue] = useState(filter[filterName] || "");

	// Update the context whenever the input changes
	const handleChange = (value) => {
		setInputValue(value);
		handleFilterChange({
			...filter,
			[filterName]: value,
		});
	};

	return (
		<Form.Group>
			<Dropdown>
				<Dropdown.Toggle
					variant="secondary"
					id={`filter-dropdown-${filterName}`}
					style={{ width: "100%" }}
				>
					Filter
				</Dropdown.Toggle>

				<Dropdown.Menu style={{ padding: "0.5rem 1rem", width: 220 }}>
					<Form.Control
						type="text"
						placeholder="Type to filter..."
						value={inputValue}
						onChange={(e) => handleChange(e.target.value)}
					/>
				</Dropdown.Menu>
			</Dropdown>
		</Form.Group>
	);
};

export default TextInputFilter;
