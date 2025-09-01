export class Usuario {

    constructor(
        public email: string,
        public password?: string,
        public name?: string,
        public date?: number,
        public img?: string,
        public phone?: string,
        public role?: string,
        public adress?: string,
        public ident?: number,
        public datenaci?: string,
        public uid?: string,
        public _id?: string,
        public cliente?: string,
        public oficina?: string,
        public pais?: string,
        public block?: boolean,
        public ICCID?: string,
        public IMEI?: string,
        public IMSI?: string,
        public MAC?: string,
        public UUID?: string,
        public indicativo?: number,
        public IMEIPERM?: string,
        public estado?: boolean,
        public device?: string,
        public lat?: number,
        public lng?: number,
        public dirlat?: number,
        public dirlng?: number,
        public busdir?: boolean,
        public nameuser?: string,

        public whatapps?: number,
        public ipconex?: any,

        public direcciono?:any,
        public ciudad?:string,
    ) { }

}
