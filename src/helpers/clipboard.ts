import { convertToUrl } from "./urlParams";

export function copyLink(players: IPlayer[], defeatPlayers: IPlayer[], defeatMode: boolean): Promise<void> {
    const hostname = `${window.location.protocol}//${window.location.hostname}`;
    const params = convertToUrl(players, defeatPlayers, defeatMode);
    return copyTextToClipboard(`${hostname}/${params}`);
}

function copyTextToClipboard(text: string): Promise<void> {
    if (!navigator.clipboard) {
        return fallbackCopyTextToClipboard(text);
    }
    return navigator.clipboard.writeText(text);
}

async function fallbackCopyTextToClipboard(text: string): Promise<void> {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise<void>((resolve, reject) => {
        const successful = document.execCommand('copy');
        if (successful) {
            resolve(undefined);
        } else {
            reject();
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
            throw new Error('Empty buffer');
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
                return new Promise((resolve, reject) => {
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
                        reject('Cancel past');
                    };
                    yesBtn.addEventListener('click', onYes);
                    noBtn.addEventListener('click', onNo);

                });
            }
            throw new Error('One item in buffer');
        }
        throw new Error('Dialog not found');
    });
}
