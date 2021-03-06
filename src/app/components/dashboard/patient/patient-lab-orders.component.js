"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var app_constants_1 = require("../../../utils/app.constants");
var requests_service_1 = require("../../../services/requests.service");
var notification_service_1 = require("../../../services/notification.service");
var patient_1 = require("../../../model/patient");
var his_util_service_1 = require("../../../services/his-util.service");
var ConformationDialogService_1 = require("../../../services/ConformationDialogService");
var PatientLabOrdersComponent = (function () {
    function PatientLabOrdersComponent(router, route, fb, requestService, notificationService, hISUtilService, confirmationDialogService) {
        this.router = router;
        this.route = route;
        this.fb = fb;
        this.requestService = requestService;
        this.notificationService = notificationService;
        this.hISUtilService = hISUtilService;
        this.confirmationDialogService = confirmationDialogService;
        this.pages = [];
        this.labTest = [];
        this.dateTest = new Date();
        this.allOrders = [];
        this.filteredLabTest = [];
        this.patient = new patient_1.Patient();
    }
    PatientLabOrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.createLabOrderForm();
        this.loadRecord();
        this.labForm.controls['patientId'].setValue(this.id);
        this.getLabOrderFromServer(0);
        //  this.addMoreTest();
    };
    PatientLabOrdersComponent.prototype.goToUserDashBoard = function () {
        this.router.navigate(['/dashboard/' + atob(localStorage.getItem(btoa('user_type'))) + '/']);
    };
    PatientLabOrdersComponent.prototype.getLabOrderFromServer = function (page) {
        var _this = this;
        if (page > 0) {
            page = page;
        }
        this.requestService.getRequestWithParam(app_constants_1.AppConstants.FETCH_ALL_ORDER_BY_PATIENT_URL + page, this.id)
            .subscribe(function (response) {
            if (response['responseCode'] === 'LAB_ORDER_SUC_02') {
                _this.nextPage = response['responseData']['nextPage'];
                _this.prePage = response['responseData']['prePage'];
                _this.currPage = response['responseData']['currPage'];
                _this.pages = response['responseData']['pages'];
                _this.allOrders = response['responseData']['data'];
            }
            if (response['responseCode'] == 'LAB_ORDER_ERR_02') {
                _this.notificationService.error("Error " + response['responseMessage']);
            }
        }, function (error) {
            _this.error = error.error.error;
        });
    };
    PatientLabOrdersComponent.prototype.loadRecord = function () {
        var _this = this;
        this.requestService.getRequest(app_constants_1.AppConstants.PATIENT_FETCH_URL + this.id).subscribe(function (response) {
            if (response['responseCode'] === 'USER_SUC_01') {
                _this.patient = response['responseData'];
                //this.patient.races = JSON.parse(response['responseData'].racesString);
            }
            else {
                _this.notificationService.error(response['responseMessage'], 'Patient');
                // this.router.navigate(['404-not-found'])
            }
        }, function (error) {
            _this.hISUtilService.tokenExpired(error.error.error);
        });
    };
    PatientLabOrdersComponent.prototype.createLabOrderForm = function () {
        this.labForm = this.fb.group({
            'orderStatus': [null],
            'orderTestDate': [null],
            'doctorSignOff': [null],
            'comments': [null],
            'patientId': [null],
            'appointmentId': [null],
            'selectedAppointment': [null, forms_1.Validators.required],
            'labTest': this.fb.array([this.createLabTest()]),
        });
    };
    PatientLabOrdersComponent.prototype.createLabTest = function () {
        return this.fb.group({
            'loincCode': '',
            'description': '',
            'resultValue': '',
            'units': '',
            'normalRange': '',
        });
    };
    PatientLabOrdersComponent.prototype.addMoreTest = function () {
        this.labTest = this.labForm.get('labTest');
        this.labTest.push(this.createLabTest());
    };
    PatientLabOrdersComponent.prototype.goToStatus = function (value) {
        this.labForm.controls['orderStatus'].setValue(value);
    };
    PatientLabOrdersComponent.prototype.deleteTest = function (index) {
        this.labTest = this.labForm.get('labTest');
        this.labTest.removeAt(index);
    };
    PatientLabOrdersComponent.prototype.addLabOrder = function (data) {
        var _this = this;
        console.log('tes' + data);
        if (this.labForm.valid) {
            // let branchObject = this.prepareSaveBranch();
            this.requestService.postRequest(app_constants_1.AppConstants.LAB_ORDER_CREATE, data)
                .subscribe(function (response) {
                if (response['responseCode'] === 'LAB_ORDER_SUC_01') {
                    _this.notificationService.success('LabOrder is Created Successfully');
                }
            }, function (error) {
                this.notificationService.error('ERROR', 'LabOrder is not Created');
            });
        }
        else {
            this.validateAllFormFields(this.labForm);
        }
    };
    PatientLabOrdersComponent.prototype.getLabTest = function (orderId) {
        var labTestFiltered = this.allOrders.filter(function (x) { return x.id == orderId; }).map(function (x) { return x.labTests; });
        this.filteredLabTest = labTestFiltered[0];
        labTestFiltered.forEach(function (msg) {
            console.log(msg);
        });
        console.log('lab tes' + labTestFiltered[0]);
    };
    PatientLabOrdersComponent.prototype.updateOrder = function (id) {
        console.log('dmmm');
        this.orderId = id;
        // this.router.navigate("['/dashboard/patient/create-order/',id,'add',orderId,'order']");
        this.router.navigate(['/dashboard/patient/create-order', this.id, 'add', this.orderId, 'order']);
    };
    PatientLabOrdersComponent.prototype.validateAllFormFields = function (formGroup) {
        var _this = this;
        console.log('i am validating');
        Object.keys(formGroup.controls).forEach(function (field) {
            var control = formGroup.get(field);
            if (control instanceof forms_1.FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof forms_1.FormGroup) {
                _this.validateAllFormFields(control);
            }
        });
    };
    PatientLabOrdersComponent.prototype.selectedAppointment = function (id) {
        this.labForm.controls['appointmentId'].setValue(id);
    };
    PatientLabOrdersComponent.prototype.deleteLabOrder = function (id) {
        var _this = this;
        this.confirmationDialogService
            .confirm('Delete', 'Are you sure you want to do this?')
            .subscribe(function (res) {
            if (res == true) {
                _this.requestService.deleteRequest(app_constants_1.AppConstants.LAB_ORDER_DELETE + id).subscribe(function (data) {
                    if (data['responseCode'] === 'LAB_ORDER_SUC_04') {
                        _this.notificationService.success('LabOrder has been Deleted Successfully');
                        _this.getLabOrderFromServer(_this.currPage);
                    }
                }, function (error) {
                    _this.notificationService.error('ERROR', 'LabOrder is not deleted ');
                });
            }
        });
    };
    PatientLabOrdersComponent = __decorate([
        core_1.Component({
            selector: 'patient-lab-orders',
            templateUrl: '../../../templates/dashboard/patient/patient-lab-orders.template.html',
        }),
        __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, forms_1.FormBuilder, requests_service_1.RequestsService,
            notification_service_1.NotificationService, his_util_service_1.HISUtilService, ConformationDialogService_1.ConformationDialogService])
    ], PatientLabOrdersComponent);
    return PatientLabOrdersComponent;
}());
exports.PatientLabOrdersComponent = PatientLabOrdersComponent;
//# sourceMappingURL=patient-lab-orders.component.js.map