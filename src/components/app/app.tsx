import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const defaultSettings = {
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties;

	const [style, setStyle] = useState(defaultSettings);

	function submitChange(style: CSSProperties) {
		setStyle(style);
	}

	function resetStyle() {
		setStyle(defaultSettings);
	}

	return (
		<main className={clsx(styles.main)} style={style}>
			<ArticleParamsForm
				submitFunction={submitChange}
				resetFunction={resetStyle}
			/>
			<Article />
		</main>
	);
};
