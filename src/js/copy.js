function copyLink() {
    const hostname = `${window.location.protocol}//${window.location.hostname}`;
    const params = getUrlParams();
    copyTextToClipboard(`${hostname}/${params}`);
}

function getUrlParams() {
    const checked = $('#checkbox1').prop('checked');
    const list = players.map((item) => item.text).filter(Boolean).join('$_$');
    const des = desPlayers.map((item) => item.text).filter(Boolean).join('$_$');
    return `?checked=${checked}&list=${list}&des=${des}`;
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function pastFromBuffer() {
    if (navigator.clipboard) {
        navigator.clipboard.readText().then((text) => {
            pasteByString(text);
        }).catch((error) => {
            console.error(error);
        });
    } else {
        // fallback
        const textArea = document.createElement('textarea');
        textArea.value = '';

        // Avoid scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('paste');
        pasteByString(textArea.value);
        document.body.removeChild(textArea);
    }
}
