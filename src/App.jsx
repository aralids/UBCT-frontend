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
	getLocalPiece,
} from "./services/pieceService";
import {
	togglePieceFlag,
	sortPiecesBy,
	filterPieces,
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

	const [previewHTML, setPreviewHTML] = useState(null);

	const [filter, setFilter] = useState([]);
	const filterRef = useRef({ current: filter });
	filterRef.current = filter;

	const [filteredPieces, setFilteredPieces] = useState([]);
	const filteredPiecesRef = useRef({ current: filteredPieces });
	filteredPiecesRef.current = filteredPieces;

	const [componentWidths, setComponentWidths] = useState({
		body: "90vw",
		detailsView: "0vw",
	});
	const componentWidthsRef = useRef({ current: componentWidths });
	componentWidthsRef.current = componentWidths;

	const [pieceChangedWarning, setPieceChangedWarning] = useState(null);

	const handleComponentWidthsChange = (newDetailsViewWidth) => {
		const newBodyWidth = Math.max(850, window.innerWidth - newDetailsViewWidth);
		setComponentWidths({
			body: newBodyWidth,
			detailsView: newDetailsViewWidth,
		});
	};

	/**
	 * Handles toggling the reclaimAgain flag for a given piece and updates state accordingly.
	 *
	 * @param {Object} piece - The piece object whose flag should be toggled.
	 * @param {boolean} isChecked - Whether the flag should be set to true or false.
	 */
	const handleTogglePieceFlag = async (piece, isChecked) => {
		// Update array with all pieces.
		const newUnreceivedPieces = togglePieceFlag(
			unreceivedPiecesRef.current,
			piece.pieceId,
			isChecked
		);
		setUnreceivedPieces(newUnreceivedPieces);

		// Update array with currently shown pieces.
		let newFilteredPieces = filterPieces(
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
		if (isChecked) {
			setModalPiece(piece);
			const data = await getLocalPiece(piece.pieceId);
			setPieceChangedWarning(
				data["local_claiming_level"] !== piece["local_claiming_level"]
			);
		} else {
			setModalPiece(null);
			setPieceChangedWarning(null);
		}
	};

	/**
	 * Handles changes to the acquisition unit filter input.
	 * Updates the filter state and applies filtering to the pieces.
	 *
	 * @param {string} newFilter - The new filter string entered by the user.
	 */
	const handleFilterChange = (newFilter) => {
		const filtered = filterPieces(unreceivedPiecesRef.current, newFilter);

		setFilteredPieces(
			sortPiecesBy(
				filtered,
				sortingSettingsRef.current.field,
				sortingSettingsRef.current.order
			)
		);
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
		setModalPiece(null);
		setModalConfirmChangesMode(false);
		await sendEmail(piece);
	};

	const handleFetchPieces = async () => {
		const pieces = await fetchPieces();
		setUnreceivedPieces(pieces);
		setFilteredPieces(
			sortPiecesBy(pieces, sortingSettings.field, sortingSettings.order)
		);

		const uniqueAcqUnits = [...new Set(pieces.map((p) => p.acqUnitName))];
		const filterItems = uniqueAcqUnits.map((unit) => ({
			label: unit,
			checked: true,
		}));
		setFilter(filterItems);
	};

	const handleFetchPreviewHTML = async (pieceId) => {
		const previewData = await getPreviewHTML(pieceId);
		setPreviewHTML(previewData);
	};

	const handleOpenDetailsView = (piece) => {
		setPreviewHTML(null);
		setDetailsViewPiece(piece);
		handleFetchPreviewHTML(piece.pieceId);
		if (componentWidthsRef.current.body === "90vw") {
			setComponentWidths({ body: "60vw", detailsView: "40vw" });
		}
	};

	const handleCloseDetailsView = () => {
		setDetailsViewPiece(null);
		setPreviewHTML(null);
		setComponentWidths({ body: "90vw", detailsView: "0vw" });
	};

	const handleOpenConfirmationModal = async (newModalPiece) => {
		setModalPiece(newModalPiece);
		setModalConfirmChangesMode(true);
		setPieceChangedWarning(null);
		const data = await getLocalPiece(newModalPiece.pieceId);
		setPieceChangedWarning(
			data["local_claiming_level"] !== newModalPiece["local_claiming_level"]
		);
	};

	const handleCloseConfirmationModal = () => {
		setModalConfirmChangesMode(false);
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
				modalConfirmChangesMode,
				handleCloseConfirmationModal,
				handleSendEmail,
				handleOpenConfirmationModal,
				filter,
				componentWidths,
				handleComponentWidthsChange,
				pieceChangedWarning,
			}}
		>
			<div
				className={
					detailsViewPiece
						? "d-flex flex-column align-items-start gradient-background"
						: "d-flex flex-column align-items-center gradient-background"
				}
			>
				{unreceivedPieces.length ? (
					<>
						<Body />
						<DetailsView />
						<TableModal />
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
