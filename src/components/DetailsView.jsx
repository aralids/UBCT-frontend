import Offcanvas from "react-bootstrap/Offcanvas";
import Preview from "./Preview";

const DetailsView = ({ show, handleClose, content, previewHTML }) => {
	if (!content) {
		return <></>;
	}
	return (
		<Offcanvas
			style={{ width: "40vw" }}
			show={show}
			onHide={handleClose}
			placement="end"
			backdrop={false}
			scroll={true}
		>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Detailansicht</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<p className="p-0 m-0">
					<b>Erwartetes Eingangsdatum</b>
				</p>
				<p className="p-0 m-0">{content.receiptDate}</p>
				<br />
				<p className="p-0 m-0">
					<b>Datum der letzten Reklamation</b>
				</p>
				<p className="p-0 m-0">{content.local_last_reminder_date}</p>
				<br />
				<p className="p-0 m-0">
					<b>Anzahl Exemplare</b>
				</p>
				<p className="p-0 m-0">{content.quantity}</p>
				<br />
				<p className="p-0 m-0">
					<b>Rechnungscode</b>
				</p>
				<p className="p-0 m-0">{content.fund}</p>
				<br />
				<p className="p-0 m-0">
					<b>Kundennummer</b>
				</p>
				<p className="p-0 m-0">{content.vendorAccount}</p>
				<br />
				<p className="p-0 m-0">
					<b>Absender</b>
				</p>
				<p className="p-0 m-0">
					Universitätsbibliothek Frankfurt, Medienbearbeitung - Team
					Zeitschriften Bockenheimer Landstr. 134-138, 60325
					Frankfurt/abo-verw@ub.uni-frankfurt.de
				</p>
				<br />
				<p className="p-0 m-0">
					<b>Produktnummer</b>
				</p>
				<p className="p-0 m-0">{content.identifierList}</p>
				<br />
				<p className="p-0 m-0">
					<b>Internal note</b>
				</p>
				<p className="p-0 m-0">{content.internalNote}</p>
				<br />
				<Preview previewHTML={previewHTML} />
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default DetailsView;
