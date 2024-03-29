import { afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/react';

import '@testing-library/jest-dom';

afterEach(() => {
	cleanup();
});

const customRender = (ui: React.ReactElement, options = {}) => render(ui, {
	// wrap provider(s) here if needed
	wrapper: ({ children }) => children,
		...options,
});

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// override render export
export { customRender as render };
