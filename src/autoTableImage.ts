export { }
const jsPDF = require('jspdf');

/**
 * Displays an image in a table cell
 */
jsPDF.API.autoTableInput = function (imageDataUri, x: number, y: number, width: number, height: number, styles) {
    styles = styles || {};
    this.addImage(imageDataUri, 'PNG', x, y, width, height);
    return this;
};