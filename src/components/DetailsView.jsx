import Offcanvas from "react-bootstrap/Offcanvas";
import Preview from "./Preview";

const DetailsView = ({ show, handleClose, content }) => {
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
				<p className="p-0 m-0">{content.erwartetesEingangsdatum}</p>
				<br />
				<p className="p-0 m-0">
					<b>Datum der letzten Reklamation</b>
				</p>
				<p className="p-0 m-0">{content.letzteReklamationDatum}</p>
				<br />
				<p className="p-0 m-0">
					<b>Anzahl Exemplare</b>
				</p>
				<p className="p-0 m-0">{content.anzahlExemplare}</p>
				<br />
				<p className="p-0 m-0">
					<b>Rechnungscode</b>
				</p>
				<p className="p-0 m-0">{content.rechnungscode}</p>
				<br />
				<p className="p-0 m-0">
					<b>Kundennummer</b>
				</p>
				<p className="p-0 m-0">{content.kundennummer}</p>
				<br />
				<p className="p-0 m-0">
					<b>Absender</b>
				</p>
				<p className="p-0 m-0">{content.absender}</p>
				<br />
				<p className="p-0 m-0">
					<b>Produktnummer</b>
				</p>
				<p className="p-0 m-0">{content.produktnummer}</p>
				<br />
				<p className="p-0 m-0">
					<b>Internal note</b>
				</p>
				<p className="p-0 m-0">{content.internalNote}</p>
				<br />
				<Preview />
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default DetailsView;
