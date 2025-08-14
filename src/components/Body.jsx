import { useState } from "react";

import PieceTable from "./PieceTable";
import PiecePagination from "./PiecePagination";
import { PIECES_PER_PAGE } from "../utils/config";
import { usePiecesContext } from "../context/PiecesContext";

const Body = () => {
	const { filteredPieces, detailsViewPiece } = usePiecesContext();

	const [currPage, setCurrPage] = useState(1);
	const totalPageNumber = parseInt(
		Math.ceil(filteredPieces.length / PIECES_PER_PAGE)
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
					unreceivedPieces={filteredPieces.slice(
						(currPage - 1) * PIECES_PER_PAGE,
						currPage * PIECES_PER_PAGE
					)}
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
