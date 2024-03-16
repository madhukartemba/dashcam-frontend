import SoundManager from "../sound/SoundManager";

type ActionProps = {
    speed: number | null;
}

type ActionFunction = (props: ActionProps) => void;

export interface ActionMapping {
    [key: string]: ActionFunction;
}

export const ActionMap: ActionMapping = {
    'red,green': ({ speed }) => SoundManager.playGreenSound(),
    'yellow,green': ({ speed }) => SoundManager.playGreenSound(),
    'null,green': ({ speed }) => {
        if (speed && speed < 5) {
            SoundManager.playGreenSound();
        }
    },
    'green,yellow': ({ speed }) => SoundManager.playYellowSound(),
    'null,yellow': ({ speed }) => SoundManager.playYellowSound(),
    'green,red': ({ speed }) => SoundManager.playRedSound(),
    'yellow,red': ({ speed }) => SoundManager.playRedSound(),
    'null,red': ({ speed }) => SoundManager.playRedSound(),
};

export class Actions {
    private prevIndex: string | null;
    private actions: ActionMapping;
    private noneCount: number;
    private bufferSize: number;

    constructor(actions: ActionMapping, bufferSize: number = 8, initialIndex: string | null = null) {
        this.prevIndex = initialIndex;
        this.actions = actions;
        this.noneCount = 0;
        this.bufferSize = bufferSize;
    }

    updateBufferSize(bufferSize: number): void {
        if (this.noneCount > bufferSize) {
            this.noneCount = this.bufferSize;
            this.prevIndex = null;
        }
        this.bufferSize = bufferSize;
    }

    act(index: string | null, actionProps: ActionProps): void {
        let actionKey = `${this.prevIndex},${index}`;
        if (index === null) {
            this.noneCount += 1;
            if (this.noneCount >= this.bufferSize) {
                this.noneCount = this.bufferSize;
                this.prevIndex = null;
                actionKey = `${this.prevIndex},${index}`
            }
        } else {
            this.prevIndex = index;
            this.noneCount = 0;
        }

        if (this.actions[actionKey]) {
            this.actions[actionKey](actionProps);
        }
    }
}
