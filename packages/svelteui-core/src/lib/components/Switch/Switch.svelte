<script lang="ts">
	import { css, randomID } from '$lib/styles';
	import { radius as radiusSizes, sizes } from './Switch.styles';
	import { get_current_component } from 'svelte/internal';
	import { createEventForwarder } from '$lib/internal';
	import type { SwitchProps as $$SwitchProps } from './Switch.styles';

	/** Used for custom classes to be applied to the switch e.g. Tailwind classes */
	export let className: $$SwitchProps['className'] = '';
	export { className as class };
	/** Override prop for custom theming the component */
	export let override: $$SwitchProps['override'] = {};
	/** Override prop for custom theming the component */
	export let overrideLabel: $$SwitchProps['overrideLabel'] = {};
	/** Switch color from theme */
	export let color: $$SwitchProps['color'] = 'blue';
	/** Predefined switch size */
	export let size: $$SwitchProps['size'] = 'sm';
	/** Predefined switch radius size */
	export let radius: $$SwitchProps['radius'] = 'xl';
	/** Predefined transition function for the switch animation */
	export let transitionFunction: $$SwitchProps['transitionFunction'] = 'linear';
	/** The id used to bind input to label, if none is provided an unique ID will be generated */
	export let id: $$SwitchProps['id'] = randomID();
	/** The label to be added outside the switch, by default has none */
	export let label: $$SwitchProps['label'] = '';
	/** The label to be added inside the switch, when the switch is checked, by default has none */
	export let onLabel: $$SwitchProps['onLabel'] = '';
	/** The label to be added inside the switch, when the switch is unchecked, by default has none */
	export let offLabel: $$SwitchProps['offLabel'] = '';
	/** Will set the switch to disabled state */
	export let disabled: $$SwitchProps['disabled'] = false;
	/** The value used to set the value of switch as checked or unchecked */
	export let checked: $$SwitchProps['checked'] = false;
	// --------------------------------------------

	/** An action that forwards inner dom node events from parent component */
	const forwardEvents = createEventForwarder(get_current_component());

	/** Css function to generate switch styles */
	$: SwitchStyles = css({
		focusRing: 'auto',
		overflow: 'hidden',
		WebkitTapHighlightColor: 'transparent',
		position: 'relative',
		borderRadius: radiusSizes[radius],
		backgroundColor: '$gray200',
		border: `1px solid $gray300`,
		height: sizes[size].height,
		width: sizes[size].width,
		minWidth: sizes[size].width,
		margin: 0,
		transitionProperty: 'background-color, border-color',
		transitionTimingFunction: transitionFunction,
		transitionDuration: '150ms',
		boxSizing: 'border-box',
		appearance: 'none',
		display: 'flex',
		alignItems: 'center',
		fontSize: sizes[size].insideLabelFont,
		fontWeight: 600,
		'&::before': {
			zIndex: 1,
			borderRadius: radiusSizes[radius],
			boxSizing: 'border-box',
			content: "''",
			display: 'block',
			backgroundColor: 'White',
			border: `1px solid $gray300`,
			height: sizes[size].handle,
			width: sizes[size].handle,
			transition: `transform 150ms ${transitionFunction}`,
			transform: `translateX(${size === 'xs' ? 1 : 2}px)`,

			'@media (prefers-reduced-motion)': {
				transitionDuration: '0ms'
			}
		},
		'&::after': {
			position: 'absolute',
			zIndex: 0,
			display: 'flex',
			height: '100%',
			alignItems: 'center',
			lineHeight: 0,
			right: '10%',
			transform: 'translateX(0)',
			content: offLabel ? `'${offLabel}'` : "''",
			color: '$gray600',
			transition: `color 150ms ${transitionFunction}`
		},
		'&:checked': {
			backgroundColor: `$${color}600`,
			borderColor: `$${color}600`,

			'&::before': {
				transform: `translateX(${
					sizes[size].width - sizes[size].handle - (size === 'xs' ? 3 : 4)
				}px)`,
				borderColor: 'White'
			},

			'&::after': {
				transform: 'translateX(-200%)',
				content: onLabel ? `'${onLabel}'` : "''",
				color: 'White'
			}
		},
		'&:disabled': {
			backgroundColor: 'Gray',
			borderColor: 'White',
			cursor: 'not-allowed',

			'&::before': {
				borderColor: 'White',
				backgroundColor: 'Gray'
			}
		}
	});
	/** Css function to generate switch label styles */
	const LabelStyles = css({
		fontSize: sizes[size].labelFont,
		lineHeight: `${sizes[size].height}px`,
		fontWeight: 600
	});
</script>

<!--
@component

A user can use this component to enable/disable something, normally used for boolean values or for binary actions.

@see https://svelteui.org/core/switch
@example
    ```tsx
    <Switch/> // standard switch
    <Switch label="Lights" onLabel="ON" offLabel="OFF"/> // switch with labels
    ```
-->
<div class="switch {className}" class:disabled>
	<input
		{id}
		use:forwardEvents
		bind:checked
		type="checkbox"
		class={SwitchStyles({ css: override })}
	/>
	{#if label}
		<label for={id} class="label {LabelStyles({ css: overrideLabel })}">
			{label}
		</label>
	{/if}
</div>

<style>
	.switch {
		display: flex;
		flex-direction: row;
	}

	.label {
		padding-left: 10px;
	}
</style>
