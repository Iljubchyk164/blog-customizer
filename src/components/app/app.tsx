import { useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';

import styles from './app.module.scss';
import { convertToCSS } from 'src/utils/utils';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const articleStyle = convertToCSS(articleState);

	function submitChange(newState: ArticleStateType) {
		setArticleState(newState);
	}

	function resetStyle() {
		setArticleState(defaultArticleState);
	}

	return (
		<main className={clsx(styles.main)} style={articleStyle}>
			<ArticleParamsForm
				submitFunction={submitChange}
				resetFunction={resetStyle}
			/>
			<Article />
		</main>
	);
};
