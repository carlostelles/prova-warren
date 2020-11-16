import createNumberMask from 'text-mask-addons/dist/createNumberMask';

type Rule = (string | RegExp)[] | string;

export const MASKS = {
    CURRENCY: (str?: string | number): Rule => {
        if (typeof str === 'string' && !str) return '';

        if (typeof str === 'string') {
            return createNumberMask({
                prefix: 'R$ ',
                allowDecimal: true,
                decimalSymbol: ',',
                thousandsSeparatorSymbol: '.',
            });
        }

        return `R$ ${str?.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    }
};
