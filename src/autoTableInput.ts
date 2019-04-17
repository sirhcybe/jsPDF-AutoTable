export { }
const jsPDF = require('jspdf');
declare global {
    const TextField: any;
    const RadioButton: any;
    const CheckBox: any;
    const AcroForm: any;
}

/**
 * Improved text function with halign and valign support
 * Inspiration from: http://stackoverflow.com/questions/28327510/align-text-right-using-jspdf/28433113#28433113
 */
jsPDF.API.autoTableInput = function (value, type, fieldName: string, x: number, y: number, width: number, height: number, styles: any, options?: string[]) {
    //styles = styles || {};
    if (type.includes('text')) {
        var textField = new TextField();
        textField.Rect = [x, y, width, height];
        if (type === 'long-text-field') {
            textField.multiline = true;
        }
        textField.value = value;
        textField.fieldName = fieldName;
        this.addField(textField);
    } else if (type === 'radio') {
        var radioGroup = new RadioButton();
        radioGroup.value = value;
        radioGroup.fieldName = fieldName;
        //radioGroup.Subtype = "Form";
        this.addField(radioGroup);
        let k = this.internal.scaleFactor;
        let lineHeight = this.internal.getFontSize() / k;
        options.forEach((option, index) => {
            var radioButton = radioGroup.createOption(option);
            radioButton.Rect = [x, y + (lineHeight * index), lineHeight, lineHeight];
            if (option === value) {
                radioButton.AS = '/' + option;
            }

            let FONT_ROW_RATIO = 1.15;
            let fontSize = this.internal.getFontSize() / k;
            let labelY = y + (lineHeight * index) + fontSize * (2 - FONT_ROW_RATIO);
            this.text(option, x + lineHeight, labelY);
        });
        radioGroup.setAppearance(AcroForm.Appearance.RadioButton.Cross);
    } else if (type === 'checkbox') {
        options.forEach((option, index) => {
            let k = this.internal.scaleFactor;
            let lineHeight = this.internal.getFontSize() / k;

            var checkBox = new CheckBox();
            checkBox.fieldName = fieldName + index;
            checkBox.Rect = [x, y + (lineHeight * index), lineHeight, lineHeight];
            this.addField(checkBox);

            let FONT_ROW_RATIO = 1.15;
            let fontSize = this.internal.getFontSize() / k;
            let labelY = y + (lineHeight * index) + fontSize * (2 - FONT_ROW_RATIO);
            this.text(option, x + lineHeight, labelY);
        });
    }
    return this;
};