import Pagination from "react-bootstrap/Pagination";

const OrderPagination = ({ currPage, setCurrPage, totalPageNumber }) => {
	let pagesBeforeActive = <></>;
	if (currPage === 2) {
		pagesBeforeActive = (
			<>
				<Pagination.Item onClick={() => setCurrPage(1)}>{1}</Pagination.Item>
			</>
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
			<>
				<Pagination.Item onClick={() => setCurrPage(totalPageNumber)}>
					{totalPageNumber}
				</Pagination.Item>
			</>
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
		<Pagination>
			<Pagination.First onClick={() => setCurrPage(1)} />
			<Pagination.Prev
				onClick={() => {
					if (currPage > 1) {
						setCurrPage(currPage - 1);
					}
				}}
			/>
			{pagesBeforeActive}
			<Pagination.Item active>{currPage}</Pagination.Item>
			{pagesAfterActive}
			<Pagination.Next
				onClick={() => {
					if (currPage < totalPageNumber) {
						setCurrPage(currPage + 1);
					}
				}}
			/>
			<Pagination.Last onClick={() => setCurrPage(totalPageNumber)} />
		</Pagination>
	);
};

export default OrderPagination;
