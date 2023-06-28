interface IPlayer {
    id: string;
    color: string;
    text: string;
}

interface IAction {
    id: string;
    icon: string;
    title: string;
    handler: (item: IPlayer) => void;
}
