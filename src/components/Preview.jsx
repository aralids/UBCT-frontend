const Preview = ({ previewHTML }) => {
	if (!previewHTML) {
		return (
			<h1 style={{ color: "black" }} className="preloader-text">
				Loading preview
			</h1>
		);
	}
	const template = {
		__html: previewHTML,
	};
	return <div dangerouslySetInnerHTML={template} />;
};

export default Preview;
