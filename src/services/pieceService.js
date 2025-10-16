import axios from "axios";

/**
 * Fetches all pieces from the backend API.
 *
 * @returns {Promise<Array>} Resolves with an array of piece objects.
 * @throws Will rethrow any network or parsing error.
 */
const fetchPieces = async () => {
	try {
		const response = await axios.get("/api/pieces");
		return response.data;
	} catch (error) {
		console.error("Failed to fetch pieces:", error);
		throw error;
	}
};

/**
 * Sends an email related to a specific piece.
 *
 * @param {Object} piece - The piece data containing at least pieceId, newDate, and newNote.
 * @returns {Promise<Object>} Resolves with the backend's response data.
 * @throws Will rethrow any network or server error.
 */
const sendEmail = async (piece) => {
	const pieceObj = {
		pieceId: piece.pieceId,
		newDate: piece.newDate,
		externalNote: piece.newNote,
	};

	try {
		const response = await axios.post("/api/send-email-json", pieceObj, {
			headers: { "Content-Type": "application/json" },
		});
		return response.data;
	} catch (error) {
		console.error("Failed to send email:", error);
		throw error;
	}
};

/**
 * Retrieves the preview HTML for a specific piece from the backend API.
 *
 * @param {string|number} pieceId - The unique identifier of the piece.
 * @returns {Promise<Object>} Resolves with the parsed HTML preview data.
 * @throws Will rethrow any network, parsing, or server error.
 */
const getPreviewHTML = async (pieceId) => {
	try {
		const response = await axios.get(`/api/preview/${pieceId}`, {
			responseType: "text",
		});
		return JSON.parse(response.data);
	} catch (error) {
		console.error("Failed to get preview HTML:", error);
		throw error;
	}
};

export { fetchPieces, sendEmail, getPreviewHTML };
