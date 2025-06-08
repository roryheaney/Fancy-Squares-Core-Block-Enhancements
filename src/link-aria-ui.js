import { addFilter } from "@wordpress/hooks";
import { TextControl } from "@wordpress/components";
import { createElement } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Extend the LinkControl component to include a text field that sets
 * the `data-aria-label-text` attribute on the link element.
 * This allows custom screen reader text when a link opens in a new window.
 */
function addAriaTextSetting(LinkControl) {
	return function (props) {
		const ariaText =
			props?.value?.attributes?.["data-aria-label-text"] || "";

		const updateAriaText = (newText) => {
			const value = {
				...props.value,
				attributes: {
					...(props.value?.attributes || {}),
					"data-aria-label-text": newText || undefined,
				},
			};
			props.onChange(value);
		};

		const extraSetting = {
			id: "ariaLabelText",
			title: __("Aria label text", "fs-blocks"),
			content: createElement(TextControl, {
				label: __("ARIA label text", "fs-blocks"),
				value: ariaText,
				onChange: updateAriaText,
			}),
		};

		const settings = [...(props.settings || []), extraSetting];

		return createElement(LinkControl, { ...props, settings });
	};
}
addFilter(
	"editor.LinkControl",
	"fancy-squares-core-enhancements/aria-link-setting",
	addAriaTextSetting,
);
