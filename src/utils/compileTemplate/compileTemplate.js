import Handlebars from 'handlebars';

import helpers from './helpers';

const compileTemplate = ({ layout, partials, variables }) => {

	let [ render, syntheticLayout ] = ['', ''];

	// register the helpers with Handlebars.
	Object.keys(helpers).forEach((helperName) => {
		Handlebars.registerHelper(helperName, helpers[helperName]);
	});

	// register the partials with Handlebars/
	if (partials) {
		Object.keys(partials || {}).map((partialName) => {
			const partialSource = partials[partialName];
			Handlebars.registerPartial(partialName, partialSource);
		});
	}

	// Add support for non registered layout.
	if (!layout) {
		syntheticLayout = (
			Object.keys(partials).map((layoutPartialName) =>
				`{{> ${layoutPartialName} }}`
			).join(' ')
		);
	}

	// register the template with Handlebars
	const template = Handlebars.compile(layout || syntheticLayout || '');

	render = template(variables);

	return render;
};

export default compileTemplate;
