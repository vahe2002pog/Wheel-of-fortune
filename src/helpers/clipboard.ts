import { convertToUrl } from "./urlParams";

export function copyLink(players: IPlayer[], defeatPlayers: IPlayer[], defeatMode: boolean): void {
    const hostname = `${window.location.protocol}//${window.location.hostname}`;
    const params = convertToUrl(players, defeatPlayers, defeatMode);
    copyTextToClipboard(`${hostname}/${params}`);
}

function copyTextToClipboard(text: string): Promise<boolean> {
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
    }
    return navigator.clipboard.writeText(text).then(() => {
        console.log('Async: Copying to clipboard was successful!');
        return true;
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
        return false;
    });
}

async function fallbackCopyTextToClipboard(text: string): Promise<boolean> {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise((resolve: (val: boolean) => void) => {
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
            resolve(true);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            resolve(false);
        }
    }).finally(() => {
        document.body.removeChild(textArea);
    });
}

function pastFromBuffer(): Promise<string> {
    if (navigator.clipboard) {
        return navigator.clipboard.readText();
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
        document.body.removeChild(textArea);
        return Promise.resolve(textArea.value);
    }
}

export function getPasteData(): Promise<string[]> {

    return pastFromBuffer().then((pastString) => {
        if (!pastString) {
            return [];
        }
    
        const clear = (items: string[]) => {
            return items.map((item) => {
                return item.trim();
            }).filter(Boolean);
        };

        const pastItems = clear(pastString.search(/\n/) !== -1 ? pastString.split(/\n/) : pastString.split(/\s/));

        const pastList = document.querySelector('#pastList');
        const pastDialog = document.querySelector('#pastDialog') as HTMLDialogElement;
        const yesBtn = document.querySelector('#paste-btn-yes') as HTMLButtonElement;
        const noBtn = document.querySelector('#paste-btn-no') as HTMLButtonElement;

        if (pastList && pastDialog && yesBtn && noBtn) {
            pastList.innerHTML = '';
            pastItems.forEach((item) => {
                const div = document.createElement('div');
                div.classList.add('past-item');
                div.textContent = item;
                pastList.append(div);
            });


            if (pastItems.length > 1) {
                return new Promise((resolve) => {
                    pastDialog.showModal();
                    const close = () => {
                        yesBtn.removeEventListener('click', onYes);
                        noBtn.removeEventListener('click', onNo);
                        pastDialog.close();
                    }
                    const onYes = () => {
                        close();
                        resolve(pastItems);
                    };

                    const onNo = () => {
                        close();
                        resolve([]);
                    };
                    yesBtn.addEventListener('click', onYes);
                    noBtn.addEventListener('click', onNo);

                });
            }
        }
        return [];
    });
}
