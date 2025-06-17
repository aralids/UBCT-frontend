import Table from "react-bootstrap/Table";
import TableModal from "./TableModal";
import { Form } from "react-bootstrap";
import { useState } from "react";

const OrdersTable = ({
	unfulfilledOrders,
	handleSort,
	sortingSettings,
	handleShow,
	handleShowDetailsView,
	detailsViewOrderNumber,
	showLessColumns,
}) => {
	console.log("OrdersTable rerender");
	const columnList = showLessColumns
		? ["Erwerbungsteam", "Lieferant", "Bestellnummer", "orderType", "Mahnstufe"]
		: [
				"Erwerbungsteam",
				"Lieferant",
				"Bestellnummer",
				"orderType",
				"Mahnstufe",
				"DisplaySummary",
				"Kurztitel",
		  ];
	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th></th>
						{...columnList.map((item) => (
							<th
								style={{
									cursor: "pointer",
								}}
								onClick={() => handleSort(item)}
							>
								<div className="d-flex">
									{item}
									{sortingSettings.field === item ? (
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
					{...unfulfilledOrders.map((order, index) => (
						<tr
							className={
								detailsViewOrderNumber === order.Bestellnummer
									? "table-primary"
									: ""
							}
							onContextMenu={(e) => {
								e.preventDefault();
								handleShowDetailsView(order.Bestellnummer);
							}}
						>
							<td>
								<Form.Check
									checked={order.reclaimAgain}
									onChange={({ target }) => {
										if (target.checked) {
											handleShow(index);
										}
									}}
								/>
							</td>
							<td>{order.Erwerbungsteam}</td>
							<td>{order.Lieferant}</td>
							<td
								style={{ cursor: "pointer" }}
								onClick={() =>
									window.open(
										"https://iln003-alt.k8s-development.hebis-services.de/receiving/aeb98268-286e-455f-acd1-5b7775350a9d/view",
										"_blank"
									)
								}
							>
								{order.Bestellnummer}
							</td>
							<td>{order.orderType}</td>
							<td>{order.Mahnstufe}</td>
							{showLessColumns ? (
								<></>
							) : (
								<>
									<td>{order.DisplaySummary}</td>
									<td>{order.Kurztitel}</td>
								</>
							)}
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default OrdersTable;
