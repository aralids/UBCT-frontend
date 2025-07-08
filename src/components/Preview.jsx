const Preview = ({ previewHTML }) => {
	const template = {
		__html: previewHTML,
	};
	return <div dangerouslySetInnerHTML={template} />;
};

export default Preview;
