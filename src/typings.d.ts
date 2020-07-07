declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'typewriter-effect' {
  export interface Options {
    strings?: string[];
    cursor?: string;
    delay?: 'natural' | number;
    deleteSpeed?: 'natural' | number;
    loop?: boolean;
    autoStart?: boolean;
    devMode?: boolean;
    wrapperClassName?: string;
    cursorClassName?: string;
  }

  export class Typewriter {
    constructor(container: string | HTMLElement, options: Options);

    start(): Typewriter;
    stop(): Typewriter;
    pause(): Typewriter;
    pauseFor(ms: number): Typewriter;
    typeString(string: string): Typewriter;
    deleteAll(speed?: 'natural' | number): Typewriter;
    changeDeleteSpeed(speed: number): Typewriter;
    changeDelay(delay: number): Typewriter;
    deleteChars(amount: number): Typewriter;
    callFunction(callback: Function, thisArg: Object): Typewriter;
  }

  export interface TypeWriterProps {
    onInit?: (typewriter: Typewriter) => void;
    options?: Options;
  }

  export default class extends React.Component<TypeWriterProps> {}
}
