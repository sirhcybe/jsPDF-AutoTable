export { }
const jsPDF = require('jspdf');
declare global {
    const TextField: any;
    const RadioButton: any;
    const CheckBox: any;
    const ComboBox: any;
    const AcroForm: any;
}

/**
 * Improved text function with halign and valign support
 * Inspiration from: http://stackoverflow.com/questions/28327510/align-text-right-using-jspdf/28433113#28433113
 */
jsPDF.API.autoTableInput = function (
    text, type, fieldName: string, 
    x: number, y: number, 
    width: number, height: number, 
    styles: any, 
    options?: string[], value?: string
    ) {
    //styles = styles || {};
    if (type.includes('text')) {
        var textField = new TextField();
        textField.Rect = [x, y, width, height];
        if (type === 'long-text-field') {
            textField.multiline = true;
        }
        textField.value = text;
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
        let k = this.internal.scaleFactor;
        let lineHeight = this.internal.getFontSize() / k;

        let checkBox = new CheckBox();
        checkBox.fieldName = fieldName;
        checkBox.Rect = [x, y + lineHeight, lineHeight, lineHeight];
        checkBox.appearanceState = value === options[0] ? 'On' : 'Off';
        checkBox.value = value;
        this.addField(checkBox);
    } else if (type === 'combobox') {
        var comboBox = new ComboBox();
        comboBox.fieldName = fieldName;
        comboBox.topIndex = 1;
        //Make sure the combobox doesn't get too big
        width = width > height * 20 ? width/3 : width; 
        comboBox.Rect = [x, y, width, height];
        comboBox.setOptions(options);
        comboBox.value = options[0];
        comboBox.defaultValue = options[0];
        this.addField(comboBox);
    }
    return this;
};