import { Form, Dropdown, Button } from "react-bootstrap";
import { usePiecesContext } from "../context/PiecesContext";

const DropdownFilter = ({ filterName }) => {
	const { handleFilterChange, filter } = usePiecesContext();
	const currentFilterList = filter[filterName] || [];

	const handleCheckAll = (checked) => {
		const updatedFilters = {
			...filter,
			[filterName]: currentFilterList.map((x) => ({
				...x,
				checked,
			})),
		};
		handleFilterChange(updatedFilters);
	};

	const toggleSingle = (label) => {
		const updatedFilters = {
			...filter,
			[filterName]: currentFilterList.map((x) =>
				x.label === label ? { ...x, checked: !x.checked } : x
			),
		};
		handleFilterChange(updatedFilters);
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
					<div className="d-flex flex-column justify-content-between align-items-center mb-2">
						<Button
							className="mb-2 w-100"
							variant="outline-danger"
							size="sm"
							onClick={() => handleCheckAll(false)}
						>
							Uncheck All
						</Button>
						<Button
							className="w-100"
							variant="outline-success"
							size="sm"
							onClick={() => handleCheckAll(true)}
						>
							Check All
						</Button>
					</div>

					<hr className="my-2" />

					{currentFilterList.length === 0 ? (
						<div className="text-muted text-center">No options available</div>
					) : (
						currentFilterList.map((f) => (
							<Form.Check
								key={`${filterName}-${f.label}`}
								type="checkbox"
								id={`filter-${filterName}-${f.label}`}
								label={f.label}
								checked={f.checked}
								onChange={() => toggleSingle(f.label)}
							/>
						))
					)}
				</Dropdown.Menu>
			</Dropdown>
		</Form.Group>
	);
};

export default DropdownFilter;
