import React from 'react';
import currency from 'currency.js';
import { useSelector } from 'react-redux';

import storePersist from '@store/storePersist';
import { selectMoneyFormat } from '@store/settings/selectors';

const useMoney = () => {
	const moneyFormat = useSelector(selectMoneyFormat);

	const settingsState = storePersist.get('settings') ? storePersist.get('settings') : moneyFormat;

	const {
		currency_symbol,
		currency_position,
		decimal_sep,
		thousand_sep,
		cent_precision,
		zero_format,
	} = settingsState.money_format_settings;

	const currencyFormat = (amount) => {
		return currency(amount).dollars() > 0 || !zero_format
			? currency(amount, {
				separator: thousand_sep,
				decimal: decimal_sep,
				symbol: '',
				precision: cent_precision,
			}).format()
			: 0 +
			currency(amount, {
				separator: thousand_sep,
				decimal: decimal_sep,
				symbol: '',
				precision: cent_precision,
			}).format();
	}

	const moneyFormatter = ({ amount = 0 }) => {
		return currency_position === 'before'
			? currency_symbol + ' ' + currencyFormat(amount)
			: currencyFormat(amount) + ' ' + currency_symbol;
	}

	const amountFormatter = ({ amount = 0 }) => {
		return currencyFormat(amount);
	}

	const moneyRowFormatter = ({ amount = 0 }) => {
		return {
			props: {
				style: {
					textAlign: 'right',
					whiteSpace: 'nowrap',
				},
			},
			children: (
				<>
				{currency_position === 'before'
					? currency_symbol + ' ' + currencyFormat(amount)
					: currencyFormat(amount) + ' ' + currency_symbol}
				</>
			),
		};
	}

	return {
		decimal_sep,
		zero_format,
		thousand_sep,
		moneyFormatter,
		cent_precision,
		amountFormatter,
		currency_symbol,
		currency_position,
		moneyRowFormatter,
	};
};

export default useMoney;
