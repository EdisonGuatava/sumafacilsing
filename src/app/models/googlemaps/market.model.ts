export class Market {

    constructor (
        public lat: number,
        public lng: number,
        public draggable: Boolean,
        public label?: String,
        public _id?: string
    ) { }
}
