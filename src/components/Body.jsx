import { useState } from "react";

import OrdersTable from "./OrdersTable";
import OrderPagination from "./OrderPagination";
import { ORDERS_PER_PAGE } from "../utils.jsx/config";

const Body = ({
	unfulfilledOrders,
	handleSort,
	sortingSettings,
	handleShow,
	handleReclaimAgainChange,
	handleShowView,
	handleHideView,
	handleShowDetailsView,
	detailsViewContent,
	detailsViewOrderNumber,
	showLessColumns,
}) => {
	console.log("uO: ", unfulfilledOrders, typeof unfulfilledOrders);
	const [currPage, setCurrPage] = useState(1);
	const totalPageNumber = parseInt(
		Math.ceil(unfulfilledOrders.length / ORDERS_PER_PAGE)
	);
	return (
		<>
			<div
				className="d-flex flex-column align-items-center"
				style={{
					backgroundColor: "rgb(100, 100, 100, 0.3)",
					width: detailsViewContent ? "60vw" : "90vw",
					height: "fit-content",
					marginTop: "20px",
					marginBottom: "20px",
					borderRadius: "5px",
				}}
			>
				<OrdersTable
					unfulfilledOrders={unfulfilledOrders.slice(
						(currPage - 1) * ORDERS_PER_PAGE,
						currPage * ORDERS_PER_PAGE
					)}
					handleSort={handleSort}
					sortingSettings={sortingSettings}
					handleShow={handleShow}
					handleReclaimAgainChange={handleReclaimAgainChange}
					handleShowView={handleShowView}
					handleHideView={handleHideView}
					handleShowDetailsView={handleShowDetailsView}
					detailsViewOrderNumber={detailsViewOrderNumber}
					showLessColumns={showLessColumns}
				/>
				<OrderPagination
					currPage={currPage}
					setCurrPage={setCurrPage}
					totalPageNumber={totalPageNumber}
				/>
			</div>
		</>
	);
};

export default Body;
