<script lang="ts">
	import { css } from '$lib/styles';
	import type { ImageProps as $$ImageProps } from '../Image.styles';

	/** Override prop for custom theming the component's placeholder */
	export let override: $$ImageProps['override'] = {};
	/** Predefined radius size from theme or number to set border-radius in px */
	export let radius: $$ImageProps['radius'] = 0;
	/** The image src to be used */
	export let src: $$ImageProps['src'] = '';
	/** The width of the image that defaults to 100% */
	export let width: $$ImageProps['width'] = undefined;
	/** The height of the image that defaults to the original image height adjusted to the width */
	export let height: $$ImageProps['height'] = undefined;

	$: BackgroundImageStyles = css({
		focusRing: 'auto',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		display: 'block',
		width: width !== undefined ? `${width}%` : 'auto',
		height: height !== undefined ? `${height}%` : 'auto',
		border: 0,
		textDecoration: 'none',
		color: 'White',
		backgroundImage: `url(${src})`,
		borderRadius: typeof radius === 'string' ? `$${radius}` : radius,
		padding: '16px'
	});
</script>

<!--
@component

BackgroundImage component can be used to add any content on image. It is useful for hero headers and other similar sections

@see https://svelteui.org/core/image
@example
    ```svelte
		<script>
			const src = 'https://images.unsplash.com/photo-1649014048485-590f93c42936?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
		</script>
	
		<BackgroundImage radius="sm" {src}>
			This content will be shown over the image
		</BackgroundImage>
    ```

	It is suggested to wrap your component in a container element
-->

<div class={BackgroundImageStyles({ css: override })}>
	<slot>Text</slot>
</div>
