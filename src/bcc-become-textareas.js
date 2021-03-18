(function() {

    // Various selectors inside the BCC that are hidden and would be nice if they were revealed as <textareas>
    const selectors = [
        '#htmlEdit_data',
        '#htmlEdit_description',
        '#htmlEdit_longDescription',
    ];

    // Track if a replacement was made.
    let didReplaceAppletWithTextarea = false;

    // A function to run on each selector to turn it into a textarea.
    const replaceAppletsWithTextareas = (selector) => {
        const input = document.querySelector(selector);

        if (!input) {
            // It is not on the page, this code can't do anything further.
            return;
        }

        // Turn the hidden input into a <textarea>
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

    // Run the transformation function on each selector
    selectors.forEach(it => replaceAppletsWithTextareas(it));


    // If a transformation occurred, then get rid of any java <applet> tags on the page
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


