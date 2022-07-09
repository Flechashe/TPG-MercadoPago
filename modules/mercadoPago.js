// Step 7
const mercadoPago = require('mercadopago');
const credential =
    process.env.MP ||
    'TEST-3645381466893064-070611-351447983b87f23645ba15f728ce6668-157889446';
let server = process.env.SERVER || 'http://localhost:3030';
const feedback = `${server}/checkout/feedback`;

const mp = async (items, installments, shipping) => {
    try {
        // Magic
        mercadoPago.configure({
            access_token: credential,
        });
        let config = {
            items: items,
            back_urls: {
                success: feedback,
                failure: feedback,
                pending: feedback,
            },
            payment_methods: {
                installments: installments,
            },
            auto_return: 'approved',
            shipments: {
                cost: shipping,
                mode: 'not_specified',
            },
        };

        let preferences = await mercadoPago.preferences.create(config);
        return preferences;
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = mp;
