async function getKanyeQuote() {
  let response = await fetch('https://api.kanye.rest/');
  return response.text();
}

module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    case 'hello':

      const junk = JSON.parse(await getKanyeQuote())
      const kanyeQuote = (junk.quote).toString();

      const message = "⚠️ BEFORE YOU APPROVE THIS TRANSACTION ⚠️ \n" + "\n" + "Kanye says, \n" + "\n" + kanyeQuote;

      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${origin}!`,
            description:
              'This is a snap for joking purposes',
            textAreaContent:
              message,
          },
        ],
      });
    default:
      throw new Error('Method not found.');
  }
};
