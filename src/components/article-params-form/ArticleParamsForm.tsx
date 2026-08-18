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
	OptionType,
} from 'src/constants/articleProps';
import { CSSProperties, FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormPrors = {
	submitFunction: (value: CSSProperties) => void;
	resetFunction: () => void;
};

export const ArticleParamsForm = ({
	submitFunction,
	resetFunction,
}: ArticleParamsFormPrors) => {
	const [isOpen, setIsOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);

	function toggleForm() {
		setIsOpen(!isOpen);
	}

	const [selected, setSelected] =
		useState<ArticleStateType>(defaultArticleState);

	function changeSelected(
		selectedLine: keyof ArticleStateType,
		value: OptionType
	) {
		setSelected((prevState) => ({
			...prevState,
			[selectedLine]: value,
		}));
	}

	function resetSelected() {
		setSelected({
			fontFamilyOption: fontFamilyOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
			fontSizeOption: fontSizeOptions[0],
		});
		resetFunction();
	}

	function submitForm(e: FormEvent) {
		e.preventDefault();
		const settings = {
			'--font-family': selected.fontFamilyOption.value,
			'--font-size': selected.fontSizeOption.value,
			'--font-color': selected.fontColor.value,
			'--container-width': selected.contentWidth.value,
			'--bg-color': selected.backgroundColor.value,
		} as CSSProperties;
		submitFunction(settings);
	}

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => {},
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={rootRef}>
				<form
					className={styles.form}
					onReset={resetSelected}
					onSubmit={submitForm}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						title={'Шрифт'}
						selected={selected.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => {
							changeSelected('fontFamilyOption', value);
						}}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={selected.fontSizeOption}
						title={'Размер шрифта'}
						onChange={(value) => {
							changeSelected('fontSizeOption', value);
						}}
					/>
					<Select
						title={'Цвет шрифта'}
						selected={selected.fontColor}
						options={fontColors}
						onChange={(value) => {
							changeSelected('fontColor', value);
						}}
					/>

					<Separator />

					<Select
						title={'Цвет фона'}
						selected={selected.backgroundColor}
						options={backgroundColors}
						onChange={(value) => {
							changeSelected('backgroundColor', value);
						}}
					/>

					<Select
						title={'Ширина контента'}
						selected={selected.contentWidth}
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
