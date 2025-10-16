/**
 * Sanitizes a user-provided note string to ensure it is safe and consistent for sending in emails.
 *
 * The sanitization steps are:
 * 1. `trim()` – removes leading and trailing whitespace.
 * 2. `.normalize("NFKC")` – applies Unicode normalization (NFKC form),
 *    converting characters with compatibility equivalents into their standard forms
 *    (e.g. "①" → "1", "Ⅳ" → "IV").
 * 3. `.replace(/<[^>]*>/g, "")` – strips out any HTML tags to prevent injection.
 * 4. `.replace(/[^\x20-\x7E\n\t]/g, "")` – removes non-printable ASCII characters
 *    except for newline (`\n`) and tab (`\t`).
 * 5. `.replace(/[ \t]+/g, " ")` – collapses consecutive spaces or tabs into a single space.
 *
 * @param {string} note - The raw note text provided by the user.
 * @returns {string} A sanitized, plain-text note safe to include in an email.
 */
const sanitizeNote = (note) => {
	return note
		.trim()
		.normalize("NFKC")
		.replace(/<[^>]*>/g, "")
		.replace(/[^\x20-\x7E\n\t]/g, "")
		.replace(/[ \t]+/g, " ");
};

export { sanitizeNote };
