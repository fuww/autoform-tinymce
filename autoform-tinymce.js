function importPlugin(plugin) {
    return import(`tinymce/plugins/${plugin}/plugin`);
}

Template.autoformTinyMCE.onRendered(function() {
    const initOptions = this.data || {};
    const id = this.firstNode.id;
    initOptions.selector = `#${id}`;
    const plugins = (initOptions.plugins || '')
        .split(', ')
        .filter(plugin => plugin);

    return import('tinymce/tinymce').then(() =>
        import('tinymce/themes/modern/theme').then(() =>
            Promise.all(plugins.map(importPlugin)).then(() => {
                tinymce.init(initOptions);

                const editor = tinymce.get(id);
                this.autorun(() => {
                    const data = Template.currentData();
                    if (!data) {
                        return;
                    }

                    const value = data.value;
                    if (!value) {
                        return;
                    }

                    editor.setContent(value);
                });
            })
        )
    );
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

// this function is not called, it is only here to
// make sure all of these plugins can be loaded dynamically
function importAllPlugins() {
    import('tinymce/plugins/imagetools/plugin');
    import('tinymce/plugins/visualblocks/plugin');
    import('tinymce/plugins/textpattern/plugin');
    import('tinymce/plugins/directionality/plugin');
    import('tinymce/plugins/wordcount/plugin');
    import('tinymce/plugins/lists/plugin');
    import('tinymce/plugins/textcolor/plugin');
    import('tinymce/plugins/legacyoutput/plugin');
    import('tinymce/plugins/codesample/plugin');
    import('tinymce/plugins/importcss/plugin');
    import('tinymce/plugins/template/plugin');
    import('tinymce/plugins/code/plugin');
    import('tinymce/plugins/searchreplace/plugin');
    import('tinymce/plugins/contextmenu/plugin');
    import('tinymce/plugins/nonbreaking/plugin');
    import('tinymce/plugins/print/plugin');
    import('tinymce/plugins/image/plugin');
    import('tinymce/plugins/autoresize/plugin');
    import('tinymce/plugins/autosave/plugin');
    import('tinymce/plugins/tabfocus/plugin');
    import('tinymce/plugins/insertdatetime/plugin');
    import('tinymce/plugins/layer/plugin');
    import('tinymce/plugins/link/plugin');
    import('tinymce/plugins/table/plugin');
    import('tinymce/plugins/charmap/plugin');
    import('tinymce/plugins/colorpicker/plugin');
    import('tinymce/plugins/hr/plugin');
    import('tinymce/plugins/fullpage/plugin');
    import('tinymce/plugins/advlist/plugin');
    import('tinymce/plugins/preview/plugin');
    import('tinymce/plugins/anchor/plugin');
    import('tinymce/plugins/autolink/plugin');
    import('tinymce/plugins/pagebreak/plugin');
    import('tinymce/plugins/fullscreen/plugin');
    import('tinymce/plugins/visualchars/plugin');
    import('tinymce/plugins/save/plugin');
    import('tinymce/plugins/emoticons/plugin');
    import('tinymce/plugins/noneditable/plugin');
    import('tinymce/plugins/spellchecker/plugin');
    import('tinymce/plugins/bbcode/plugin');
    import('tinymce/plugins/paste/plugin');
    import('tinymce/plugins/media/plugin');
}
