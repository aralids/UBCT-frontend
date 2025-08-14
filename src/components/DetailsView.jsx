import Offcanvas from "react-bootstrap/Offcanvas";
import Preview from "./Preview";
import Table from "react-bootstrap/Table";
import { usePiecesContext } from "../context/PiecesContext";

const DetailsView = () => {
	const { detailsViewPiece, handleCloseDetailsView, previewHTML } =
		usePiecesContext();

	if (!detailsViewPiece) {
		return <></>;
	}

	const renderIdentifier = (identifierList) => {
		if (!Array.isArray(identifierList) || identifierList.length === 0) {
			return "—"; // Show dash if list is empty or not an array
		}

		const { productIdType, productId } = identifierList[0];
		return `${productIdType ?? "?"} ${productId ?? "?"}`;
	};

	return (
		<Offcanvas
			style={{ width: "40vw" }}
			show={detailsViewPiece}
			onHide={handleCloseDetailsView}
			placement="end"
			backdrop={false}
			scroll={true}
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Detailansicht</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Table bordered>
					<tbody>
						<tr>
							<th>Erwartetes Eingangsdatum</th>
							<td>{detailsViewPiece.receiptDate ?? "—"}</td>
						</tr>
						<tr>
							<th>Datum der letzten Reklamation</th>
							<td>{detailsViewPiece.local_last_reminder_date ?? "—"}</td>
						</tr>
						<tr>
							<th>Anzahl Exemplare</th>
							<td>{detailsViewPiece.quantity ?? "—"}</td>
						</tr>
						<tr>
							<th>Rechnungscode</th>
							<td>{detailsViewPiece.fund ?? "—"}</td>
						</tr>
						<tr>
							<th>Kundennummer</th>
							<td>{detailsViewPiece.vendorAccount ?? "—"}</td>
						</tr>
						<tr>
							<th>Absender</th>
							<td>
								{detailsViewPiece.shipTo ? (
									detailsViewPiece.shipTo
										.filter((addr) => addr.trim() !== "") // filter out empty lines
										.map((addr, index, arr) => (
											<span key={index}>
												{addr}
												{index < arr.length - 1 && ","}
												<br />
											</span>
										))
								) : (
									<></>
								)}
							</td>
						</tr>
						<tr>
							<th>Produktnummer</th>
							<td>{renderIdentifier(detailsViewPiece.identifierList)}</td>
						</tr>
						<tr>
							<th>Internal note</th>
							<td>{detailsViewPiece.internalNote ?? "—"}</td>
						</tr>
					</tbody>
				</Table>
				<Preview previewHTML={previewHTML} />
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default DetailsView;
