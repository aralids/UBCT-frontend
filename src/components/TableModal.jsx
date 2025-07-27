import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
const TableModal = ({
	show,
	modalPiece,
	setModalPiece,
	modalConfirmChangesMode,
	setModalConfirmChangesMode,
	handleUncheckPiece,
	sendEmail,
}) => {
	if (!modalPiece) {
		return <></>;
	}

	const zeroPad = (num) => {
		return String(num).padStart(2, "0");
	};

	let newReclamationDate = new Date();
	const daysToAdd = modalPiece["claimingInterval"];
	newReclamationDate.setDate(newReclamationDate.getDate() + daysToAdd);
	const day = zeroPad(newReclamationDate.getDate());
	const month = zeroPad(newReclamationDate.getMonth() + 1); // months are 0-based
	const year = newReclamationDate.getFullYear();
	const [newDate, setNewDate] = useState(`${year}-${month}-${day}`);
	const [newNote, setNewNote] = useState(
		modalPiece["newNote"] ?? modalPiece["externalNote"]
	);

	if (modalConfirmChangesMode) {
		return (
			<>
				<Modal
					show={show}
					onHide={() => {
						setModalConfirmChangesMode(false);
					}}
				>
					<Modal.Header closeButton>
						<Modal.Title>Are you sure you want to save changes?</Modal.Title>
					</Modal.Header>
					<Modal.Footer>
						<Button
							variant="primary"
							onClick={() => {
								setModalConfirmChangesMode(false);
							}}
						>
							No
						</Button>
						<Button
							variant="primary"
							onClick={() => {
								//TODO: Make the following statement asynchronous.
								sendEmail({
									...modalPiece,
									newNote: newNote,
									newDate: newDate,
								});
								setModalPiece(null);
								setModalConfirmChangesMode(false);
							}}
						>
							Yes
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}

	return (
		<>
			<Modal
				show={show}
				onHide={() => {
					handleUncheckPiece(modalPiece);
					setModalPiece(null);
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title>Nächste Reklamation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Neues Datum eingeben: </Form.Label>
							<Form.Control
								type="date"
								defaultValue={newDate}
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
					<Button
						variant="primary"
						onClick={() => {
							//TODO: Make the following statement asynchronous.
							handleUncheckPiece(modalPiece);
							setModalPiece(null);
						}}
					>
						Abbrechen
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							setModalPiece({
								...modalPiece,
								newNote: newNote,
								newDate: newDate,
							});
							setModalConfirmChangesMode(true);
						}}
					>
						Speichern & Senden
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default TableModal;
