/**
 * formats numbers by adding , after thousands.
 * @param {number} num
 * @returns string
 */
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export default formatNumber;
