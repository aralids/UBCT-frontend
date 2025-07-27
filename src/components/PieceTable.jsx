import Table from "react-bootstrap/Table";
import { Form } from "react-bootstrap";

const PieceTable = ({
	unreceivedPieces,
	handleSort,
	sortingSettings,
	handleOpenModal,
	handleOpenDetailsView,
	detailsViewPiece,
}) => {
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
								onClick={() => handleSort(piecePropertyList[index])}
							>
								<div className="d-flex">
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
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{...unreceivedPieces.map((piece) => (
						<tr
							className={
								detailsViewPiece && detailsViewPiece.pieceId === piece.pieceId
									? "table-primary"
									: ""
							}
							onContextMenu={(e) => {
								e.preventDefault();
								handleOpenDetailsView(piece);
							}}
						>
							<td>
								<Form.Check
									checked={piece.reclaimAgain}
									onChange={({ target }) => {
										if (target.checked) {
											handleOpenModal(piece);
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
