import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef, useEffect } from "react";

import "./App.css";
import Body from "./components/Body";
import TableModal from "./components/TableModal";
import DetailsView from "./components/DetailsView";
import {
	fetchPieces,
	getPreviewHTML,
	sendEmail,
} from "./services/pieceService";
import {
	togglePieceFlag,
	filterPiecesByAcqUnit,
	sortPiecesBy,
} from "./utils/listHelpers";

import { PiecesContext } from "./context/PiecesContext";

const App = () => {
	const [unreceivedPieces, setUnreceivedPieces] = useState([]);
	const unreceivedPiecesRef = useRef({ current: unreceivedPieces });
	unreceivedPiecesRef.current = unreceivedPieces;

	const [sortingSettings, setSortingSettings] = useState({
		field: "local_claiming_level",
		order: "desc",
	});
	const sortingSettingsRef = useRef({ current: sortingSettings });
	sortingSettingsRef.current = sortingSettings;

	const [modalPiece, setModalPiece] = useState(null);
	const [modalConfirmChangesMode, setModalConfirmChangesMode] = useState(false);

	const [detailsViewPiece, setDetailsViewPiece] = useState(null);

	const [previewHTML, setPreviewHTML] = useState("<html></html>");

	const [filter, setFilter] = useState("");
	const filterRef = useRef({ current: filter });
	filterRef.current = filter;

	const [filteredPieces, setFilteredPieces] = useState([]);
	const filteredPiecesRef = useRef({ current: filteredPieces });
	filteredPiecesRef.current = filteredPieces;

	/**
	 * Handles toggling the reclaimAgain flag for a given piece and updates state accordingly.
	 *
	 * @param {Object} piece - The piece object whose flag should be toggled.
	 * @param {boolean} isChecked - Whether the flag should be set to true or false.
	 */
	const handleTogglePieceFlag = (piece, isChecked) => {
		// Update array with all pieces.
		const newUnreceivedPieces = togglePieceFlag(
			unreceivedPiecesRef.current,
			piece.pieceId,
			isChecked
		);
		setUnreceivedPieces(newUnreceivedPieces);

		// Update array with currently shown pieces.
		let newFilteredPieces = filterPiecesByAcqUnit(
			newUnreceivedPieces,
			filterRef.current
		);
		newFilteredPieces = sortPiecesBy(
			newFilteredPieces,
			sortingSettingsRef.current.field,
			sortingSettingsRef.current.order
		);
		setFilteredPieces(newFilteredPieces);

		// Show modal.
		setModalPiece(piece);
	};

	/**
	 * Handles changes to the acquisition unit filter input.
	 * Updates the filter state and applies filtering to the pieces.
	 *
	 * @param {string} newFilter - The new filter string entered by the user.
	 */
	const handleFilterChange = (newFilter) => {
		const filtered = filterPiecesByAcqUnit(
			unreceivedPiecesRef.current,
			newFilter
		);

		setFilteredPieces(filtered);
		setFilter(newFilter);
	};

	/**
	 * Handles sorting of unreceived pieces by a specified field.
	 * Toggles between ascending and descending order if the same field is clicked again.
	 *
	 * @param {string} field - The key in the piece objects to sort by.
	 *
	 * @example
	 * // Sorts by 'title' ascending
	 * handleSortPieces('title');
	 *
	 * @example
	 * // Sorts by 'title' descending if 'title' is already the current sort field
	 * handleSortPieces('title');
	 */
	const handleSortPieces = (field) => {
		// Determine the new sort order
		let newOrder = "asc";
		if (field === sortingSettingsRef.current.field) {
			newOrder = sortingSettingsRef.current.order === "asc" ? "desc" : "asc";
		}

		// Sort using listHelpers function
		const sorted = sortPiecesBy(filteredPiecesRef.current, field, newOrder);

		// Update state
		setFilteredPieces(sorted);
		setSortingSettings({ field, order: newOrder });
	};

	const handleSendEmail = async (piece) => {
		await sendEmail(piece);
	};

	const handleFetchPieces = async () => {
		const pieces = await fetchPieces();
		setUnreceivedPieces(pieces);
		setFilteredPieces(
			sortPiecesBy(pieces, sortingSettings.field, sortingSettings.order)
		);
	};

	const handleFetchPreviewHTML = async (pieceId) => {
		const previewData = await getPreviewHTML(pieceId);
		setPreviewHTML(previewData);
	};

	const handleOpenDetailsView = (piece) => {
		setPreviewHTML("<html></html>");
		setDetailsViewPiece(piece);
		handleFetchPreviewHTML(piece.pieceId);
	};

	const handleCloseDetailsView = () => {
		setDetailsViewPiece(null);
		setPreviewHTML("<html></html>");
	};

	useEffect(() => {
		handleFetchPieces();
	}, []);

	return (
		<PiecesContext.Provider
			value={{
				filteredPieces,
				handleSortPieces,
				sortingSettings,
				handleTogglePieceFlag,
				handleOpenDetailsView,
				detailsViewPiece,
				handleFilterChange,
				handleCloseDetailsView,
				previewHTML,
				modalPiece,
				setModalPiece,
				modalConfirmChangesMode,
				setModalConfirmChangesMode,
				handleSendEmail,
			}}
		>
			<div
				className={
					detailsViewPiece
						? "d-flex flex-column align-items-start gradient-background"
						: "d-flex flex-column align-items-center gradient-background"
				}
			>
				{filteredPieces.length ? (
					<>
						<Body />
						<DetailsView />
						<TableModal
							show={modalPiece !== null}
							modalPiece={modalPiece}
							setModalPiece={setModalPiece}
							modalConfirmChangesMode={modalConfirmChangesMode}
							setModalConfirmChangesMode={setModalConfirmChangesMode}
							handleUncheckPiece={(piece) =>
								handleTogglePieceFlag(piece, false)
							}
							sendEmail={handleSendEmail}
						/>
						<div
							className="d-flex justify-content-between"
							style={{
								width: detailsViewPiece ? "60%" : "100%",
								position: "fixed",
								height: 40,
								top: "calc(100vh - 60px)",
								left: 0,
								padding: 10,
							}}
						></div>
					</>
				) : (
					<>
						<div className="loader book">
							<figure className="page"></figure>
							<figure className="page"></figure>
							<figure className="page"></figure>
						</div>

						<h1 className="preloader-text">Loading</h1>
					</>
				)}
			</div>
		</PiecesContext.Provider>
	);
};

export default App;
