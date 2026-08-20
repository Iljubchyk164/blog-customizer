import { ArticleStateType } from 'src/constants/articleProps';
import { CSSProperties } from 'react';

export function convertToCSS(state: ArticleStateType): CSSProperties {
	return {
		'--font-family': state.fontFamilyOption.value,
		'--font-size': state.fontSizeOption.value,
		'--font-color': state.fontColor.value,
		'--container-width': state.contentWidth.value,
		'--bg-color': state.backgroundColor.value,
	} as CSSProperties;
}
