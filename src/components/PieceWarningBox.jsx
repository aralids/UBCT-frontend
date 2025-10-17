import { Alert } from "react-bootstrap";

const PieceWarningBox = ({ pieceChangedWarning }) => {
	let variant = "secondary";
	let message = "Waiting for updates on the piece...";

	if (pieceChangedWarning === false) {
		variant = "success";
		message = "The piece has NOT been changed since your login.";
	} else if (pieceChangedWarning === true) {
		variant = "danger";
		message =
			"The piece has been changed since your login. Please refresh the page to see the updated table!";
	}

	return (
		<Alert variant={variant} className="text-center">
			{message}
		</Alert>
	);
};

export default PieceWarningBox;
