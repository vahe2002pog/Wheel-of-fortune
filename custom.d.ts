interface IPlayer {
    id: string;
    color: string;
    text: string;
    isLink?: boolean;
}

interface IAction {
    id: string;
    icon: string;
    title: string;
    handler: (item: IPlayer) => void;
}
