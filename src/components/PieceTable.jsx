import Table from "react-bootstrap/Table";
import { Button, Form, Dropdown } from "react-bootstrap";
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
				"Mahnstufe",
		  ]
		: [
				"Erwerbungsteam",
				"Lieferant",
				"Bestellnummer",
				"Bestelltyp",
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
				"local_claiming_level",
		  ]
		: [
				"acqUnitName",
				"vendorName",
				"poLineNumber",
				"ordertype",
				"local_claiming_level",
				"displaySummary",
				"title",
		  ];
	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th></th>
						{...columnList.map((item, index) => (
							<th
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
									className="d-flex"
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
										<></>
									)}
								</div>
								{item === "Erwerbungsteam" ? (
									<Form.Group className="mb-3">
										<Dropdown>
											<Dropdown.Toggle variant="secondary" id="filter-dropdown">
												Select Acquisition Units
											</Dropdown.Toggle>

											<Dropdown.Menu style={{ padding: "0.5rem 1rem" }}>
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
									<Form.Group className="mb-3" style={{ opacity: 0 }}>
										<Button style={{ cursor: "pointer" }} disabled>
											Select Acquisition Units
										</Button>
									</Form.Group>
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{...filteredPieces.map((piece) => (
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
					))}
				</tbody>
			</Table>
		</>
	);
};

export default PieceTable;
