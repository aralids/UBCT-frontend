import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Body from "./components/Body";
import TableModal from "./components/TableModal";
import DetailsView from "./components/DetailsView";

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

	const sortBy = (field, order) => {
		const currPieces = unreceivedPiecesRef.current;
		if (order === "asc") {
			currPieces.sort((a, b) => {
				a[field] = a[field] ?? "";
				b[field] = b[field] ?? "";
				return String(a[field]).localeCompare(String(b[field]));
			});
		} else if (order === "desc") {
			currPieces.sort((a, b) => {
				a[field] = a[field] ?? "";
				b[field] = b[field] ?? "";
				return String(b[field]).localeCompare(String(a[field]));
			});
		}

		setUnreceivedPieces(currPieces);
		setSortingSettings({ field: field, order: order });
	};

	const handleSort = (field) => {
		if (field === sortingSettingsRef.current.field) {
			if (sortingSettingsRef.current.order === "asc") {
				sortBy(field, "desc");
			} else if (sortingSettingsRef.current.order === "desc") {
				sortBy(field, "asc");
			}
		} else {
			sortBy(field, "asc");
		}
	};

	const handleCheckPiece = (piece) => {
		const currPieces = JSON.parse(JSON.stringify(unreceivedPiecesRef.current));
		const pieceIndex = currPieces.findIndex(
			(item) => item.pieceId === piece.pieceId
		);
		let modifiedPiece = currPieces[pieceIndex];
		modifiedPiece.reclaimAgain = true;
		currPieces[pieceIndex] = modifiedPiece;
		setUnreceivedPieces(currPieces);
		setModalPiece(piece);
	};

	const handleUncheckPiece = (piece) => {
		const currPieces = JSON.parse(JSON.stringify(unreceivedPiecesRef.current));
		const pieceIndex = currPieces.findIndex(
			(item) => item.pieceId === piece.pieceId
		);
		let modifiedPiece = currPieces[pieceIndex];
		modifiedPiece.reclaimAgain = false;
		currPieces[pieceIndex] = modifiedPiece;
		setUnreceivedPieces(currPieces);
		setModalPiece(piece);
	};

	const sendEmail = async (piece) => {
		const pieceObj = {
			pieceId: piece.pieceId,
			newDate: piece.newDate,
			externalNote: piece.newNote,
		};

		try {
			const response = await axios.post("/api/send-email-json", pieceObj, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log("Response:", response.data);
		} catch (error) {
			console.error("Request failed:", error);
		}
	};

	const getPreviewHTML = async (pieceId) => {
		const response = await axios.get(`/api/preview/${pieceId}`, {
			responseType: "text",
		});
		const rawHtml = JSON.parse(response.data);
		setPreviewHTML(rawHtml);
	};

	const beforeUnloadHandler = (event) => {
		event.preventDefault(); // Recommended
		event.returnValue = true; // Included for legacy support, e.g. Chrome/Edge < 119
	};

	const fetchPieces = async () => {
		const response = await axios.get("/api/pieces");
		const pieces = response.data;
		setUnreceivedPieces(pieces);
	};

	useEffect(() => sortBy(sortingSettings.field, sortingSettings.order), []);

	useEffect(() => {
		window.addEventListener("beforeunload", beforeUnloadHandler);
		fetchPieces();
	}, []);

	return (
		<div
			className={
				detailsViewPiece
					? "d-flex flex-column align-items-start gradient-background"
					: "d-flex flex-column align-items-center gradient-background"
			}
		>
			{unreceivedPieces.length ? (
				<>
					<Body
						unreceivedPieces={unreceivedPieces}
						handleSort={handleSort}
						sortingSettings={sortingSettings}
						handleOpenModal={(piece) => {
							handleCheckPiece(piece);
							setModalPiece(piece);
						}}
						handleOpenDetailsView={(piece) => {
							setPreviewHTML("<html></html>");
							setDetailsViewPiece(piece);
							getPreviewHTML(piece.pieceId);
						}}
						detailsViewPiece={detailsViewPiece}
					/>
					<DetailsView
						show={detailsViewPiece}
						handleClose={() => {
							setDetailsViewPiece(null);
							setPreviewHTML("<html></html>");
						}}
						detailsViewPiece={detailsViewPiece}
						previewHTML={previewHTML}
					/>
					<TableModal
						show={modalPiece !== null}
						modalPiece={modalPiece}
						setModalPiece={setModalPiece}
						modalConfirmChangesMode={modalConfirmChangesMode}
						setModalConfirmChangesMode={setModalConfirmChangesMode}
						handleUncheckPiece={handleUncheckPiece}
						sendEmail={sendEmail}
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
	);
};

export default App;
