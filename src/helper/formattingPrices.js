const formattingPrices = price =>
  price.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1 `);
export default formattingPrices;
