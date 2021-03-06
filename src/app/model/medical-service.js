"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tax_1 = require("./Tax");
var MedicalService = (function () {
    function MedicalService() {
        this.id = 0;
        this.fee = 0;
        this.cost = 0;
        this.branches = [];
        this.checkedBranches = [];
        this.departments = [];
        this.checkedDepartments = [];
        this.tax = new Tax_1.Tax();
        this.duration = 0;
    }
    return MedicalService;
}());
exports.MedicalService = MedicalService;
//# sourceMappingURL=medical-service.js.map