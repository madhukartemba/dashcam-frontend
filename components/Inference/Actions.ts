import SoundManager from '../sound/SoundManager';

type ActionProps = {
  speed: number | null;
};

type ActionFunction = (props: ActionProps) => void;

export interface ActionMapping {
  [key: string]: ActionFunction;
}

const THRESHOLD_SPEED = 3;

export const ActionMap: ActionMapping = {
  'red,green': ({speed}) => {
    if (speed !== null && speed > THRESHOLD_SPEED) {
      return;
    }
    SoundManager.playGreenSound();
  },
  'yellow,green': ({speed}) => {
    if (speed !== null && speed > THRESHOLD_SPEED) {
      return;
    }
    SoundManager.playGreenSound();
  },
  'null,green': ({speed}) => {
    if (speed !== null && speed < THRESHOLD_SPEED) {
      SoundManager.playGreenSound();
    }
  },
  'red,yellow': ({speed}) => {
    if (speed !== null && speed < THRESHOLD_SPEED) {
      return;
    }
    SoundManager.playYellowSound();
  },
  'green,yellow': ({speed}) => {
    if (speed !== null && speed < THRESHOLD_SPEED) {
      return;
    }
    SoundManager.playYellowSound();
  },
  'null,yellow': ({speed}) => {
    if (speed !== null && speed < THRESHOLD_SPEED) {
      return;
    }
    SoundManager.playYellowSound();
  },
  'green,red': ({speed}) => {
    if (speed !== null && speed < THRESHOLD_SPEED) {
      return;
    }
    SoundManager.playRedSound();
  },
  'yellow,red': ({speed}) => {
    if (speed !== null && speed < THRESHOLD_SPEED) {
      return;
    }
    SoundManager.playRedSound();
  },
  'null,red': ({speed}) => {
    if (speed !== null && speed < THRESHOLD_SPEED) {
      return;
    }
    SoundManager.playRedSound();
  },
};

export class Actions {
  private prevIndex: string | null;
  private actions: ActionMapping;
  private noneCount: number;
  private bufferSize: number;

  constructor(
    actions: ActionMapping,
    bufferSize: number = 8,
    initialIndex: string | null = null,
  ) {
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
        actionKey = `${this.prevIndex},${index}`;
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
