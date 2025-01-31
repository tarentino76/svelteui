<script lang="ts">
	import { css, vFunc } from '$lib/styles';
	import { get_current_component } from 'svelte/internal';
	import { createEventForwarder, useActions } from '$lib/internal';
	import { ButtonErrors } from './Button.errors';
	import { sizes } from './Button.styles';
	import Error from '$lib/internal/errors/Error.svelte';
	import Loader from '../Loader/Loader.svelte';
	import Ripple from './Ripple.svelte';
	import type { ButtonProps as $$ButtonProps } from './Button.styles';

	/** Used for forwarding actions from component */
	export let use: $$ButtonProps['use'] = [];
	/** Used for components to bind to elements */
	export let element: $$ButtonProps['element'] = undefined;
	/** Used for custom classes to be applied to the button e.g. Tailwind classes */
	export let className: $$ButtonProps['className'] = '';
	export { className as class };
	/** Override prop for custom theming the component */
	export let override: $$ButtonProps['override'] = {};
	/** Controls button appearance */
	export let variant: $$ButtonProps['variant'] = 'filled';
	/** Button color from theme */
	export let color: $$ButtonProps['color'] = 'blue';
	/** Predefined button size */
	export let size: $$ButtonProps['size'] = 'sm';
	/** Button border-radius from theme or number to set border-radius in px */
	export let radius: $$ButtonProps['radius'] = 'sm';
	/** Controls gradient settings in gradient variant only */
	export let gradient: $$ButtonProps['gradient'] = { from: 'indigo', to: 'cyan', deg: 45 };
	/** Loader position relative to button label */
	export let loaderPosition: $$ButtonProps['loaderPosition'] = 'left';
	/** Props passed to Loader component */
	export let loaderProps: $$ButtonProps['loaderProps'] = {
		size: 'xs',
		color: 'white',
		variant: 'circle'
	};
	/** Applies an href to the button component and converts it to an anchor tag */
	export let href: $$ButtonProps['href'] = '';
	/** If external is set to true, target = _blank */
	export let external: $$ButtonProps['external'] = false;
	/** disabled will set button to disabled state */
	export let disabled: $$ButtonProps['disabled'] = false;
	/** compact will set button to compact state */
	export let compact: $$ButtonProps['compact'] = false;
	/** loading will set button to loading state */
	export let loading: $$ButtonProps['loading'] = false;
	/** uppercase will set button text to uppercase */
	export let uppercase: $$ButtonProps['uppercase'] = false;
	/** fullSize will set button width to 100% */
	export let fullSize: $$ButtonProps['fullSize'] = false;
	/** ripple will add a mui ripple effect to the button on click */
	export let ripple: $$ButtonProps['ripple'] = false;

	/** An action that forwards inner dom node events from parent component */
	const forwardEvents = createEventForwarder(get_current_component());

	/** Css function to generate button styles */
	$: ButtonStyles = css({
		focusRing: 'auto',
		cursor: 'pointer',
		position: 'relative',
		boxSizing: 'border-box',
		textDecoration: 'none',
		outline: 'none',
		userSelect: 'none',
		appearance: 'none',
		textAlign: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: null,
		borderRadius: typeof radius === 'number' ? radius : `$${radius}`,
		height: sizes[compact ? `compact-${size}` : size].height,
		padding: sizes[compact ? `compact-${size}` : size].padding,
		fontFamily: '$standard',
		fontWeight: '$SemiBold',
		fontSize: `$${size}`,
		lineHeight: 1,
		flexGrow: 0,
		width: fullSize ? '100%' : 'auto',
		'&:hover': {
			backgroundColor: variant === 'gradient' ? null : `$${color}700`,
			backgroundSize: variant === 'gradient' ? '200%' : null
		},
		'&:active': {
			transform: 'translateY(1px)'
		},
		[`&.loading`]: {
			pointerEvents: 'none',
			'&::before': {
				content: '""',
				position: 'absolute',
				inset: -1,
				backgroundColor: 'rgba(255, 255, 255, .5)',
				borderRadius: `$${radius}`,
				cursor: 'not-allowed'
			}
		},
		[`&.disabled`]: {
			pointerEvents: 'none',
			borderColor: 'transparent',
			backgroundColor: 'rgb(233, 236, 239)',
			background: 'rgb(233, 236, 239)',
			color: 'rgb(173, 181, 189)',
			cursor: 'not-allowed'
		},
		variants: {
			variation: vFunc(color, gradient)
		}
	});

	// --------------Error Handling-------------------
	let observable: boolean = false;
	let err;

	if (disabled && loading) {
		observable = true;
		err = ButtonErrors[0];
	}
	if (external && !loading) {
		observable = true;
		err = ButtonErrors[1];
	}

	$: if (observable) override = { display: 'none' };
</script>

<Error {observable} component="Button" code={err} />

<!--
@component
A user can perform an immediate action by pressing a button. It's frequently used to start an action, but it can also be used to link to other pages.

@see https://svelteui.org/core/button
@example
    ```tsx
    <Button>Click</Button> // standard button
    <Button variant='gradient' gradient={{from: 'blue', to: 'red', deg: 45}}>Click Me</Button> // gradient button
    ```
-->

{#if href && !disabled}
	<a
		bind:this={element}
		{href}
		use:useActions={use}
		use:forwardEvents
		class:disabled
		class:compact
		class:uppercase
		class:loading
		class="{className} {ButtonStyles({ css: override, variation: variant })}"
		role="button"
		rel="noreferrer noopener"
		target={external ? '_blank' : '_self'}
		{...$$restProps}
		tabindex="0"
	>
		{#if loading && loaderPosition === 'left'}
			<span class="loader-left">
				<Loader variant={loaderProps.variant} size={loaderProps.size} color={loaderProps.color} />
			</span>
		{:else if $$slots.leftIcon}
			<span class="loader-left">
				<slot name="leftIcon">X</slot>
			</span>
		{/if}
		<slot>Button</slot>
		{#if ripple}
			<Ripple center={false} circle={false} />
		{/if}
		{#if loading && loaderPosition === 'right'}
			<span class="loader-right">
				<Loader variant={loaderProps.variant} size={loaderProps.size} color={loaderProps.color} />
			</span>
		{:else if $$slots.rightIcon}
			<span class="loader-right">
				<slot name="rightIcon">X</slot>
			</span>
		{/if}
	</a>
{:else}
	<button
		bind:this={element}
		use:useActions={use}
		use:forwardEvents
		class="{className} {ButtonStyles({ css: override, variation: variant })}"
		class:disabled
		class:compact
		class:uppercase
		class:loading
		{disabled}
		{...$$restProps}
		tabindex="0"
	>
		{#if loading && loaderPosition === 'left'}
			<span class="loader-left">
				<Loader variant={loaderProps.variant} size={loaderProps.size} color={loaderProps.color} />
			</span>
		{:else if $$slots.leftIcon}
			<span class="loader-left">
				<slot name="leftIcon">X</slot>
			</span>
		{/if}
		<slot>Button</slot>
		{#if ripple}
			<Ripple center={false} circle={false} />
		{/if}
		{#if loading && loaderPosition === 'right'}
			<span class="loader-right">
				<Loader variant={loaderProps.variant} size={loaderProps.size} color={loaderProps.color} />
			</span>
		{:else if $$slots.rightIcon}
			<span class="loader-right">
				<slot name="rightIcon">X</slot>
			</span>
		{/if}
	</button>
{/if}

<style>
	.uppercase {
		text-transform: uppercase;
	}
	.loader-left {
		margin-right: 10px;
	}
	.loader-right {
		margin-left: 10px;
	}
</style>
