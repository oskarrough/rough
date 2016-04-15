// This is just an example of how to structure a module.
export const $ = selector => {
	return document.querySelectorAll(selector);
};

export default $;
