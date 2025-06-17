import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const WarningModal = ({ show }) => {
	return (
		<Modal show={show}>
			<Modal.Header closeButton>
				<Modal.Title>Nächste Reklamation</Modal.Title>
			</Modal.Header>
			<Modal.Body></Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	);
};

export default WarningModal;
