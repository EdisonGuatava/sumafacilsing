export class Directions {

    constructor (
        public origen: object,
        public destino: object,
        public waypoints: object,
        public show: boolean,
        public nombre?: string,
        public ubica?: number,
        public checpoints?: object,
    ) { }
}
