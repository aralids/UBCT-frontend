import { useState } from "react";

import PieceTable from "./PieceTable";
import PiecePagination from "./PiecePagination";
import { PIECES_PER_PAGE } from "../utils/config";

const Body = ({
	unreceivedPieces,
	handleSort,
	sortingSettings,
	handleOpenModal,
	handleOpenDetailsView,
	detailsViewPiece,
}) => {
	const [currPage, setCurrPage] = useState(1);
	const totalPageNumber = parseInt(
		Math.ceil(unreceivedPieces.length / PIECES_PER_PAGE)
	);
	return (
		<>
			<div
				className="d-flex flex-column align-items-center"
				style={{
					backgroundColor: "rgb(100, 100, 100, 0.3)",
					width: detailsViewPiece ? "60vw" : "90vw",
					height: "fit-content",
					marginTop: "20px",
					marginBottom: "20px",
					borderRadius: "5px",
				}}
			>
				<PieceTable
					unreceivedPieces={unreceivedPieces.slice(
						(currPage - 1) * PIECES_PER_PAGE,
						currPage * PIECES_PER_PAGE
					)}
					handleSort={handleSort}
					sortingSettings={sortingSettings}
					handleOpenModal={handleOpenModal}
					handleOpenDetailsView={handleOpenDetailsView}
					detailsViewPiece={detailsViewPiece}
				/>
				<PiecePagination
					currPage={currPage}
					setCurrPage={setCurrPage}
					totalPageNumber={totalPageNumber}
				/>
			</div>
		</>
	);
};

export default Body;
