import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';

Template.autoformTinyMCE.onRendered(function() {
    const initOptions = this.data || {};
    const id = this.firstNode.id;
    initOptions.selector = `#${id}`;
    tinymce.init(initOptions);

    const editor = tinymce.get(id);
    this.autorun(() => {
        const value = Template.currentData().value;

        if (value) {
            editor.setContent(value);
        }
    });
});

Template.autoformTinyMCE.helpers({
    schemaKey() {
        return this.atts['data-schema-key'];
    },
    text() {
        return Template.currentData().value;
    },
    id() {
        return Math.random().toString(36).substring(7);
    }
});

AutoForm.addInputType('tinyMCE', {
    template: 'autoformTinyMCE',
    valueOut() {
        return this.val();
    }
});
