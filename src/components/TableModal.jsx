import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { usePiecesContext } from "../context/PiecesContext";
import PieceWarningBox from "./PieceWarningBox";

const TableModal = () => {
	const {
		modalPiece,
		handleSendEmail,
		handleCloseConfirmationModal,
		handleTogglePieceFlag,
		handleOpenConfirmationModal,
		modalConfirmChangesMode,
		pieceChangedWarning,
	} = usePiecesContext();

	if (!modalPiece) {
		return <></>;
	}

	const zeroPad = (num) => {
		return String(num).padStart(2, "0");
	};

	console.log("TableModal.jsx pieceChangedWarning: ", pieceChangedWarning);
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

	let tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	const tomorrowDay = zeroPad(tomorrow.getDate());
	const tomorrowMonth = zeroPad(tomorrow.getMonth() + 1); // months are 0-based
	const tomorrowYear = tomorrow.getFullYear();
	const tomorrowFormatted = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;

	if (modalConfirmChangesMode) {
		return (
			<>
				<Modal show={modalPiece !== null}>
					<Modal.Header>
						<Modal.Title>
							Möchten Sie die Änderungen wirklich speichern und eine E-Mail an
							den Lieferanten senden?
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{pieceChangedWarning === true ? (
							<PieceWarningBox pieceChangedWarning={pieceChangedWarning} />
						) : (
							<></>
						)}
						Bestellnummer: {modalPiece.poLineNumber}
						<br />
						DisplaySummary: {modalPiece.displaySummary}
						<br />
						<br />
					</Modal.Body>
					<Modal.Footer>
						<Button
							style={{ width: 100 }}
							variant="primary"
							onClick={() => handleCloseConfirmationModal()}
						>
							Nein
						</Button>
						<Button
							disabled={pieceChangedWarning !== false}
							variant="primary"
							style={{ width: 100 }}
							onClick={() =>
								handleSendEmail({
									...modalPiece,
									newNote: newNote,
									newDate: newDate,
								})
							}
						>
							Ja
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}

	return (
		<>
			<Modal
				show={modalPiece !== null}
				onHide={() => handleTogglePieceFlag(modalPiece, false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>Nächste Reklamation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<PieceWarningBox pieceChangedWarning={pieceChangedWarning} />
					Bestellnummer: {modalPiece.poLineNumber}
					<br />
					DisplaySummary: {modalPiece.displaySummary}
					<br />
					<br />
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Neues Datum eingeben: </Form.Label>
							<Form.Control
								type="date"
								min={tomorrowFormatted}
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
						onClick={() => handleTogglePieceFlag(modalPiece, false)}
					>
						Abbrechen
					</Button>
					<Button
						disabled={pieceChangedWarning !== false}
						variant="primary"
						onClick={() =>
							handleOpenConfirmationModal({
								...modalPiece,
								newNote: newNote,
								newDate: newDate,
							})
						}
					>
						Speichern & Senden
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default TableModal;
