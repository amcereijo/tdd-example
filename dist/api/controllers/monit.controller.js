"use strict";
class MonitContoller {
    constructor() {
        this.message = 'OK';
    }
    get(req, res) {
        res.send({ status: this.message });
    }
}
module.exports = MonitContoller;
