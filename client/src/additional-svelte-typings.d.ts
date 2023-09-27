declare namespace svelteHTML {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface HTMLAttributes<T> {
		'on:outclick'?: (event: CustomEvent) => void;
	}
}
