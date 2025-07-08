import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import TableModal from "./components/TableModal";
import DetailsView from "./components/DetailsView";
import WarningModal from "./components/WarningModal";

const App = () => {
	const [unfulfilledOrders, setUnfulfilledOrders] = useState([
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "k",
			Lieferant: "lieferant B",
			Bestellnummer: "23013500",
			orderType: "Mono",
			Mahnstufe: "1",
			DisplaySummary: "2025, 1.Halbjahr 51.2025",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "j",
			Lieferant: "lieferant A",
			Bestellnummer: "23013501",
			orderType: "Zeitschrift",
			Mahnstufe: "6",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "i",
			Lieferant: "lieferant A",
			Bestellnummer: "23013502",
			orderType: "Zeitschrift",
			Mahnstufe: "4",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013503",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013504",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013505",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013506",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013507",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},

		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013508",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013509",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013510",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013511",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013512",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013513",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013514",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013515",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013516",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013517",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013518",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013519",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013520",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013521",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},

		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013522",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},

		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013523",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},

		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013524",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013525",
			orderType: "Zeitschrift",
			Mahnstufe: "6",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013526",
			orderType: "Mono",
			Mahnstufe: "6",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013527",
			orderType: "Zeitschrift",
			Mahnstufe: "5",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013528",
			orderType: "Mono",
			Mahnstufe: "1",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013529",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
		{
			reclaimAgain: false,
			naechsteReklamationDatum: "30.05.2025",
			Erwerbungsteam: "h",
			Lieferant: "lieferant C",
			Bestellnummer: "23013530",
			orderType: "Mono",
			Mahnstufe: "3",
			DisplaySummary: "2024, 2.Halbjahr 51.2024",
			Kurztitel: "South African journal of politics",
			externalNote: "Initial external note.",
		},
	]);
	const unfulfilledOrdersRef = useRef({ current: unfulfilledOrders });
	unfulfilledOrdersRef.current = unfulfilledOrders;

	const [sortingSettings, setSortingSettings] = useState({
		field: "Mahnstufe",
		order: "desc",
	});
	const sortingSettingsRef = useRef({ current: sortingSettings });
	sortingSettingsRef.current = sortingSettings;

	const sortBy = (field, order) => {
		console.log("new sorting: ", field, order);
		const currOrders = unfulfilledOrdersRef.current;
		if (order === "asc") {
			currOrders.sort((a, b) => a[field].localeCompare(b[field]));
		} else if (order === "desc") {
			currOrders.sort((a, b) => b[field].localeCompare(a[field]));
		}

		setUnfulfilledOrders(currOrders);
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

	useEffect(() => sortBy(sortingSettings.field, sortingSettings.order), []);

	const [modalOrderIndex, setModalOrderIndex] = useState(-1);
	const handleNextReclamationDateChange = (orderIndex, newDate) => {
		const modifiedUnfulfilledOrders = JSON.parse(
			JSON.stringify(unfulfilledOrders)
		);
		const [year, month, day] = newDate.split("-");
		modifiedUnfulfilledOrders[
			orderIndex
		].naechsteReklamationDatum = `${day}.${month}.${year}`;
		setUnfulfilledOrders(modifiedUnfulfilledOrders);
	};

	const handleExternalNoteChange = (orderIndex, newNote) => {
		const modifiedUnfulfilledOrders = JSON.parse(
			JSON.stringify(unfulfilledOrders)
		);
		modifiedUnfulfilledOrders[orderIndex]["externalNote"] = newNote;
		setUnfulfilledOrders(modifiedUnfulfilledOrders);
	};

	const handleReclaimAgainChange = (
		index,
		newExternalNote,
		newReclamationDate
	) => {
		// Send update to backend.
		const currOrders = JSON.parse(JSON.stringify(unfulfilledOrdersRef.current));
		let modifiedOrders = currOrders
			.slice(0, index)
			.concat(currOrders.slice(index + 1));
		setUnfulfilledOrders(modifiedOrders);
	};

	const getSupplementaryData = (orderNumber) => {
		const supplData = unfulfilledOrdersRef.current.find(
			(order) => order.poLineNumber === orderNumber
		);
		setDetailsViewContent(supplData);
		setDetailsViewOrderNumber(orderNumber);
	};

	const getPreviewHTML = async (orderNumber) => {
		const response = await axios.get(
			`http://0.0.0.0:9000/preview/${orderNumber}`
		);
		setPreviewHTML(response.data);
	};

	const [previewHTML, setPreviewHTML] = useState("<html></html>");

	const [detailsViewContent, setDetailsViewContent] = useState(null);
	const [detailsViewOrderNumber, setDetailsViewOrderNumber] = useState(null);

	const [warningModalContent, setWarningModalContent] = useState(null);

	const beforeUnloadHandler = (event) => {
		// Recommended
		event.preventDefault();

		// Included for legacy support, e.g. Chrome/Edge < 119
		event.returnValue = true;
	};

	const fetchPieces = async () => {
		const response = await axios.get("http://0.0.0.0:9000/pieces");
		const pieces = response.data;
		setUnfulfilledOrders(pieces);
	};

	useEffect(() => {
		window.addEventListener("beforeunload", beforeUnloadHandler);
		fetchPieces();
	}, []);

	return (
		<div
			className={
				detailsViewContent
					? "d-flex flex-column align-items-start gradient-background"
					: "d-flex flex-column align-items-center gradient-background"
			}
		>
			<Body
				unfulfilledOrders={unfulfilledOrders}
				handleSort={handleSort}
				sortingSettings={sortingSettings}
				handleShow={(orderIndex) => {
					const currOrders = JSON.parse(
						JSON.stringify(unfulfilledOrdersRef.current)
					);
					let modifiedOrder = currOrders[orderIndex];
					modifiedOrder.reclaimAgain = true;
					currOrders[orderIndex] = modifiedOrder;
					setUnfulfilledOrders(currOrders);
					setModalOrderIndex(orderIndex);
				}}
				handleReclaimAgainChange={handleReclaimAgainChange}
				handleShowDetailsView={(orderNumber) => {
					getSupplementaryData(orderNumber);
					getPreviewHTML(orderNumber);
				}}
				detailsViewContent={detailsViewContent}
				detailsViewOrderNumber={detailsViewOrderNumber}
				showLessColumns={detailsViewContent}
			/>
			<DetailsView
				show={detailsViewContent}
				handleClose={() => {
					setDetailsViewContent(null);
					setDetailsViewOrderNumber(null);
				}}
				content={detailsViewContent}
				previewHTML={previewHTML}
			/>
			<TableModal
				show={Boolean(modalOrderIndex >= 0)}
				handleClose={() => setModalOrderIndex(-1)}
				unfulfilledOrders={unfulfilledOrders}
				orderIndex={modalOrderIndex}
				handleReclaimAgainChange={handleReclaimAgainChange}
			/>
			<div
				className="d-flex justify-content-between"
				style={{
					width: detailsViewContent ? "60%" : "100%",
					position: "fixed",
					height: 40,
					top: "calc(100vh - 60px)",
					left: 0,
					padding: 10,
				}}
			></div>
			<WarningModal show={warningModalContent} />
		</div>
	);
};

export default App;
