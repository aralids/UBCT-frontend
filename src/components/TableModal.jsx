import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
const TableModal = ({
	show,
	handleClose,
	unfulfilledOrders,
	orderIndex,
	handleReclaimAgainChange,
}) => {
	if (!unfulfilledOrders[orderIndex]) {
		return <></>;
	}
	const [day, month, year] =
		unfulfilledOrders[orderIndex]["naechsteReklamationDatum"].split(".");
	const [newDate, setNewDate] = useState(`${year}-${month}-${day}`);
	const [newNote, setNewNote] = useState(
		unfulfilledOrders[orderIndex]["externalNote"]
	);
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Nächste Reklamation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Neues Datum eingeben: </Form.Label>
							<Form.Control
								type="date"
								defaultValue={`${year}-${month}-${day}`}
								onChange={({ target }) => setNewDate(target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>External note: </Form.Label>
							<Form.Control
								type="text"
								defaultValue={newNote}
								onChange={({ target }) => setNewNote(target.value)}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							handleReclaimAgainChange(orderIndex, newNote, newDate);
							handleClose();
						}}
					>
						Änderungen speichern
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default TableModal;
