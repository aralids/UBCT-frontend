/**
 * Returns a new array of pieces with the `reclaimAgain` flag updated
 * for the piece matching the given pieceId.
 *
 * This function is pure — it does not mutate the original `pieces` array.
 *
 * @param {Array<Object>} pieces - The current list of pieces.
 * @param {string|number} pieceId - The unique ID of the piece to update.
 * @param {boolean} isChecked - New value for the `reclaimAgain` flag.
 * @returns {Array<Object>} A new array with the updated piece.
 */
const togglePieceFlag = (pieces, pieceId, isChecked) => {
	const currPieces = JSON.parse(JSON.stringify(pieces));
	const pieceIndex = currPieces.findIndex((p) => p.pieceId === pieceId);

	if (pieceIndex === -1) return currPieces;

	currPieces[pieceIndex] = {
		...currPieces[pieceIndex],
		reclaimAgain: isChecked,
	};

	return currPieces;
};

/**
 * Returns a new array of pieces sorted by a given field and order.
 *
 * This function is pure — it does not mutate the original array.
 *
 * @param {Array<Object>} pieces - The array of pieces to sort.
 * @param {string} field - The object key to sort by.
 * @param {"asc"|"desc"} order - Sort order: ascending ("asc") or descending ("desc").
 * @returns {Array<Object>} A new array sorted by the specified field and order.
 */
const sortPiecesBy = (pieces, field, order = "asc") => {
	return [...pieces].sort((a, b) => {
		const aValue = a[field] ?? "";
		const bValue = b[field] ?? "";
		return order === "asc"
			? String(aValue).localeCompare(String(bValue))
			: String(bValue).localeCompare(String(aValue));
	});
};

/**
 * Returns a new array containing only pieces whose acquisition unit name
 * includes the given filter string.
 *
 * This function is pure — it does not mutate the original array.
 *
 * @param {Array<Object>} pieces - The array of pieces to filter.
 * @param {string} filterValue - The text to match in `acqUnitName`.
 * @returns {Array<Object>} A filtered array of pieces.
 */
const filterPiecesByAcqUnit = (pieces, items) => {
	const activeFilters = items
		.filter((item) => item.checked)
		.map((item) => item.label);

	if (activeFilters.length === 0) return [];

	return pieces.filter((piece) =>
		activeFilters.some((label) => piece.acqUnitName === label)
	);
};

const filterPieces = (pieces, filters) => {
	// Build an exclusion map: for each filter category, collect unchecked labels
	const exclusionFilters = Object.entries(filters).reduce((acc, [key, arr]) => {
		if (!Array.isArray(arr)) return acc;
		const uncheckedLabels = arr.filter((f) => !f.checked).map((f) => f.label);
		if (uncheckedLabels.length > 0) {
			acc[key] = uncheckedLabels;
		}
		return acc;
	}, {});

	// ❗ If there are no filters at all, return empty list
	if (Object.keys(filters).length === 0) return [];

	return pieces.filter((piece) =>
		// Piece must satisfy all filter rules
		Object.entries(filters).every(([key, arr]) => {
			const uncheckedLabels = exclusionFilters[key] ?? [];

			// For text-based fields ("include" principle)
			if (["displaySummary", "title"].includes(key)) {
				const pieceValue = piece[key]?.toLowerCase?.() ?? "";

				// Exclude if it *includes* any unchecked string
				return !uncheckedLabels.some((v) =>
					pieceValue.includes(v.toLowerCase())
				);
			}

			// For strict-equality filters
			return !uncheckedLabels.includes(piece[key]);
		})
	);
};

export { togglePieceFlag, sortPiecesBy, filterPiecesByAcqUnit, filterPieces };
