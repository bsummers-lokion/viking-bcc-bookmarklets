(function() {
    const selectors = [
        '#htmlEdit_data',
        '#htmlEdit_description',
        '#htmlEdit_longDescription',
    ];

    let didReplaceAppletWithTextarea = false;

    const replaceAppletsWithTextareas = (selector) => {
        const input = document.querySelector(selector);
        if (!input) {
            return;
        }
        const name = input.getAttribute('name');
        const id = input.getAttribute('id');
        const value = input.getAttribute('value');
        const textarea = document.createElement('textarea');
        textarea.rows = '50';
        textarea.cols = '50';
        textarea.name = name;
        textarea.value = value;
        textarea.id = id;
        input.parentNode.replaceChild(textarea, input);
        didReplaceAppletWithTextarea = true;
    }

    selectors.forEach(it => replaceAppletsWithTextareas(it));
    if (didReplaceAppletWithTextarea) {
        // Remove applets and applet-adjacent stuff
        document.querySelectorAll('applet,.appletHome').forEach((el, i) => {
            el.parentNode.removeChild(el);
        });

        // Update the `href` attribute of the apply button
        const applyButton = document.querySelectorAll('a.mainContentButton.save').forEach(el => {
            el.setAttribute('href', 'javascript:saveChanges({viewNumber:"0"});');
        });
    }
    return;
}());


