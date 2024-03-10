import SoundManager from "../sound/SoundManager";

type ActionFunction = () => void;

export interface ActionMapping {
    [key: string]: ActionFunction;
}

export const ActionMap: ActionMapping = {
    'red,green': () => SoundManager.playGreenSound(),
    'yellow,green': () => SoundManager.playGreenSound(),
    'green,yellow': () => SoundManager.playYellowSound(),
    'null,yellow': () => SoundManager.playYellowSound(),
    'green,red': () => SoundManager.playRedSound(),
    'yellow,red': () => SoundManager.playRedSound(),
    'null,red': () => SoundManager.playRedSound(),
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

    act(index: string | null): void {
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
            this.actions[actionKey]();
        }
    }
}

