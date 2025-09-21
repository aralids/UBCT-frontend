import Table from "react-bootstrap/Table";
import {
	Button,
	Form,
	Dropdown,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";
import { usePiecesContext } from "../context/PiecesContext";

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
								onClick={
									item !== "Erwerbungsteam"
										? () => handleSortPieces(piecePropertyList[index])
										: () => {}
								}
							>
								<div
									className="d-flex "
									onClick={
										item === "Erwerbungsteam"
											? () => handleSortPieces(piecePropertyList[index])
											: () => {}
									}
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
									<Form.Group>
										<Dropdown>
											<Dropdown.Toggle
												variant="secondary"
												id="filter-dropdown"
												style={{ width: "100%" }}
											>
												Filter
											</Dropdown.Toggle>

											<Dropdown.Menu
												style={{ padding: "0.5rem 1rem", width: 200 }}
											>
												<div className="d-flex justify-content-between align-items-center mb-2">
													<Button
														variant="outline-danger"
														size="sm"
														onClick={() => {
															const updatedFilter = filter.map((x) => ({
																...x,
																checked: false,
															}));
															handleFilterChange(updatedFilter);
														}}
													>
														Uncheck All
													</Button>
												</div>
												<hr className="my-2" />

												{filter.map((f) => (
													<Form.Check
														key={f.label}
														type="checkbox"
														id={`filter-${f.label}`}
														label={f.label}
														checked={f.checked}
														onChange={() => {
															const updatedFilter = filter.map((x) =>
																x.label === f.label
																	? { ...x, checked: !x.checked }
																	: x
															);
															handleFilterChange(updatedFilter);
														}}
													/>
												))}
											</Dropdown.Menu>
										</Dropdown>
									</Form.Group>
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
