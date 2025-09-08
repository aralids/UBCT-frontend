import { useState, useRef, useEffect } from "react";

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

	const startIndex = (currPage - 1) * PIECES_PER_PAGE;
	const endIndex = Math.min(currPage * PIECES_PER_PAGE, filteredPieces.length);

	// 👇 ref to the bottom element
	const bottomRef = useRef(null);

	// 👇 whenever page changes, scroll into view
	useEffect(() => {
		if (bottomRef.current) {
			bottomRef.current.scrollIntoView({ behavior: "auto" });
		}
	}, [currPage]);

	return (
		<>
			<div
				ref={bottomRef}
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
					filteredPieces={filteredPieces.slice(
						(currPage - 1) * PIECES_PER_PAGE,
						currPage * PIECES_PER_PAGE
					)}
				/>
				<PiecePagination
					currPage={currPage}
					setCurrPage={setCurrPage}
					totalPageNumber={totalPageNumber}
				/>
				<div className="mt-2 mb-2 text-muted">
					<strong>{startIndex}</strong>–<strong>{endIndex}</strong> of{" "}
					<strong>{filteredPieces.length}</strong>
				</div>
			</div>
		</>
	);
};

export default Body;
