export { }
const jsPDF = require('jspdf');
declare global {
    const TextField: any;
}

/**
 * Improved text function with halign and valign support
 * Inspiration from: http://stackoverflow.com/questions/28327510/align-text-right-using-jspdf/28433113#28433113
 */
jsPDF.API.autoTableInput = function (value, type, fieldName: string, x: number, y: number, width: number, height: number, styles) {
    styles = styles || {};
    var textField = new TextField();
    textField.Rect = [x, y, width, height];
    textField.multiline = true;
    textField.value = value;
    textField.fieldName = fieldName;
    this.addField(textField);
    return this;
};