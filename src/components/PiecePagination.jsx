import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const PiecePagination = ({ currPage, setCurrPage, totalPageNumber }) => {
	const [inputValue, setInputValue] = useState("");
	const [isInvalid, setIsInvalid] = useState(false);

	// Handle typing
	const handlePageInput = (e) => {
		const value = e.target.value;
		if (value === "" || /^\d+$/.test(value)) {
			setInputValue(value);
			setIsInvalid(false);
		}
	};

	// Validate and go
	const goToPage = () => {
		const page = Number(inputValue);
		if (page >= 1 && page <= totalPageNumber) {
			setCurrPage(page);
			setInputValue("");
			setIsInvalid(false);
		} else {
			setIsInvalid(true);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			goToPage();
		}
	};

	// Pagination items before/after current page
	let pagesBeforeActive = <></>;
	if (currPage === 2) {
		pagesBeforeActive = (
			<Pagination.Item onClick={() => setCurrPage(1)}>{1}</Pagination.Item>
		);
	} else if (currPage === 3) {
		pagesBeforeActive = (
			<>
				<Pagination.Item onClick={() => setCurrPage(1)}>{1}</Pagination.Item>
				<Pagination.Item onClick={() => setCurrPage(2)}>{2}</Pagination.Item>
			</>
		);
	} else if (currPage > 3) {
		pagesBeforeActive = (
			<>
				<Pagination.Item onClick={() => setCurrPage(1)}>{1}</Pagination.Item>
				<Pagination.Ellipsis />
				<Pagination.Item onClick={() => setCurrPage(currPage - 1)}>
					{currPage - 1}
				</Pagination.Item>
			</>
		);
	}

	let pagesAfterActive = <></>;
	if (currPage === totalPageNumber - 1) {
		pagesAfterActive = (
			<Pagination.Item onClick={() => setCurrPage(totalPageNumber)}>
				{totalPageNumber}
			</Pagination.Item>
		);
	} else if (currPage === totalPageNumber - 2) {
		pagesAfterActive = (
			<>
				<Pagination.Item onClick={() => setCurrPage(totalPageNumber - 1)}>
					{totalPageNumber - 1}
				</Pagination.Item>
				<Pagination.Item onClick={() => setCurrPage(totalPageNumber)}>
					{totalPageNumber}
				</Pagination.Item>
			</>
		);
	} else if (currPage < totalPageNumber - 2) {
		pagesAfterActive = (
			<>
				<Pagination.Item onClick={() => setCurrPage(currPage + 1)}>
					{currPage + 1}
				</Pagination.Item>
				<Pagination.Ellipsis />
				<Pagination.Item onClick={() => setCurrPage(totalPageNumber)}>
					{totalPageNumber}
				</Pagination.Item>
			</>
		);
	}

	return (
		<div
			className="d-flex align-items-center flex-wrap justify-content-center gap-3 mt-3"
			style={{
				backgroundColor: "#f8f9fa",
				borderRadius: "1rem",
				padding: "0.75rem 1rem",
				boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
			}}
		>
			<Pagination className="mb-0">
				<Pagination.First onClick={() => setCurrPage(1)} />
				<Pagination.Prev
					onClick={() => currPage > 1 && setCurrPage(currPage - 1)}
				/>
				{pagesBeforeActive}
				<Pagination.Item active>{currPage}</Pagination.Item>
				{pagesAfterActive}
				<Pagination.Next
					onClick={() =>
						currPage < totalPageNumber && setCurrPage(currPage + 1)
					}
				/>
				<Pagination.Last onClick={() => setCurrPage(totalPageNumber)} />
			</Pagination>

			<InputGroup
				size="sm"
				style={{ width: "160px", borderRadius: "0.5rem", overflow: "hidden" }}
			>
				<Form.Control
					type="text"
					placeholder="Page #"
					value={inputValue}
					onChange={handlePageInput}
					onKeyDown={handleKeyDown}
					isInvalid={isInvalid}
					className="text-center"
				/>
				<Button
					variant="outline-primary"
					onClick={goToPage}
					style={{ fontWeight: 500 }}
				>
					Go
				</Button>
				<Form.Control.Feedback type="invalid">
					1–{totalPageNumber} only
				</Form.Control.Feedback>
			</InputGroup>
		</div>
	);
};

export default PiecePagination;
