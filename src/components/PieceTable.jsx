import Table from "react-bootstrap/Table";
import {
	Button,
	Form,
	Dropdown,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";
import { usePiecesContext } from "../context/PiecesContext";
import DropdownFilter from "./DropdownFilter";

const PieceTable = ({ filteredPieces }) => {
	const {
		handleSortPieces,
		sortingSettings,
		handleTogglePieceFlag,
		handleOpenDetailsView,
		detailsViewPiece,
		handleFilterChange,
		filter,
	} = usePiecesContext();
	const columnList = detailsViewPiece
		? [
				"Erwerbungsteam",
				"Lieferant",
				"Bestellnummer",
				"Bestelltyp",
				"Rechnungscode",
				"Mahnstufe",
		  ]
		: [
				"Erwerbungsteam",
				"Lieferant",
				"Bestellnummer",
				"Bestelltyp",
				"Rechnungscode",
				"Mahnstufe",
				"DisplaySummary",
				"Kurztitel",
		  ];
	const piecePropertyList = detailsViewPiece
		? [
				"acqUnitName",
				"vendorName",
				"poLineNumber",
				"ordertype",
				"fund",
				"local_claiming_level",
		  ]
		: [
				"acqUnitName",
				"vendorName",
				"poLineNumber",
				"ordertype",
				"fund",
				"local_claiming_level",
				"displaySummary",
				"title",
		  ];
	return (
		<>
			<Table striped bordered hover>
				<thead className="sticky-header">
					<tr>
						<th className="align-top"></th>
						{columnList.map((item, index) => (
							<th
								className="align-top"
								style={{
									cursor: "pointer",
								}}
							>
								<div
									className="d-flex "
									onClick={() => handleSortPieces(piecePropertyList[index])}
								>
									{item}
									{sortingSettings.field === piecePropertyList[index] ? (
										sortingSettings.order === "asc" ? (
											<span className="material-symbols-outlined m-0 p-0">
												arrow_upward
											</span>
										) : (
											<span className="material-symbols-outlined m-0 p-0">
												arrow_downward
											</span>
										)
									) : (
										<span
											className="material-symbols-outlined m-0 p-0"
											style={{ opacity: 0 }}
										>
											arrow_upward
										</span>
									)}
								</div>
								{item === "Erwerbungsteam" ? (
									<DropdownFilter filterName={"acqUnitName"} />
								) : (
									<></>
								)}
								{item === "Bestelltyp" ? (
									<DropdownFilter filterName={"ordertype"} />
								) : (
									<></>
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{filteredPieces.map((piece) => (
						<OverlayTrigger
							key={piece.pieceId}
							placement="bottom"
							overlay={
								<Tooltip id={`tooltip-${piece.pieceId}`}>
									Right-click to see details
								</Tooltip>
							}
						>
							<tr
								className={
									detailsViewPiece && detailsViewPiece.pieceId === piece.pieceId
										? "table-primary"
										: piece.reclaimAgain === true
										? "table-danger"
										: ""
								}
								onContextMenu={(e) => {
									e.preventDefault();
									handleOpenDetailsView(piece);
								}}
							>
								<td>
									<Form.Check
										checked={piece.reclaimAgain === true}
										onChange={({ target }) => {
											if (target.checked) {
												handleTogglePieceFlag(piece, true);
											}
										}}
									/>
								</td>
								<td>{piece.acqUnitName}</td>
								<td>{piece.vendorName}</td>
								<td
									style={{
										cursor: "pointer",
										color: "blue",
										textDecorationLine: "underline",
									}}
									onClick={() => window.open(piece["title_link"], "_blank")}
								>
									{piece.poLineNumber}
								</td>
								<td>{piece.ordertype}</td>
								<td>{piece.fund}</td>
								<td>{piece.local_claiming_level}</td>
								{detailsViewPiece ? (
									<></>
								) : (
									<>
										<td>{piece.displaySummary}</td>
										<td>{piece.title}</td>
									</>
								)}
							</tr>
						</OverlayTrigger>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default PieceTable;
