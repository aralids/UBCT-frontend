import { useRef, useEffect, useLayoutEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Preview from "./Preview";
import Table from "react-bootstrap/Table";
import { usePiecesContext } from "../context/PiecesContext";

const DetailsView = () => {
	const {
		detailsViewPiece,
		handleCloseDetailsView,
		previewHTML,
		componentWidths,
		handleComponentWidthsChange,
	} = usePiecesContext();

	const offcanvasRef = useRef(null);
	const handleRef = useRef(null);

	useEffect(() => {
		const handle = handleRef.current;
		if (!handle) return; // <-- check if the ref exists

		let isResizing = false;

		const onMouseMove = (e) => {
			if (!isResizing) return;
			const newWidth = window.innerWidth - e.clientX; // offcanvas anchored right
			if (newWidth >= 250 && newWidth <= window.innerWidth * 0.8) {
				handleComponentWidthsChange(newWidth);
			}
		};

		const onMouseUp = () => {
			isResizing = false;
			document.body.style.userSelect = "";
		};

		const onMouseDown = () => {
			isResizing = true;
			document.body.style.userSelect = "none"; // prevent text selection
		};

		handle.addEventListener("mousedown", onMouseDown);
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);

		return () => {
			handle.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};
	}, [handleRef.current]);

	if (!detailsViewPiece) return null;

	const renderIdentifier = (identifierList) => {
		if (!Array.isArray(identifierList) || identifierList.length === 0)
			return "—";
		const { productIdType, productId } = identifierList[0];
		return `${productIdType ?? "?"} ${productId ?? "?"}`;
	};

	return (
		<Offcanvas
			ref={offcanvasRef}
			style={{ width: componentWidths.detailsView }}
			show={detailsViewPiece}
			onHide={handleCloseDetailsView}
			placement="end"
			backdrop={false}
			scroll={true}
		>
			{/* Resize handle */}
			<div
				ref={handleRef}
				style={{
					position: "absolute",
					top: 0,
					left: -5,
					width: 10,
					height: "100%",
					cursor: "ew-resize",
					zIndex: 1056,
				}}
			/>

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
								{detailsViewPiece.shipTo
									?.filter((addr) => addr.trim() !== "")
									.map((addr, index, arr) => (
										<span key={index}>
											{addr}
											{index < arr.length - 1 && ","}
											<br />
										</span>
									))}
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
