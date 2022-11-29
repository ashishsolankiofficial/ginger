export class Restaurant {
    constructor(
        public name: string,
        public zomato_id: number,
        public address: string,
        public latitude: number,
        public longitude: number,
        public image_url: string,
        public do_online_delivery: boolean,
        public city: string,
        public cuisines: string[],

    ) { }
}
