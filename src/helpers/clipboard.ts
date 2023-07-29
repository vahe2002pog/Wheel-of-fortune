import { t } from 'i18next';

export function copyLink(): Promise<void> {
    return copyTextToClipboard(window.location.href);
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

export function pastFromBuffer(): Promise<string> {
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

export async function confirmDialog(pastItems: string[], fromInput?: boolean): Promise<string[]> {

    const dialogTitle = document.querySelector('#dialogTitle');
    const pastList = document.querySelector('#pastList');
    const pastDialog = document.querySelector('#pastDialog') as HTMLDialogElement;
    const yesBtn = document.querySelector('#paste-btn-yes') as HTMLButtonElement;
    const noBtn = document.querySelector('#paste-btn-no') as HTMLButtonElement;

    if (pastList && pastDialog && yesBtn && noBtn && dialogTitle) {

        dialogTitle.textContent = fromInput ? t('clipboard.paste-end-msg') : t('clipboard.paste-replace-msg');
        yesBtn.textContent = t('clipboard.dialog-yes-btn');
        noBtn.textContent = t('clipboard.dialog-no-btn');
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
}

export function splitText(text: string, spaces: boolean = true): string[] {
    const clear = (items: string[]) => {
        return items.map((item) => {
            return item.trim();
        }).filter(Boolean);
    };

    if (text.search(/\n/) !== -1) {
        return clear(text.split(/\n/));
    } else if (spaces) {
        return clear(text.split(/\s/));
    }

    return [text];
}
