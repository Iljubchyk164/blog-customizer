import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	submitFunction: (value: ArticleStateType) => void;
	resetFunction: () => void;
};

export const ArticleParamsForm = ({
	submitFunction,
	resetFunction,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);

	function toggleForm() {
		setIsSidebarOpen(!isSidebarOpen);
	}

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	function changeSelected<T extends keyof ArticleStateType>(
		selectedLine: T,
		value: ArticleStateType[T]
	) {
		setFormState((prevState) => ({
			...prevState,
			[selectedLine]: value,
		}));
	}

	function resetSelected() {
		setFormState(defaultArticleState);
		resetFunction();
	}

	function submitForm(e: FormEvent) {
		e.preventDefault();
		submitFunction(formState);
	}

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef,
		onChange: setIsSidebarOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}
				ref={rootRef}>
				<form
					className={styles.form}
					onReset={resetSelected}
					onSubmit={submitForm}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						title={'Шрифт'}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => {
							changeSelected('fontFamilyOption', value);
						}}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title={'Размер шрифта'}
						onChange={(value) => {
							changeSelected('fontSizeOption', value);
						}}
					/>
					<Select
						title={'Цвет шрифта'}
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) => {
							changeSelected('fontColor', value);
						}}
					/>

					<Separator />

					<Select
						title={'Цвет фона'}
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) => {
							changeSelected('backgroundColor', value);
						}}
					/>

					<Select
						title={'Ширина контента'}
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => {
							changeSelected('contentWidth', value);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
