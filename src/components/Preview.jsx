const Preview = () => {
	return (
		<div
			className="m-0 mt-4 ps-2 pt-3 pe-2 pb-3"
			style={{
				height: 400,
				width: 700,
				backgroundColor: "white",
				border: "1px solid black",
				borderRadius: "3px",
			}}
		>
			<div className="d-flex justify-content-between me-3">
				<h5 style={{ fontFamily: "unset", fontWeight: "bold" }}>
					4. Reklamation
				</h5>
				<h5 style={{ fontFamily: "unset", fontWeight: "bold" }}>14.04.2025</h5>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateRows: "inherit(auto)",
					gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
				}}
			>
				<p className="column-1 info-p">Produktnummer:</p>
				<p className="column-2 info-p">ISSN 2942-0253</p>
				<p className="column-4 info-p">Bestellnr.:</p>
				<p className="column-5 info-p">19022649</p>

				<p className="column-1 info-p">Kundennr.:</p>
				<p className="column-2 info-p">20150</p>
				<p className="column-4 info-p">Rechnungscode:</p>
				<p className="column-5 info-p">U-Z</p>

				<p className="column-1-5 info-p-mt-1">
					<b>Die Bibliothek erhält im Abonnement / zur Fortsetzung:</b>
				</p>
				<p className="column-1-5 info-p">
					Double : Magazin für Puppen-, Figuren- und Objekttheater /
					herausgegeben vom Deutschen Forum für Figurentheater und
					Puppenspielkunst, Bochum. - Berlin : Verl. Theater der Zeit, Nr.
					1.2004 - 26.2012; 10.2013=Nr. 27 -
				</p>

				<p className="column-1-5 info-p-mt-1">
					<b>Leider sind die folgenden Hefte/Bände nicht eingetroffen:</b>
				</p>
				<p className="column-1-5 info-p">20.2023,48</p>

				<p className="column-1-5 info-p-mt-1">
					<i>Im Abo von "Theater der Zeit"</i>
				</p>

				<p className="column-1-5 info-p-mt-1">
					<b>
						<i>
							Universitätsbibliothek Frankfurt, Medienbearbeitung - Team
							Zeitschriften Bockenheimer Landstr. 134-138, 60325
							Frankfurt/abo-verw@ub.uni-frankfurt.de
						</i>
					</b>
				</p>
			</div>
		</div>
	);
};

export default Preview;
