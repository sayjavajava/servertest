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
var forms_1 = require("@angular/forms");
var PasswordValidation_1 = require("./PasswordValidation");
var router_1 = require("@angular/router");
var requests_service_1 = require("../../../services/requests.service");
var notification_service_1 = require("../../../services/notification.service");
var User_1 = require("../../../model/User");
var app_constants_1 = require("../../../utils/app.constants");
var his_util_service_1 = require("../../../services/his-util.service");
var DataService_1 = require("../../../services/DataService");
var UpdateReceptionistComponent = (function () {
    function UpdateReceptionistComponent(route, router, requestService, dataService, hisUtilService, fb, notificationService) {
        this.route = route;
        this.router = router;
        this.requestService = requestService;
        this.dataService = dataService;
        this.hisUtilService = hisUtilService;
        this.fb = fb;
        this.notificationService = notificationService;
        this.branchesList = [];
        this.primaryDoctor = [];
        this.defaultBranch = 'primaryBranch';
        this.userSelected = 'doctor';
        this.selectedVisitBranches = [];
        this.allBranches();
        this.allDoctors();
    }
    UpdateReceptionistComponent.prototype.ngOnDestroy = function () {
    };
    UpdateReceptionistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createUserForm();
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
            console.log(_this.id);
        });
        this.subscription = this.dataService.currentStaffServiceId.subscribe(function (x) { _this.userId = x; });
        this.patchData();
    };
    UpdateReceptionistComponent.prototype.allDoctors = function () {
        var _this = this;
        this.requestService.getRequest(app_constants_1.AppConstants.USER_BY_ROLE + '?name=' + this.userSelected)
            .subscribe(function (response) {
            if (response['responseStatus'] === 'SUCCESS') {
                var data = response['responseData'];
                var userNameData = data;
                _this.primaryDoctor = response['responseData'];
            }
        }, function (error) {
            _this.error = error.error.error;
        });
    };
    UpdateReceptionistComponent.prototype.allBranches = function () {
        var _this = this;
        this.requestService.getRequest(app_constants_1.AppConstants.FETCH_ALL_BRANCHES_URL + 'all')
            .subscribe(function (response) {
            if (response['responseCode'] === 'BR_SUC_01') {
                _this.branchesList = response['responseData'];
                //  this.branchesList.indexOf({name :this.defaultBranch}) === -1 ? this.branchesList.push({name :this.defaultBranch}) :console.log('already there');
                if (_this.branchesList.length > 1) {
                    _this.removeBranch();
                }
            }
        }, function (error) {
            _this.error = error.error.error;
        });
    };
    UpdateReceptionistComponent.prototype.createUserForm = function () {
        this.userForm = this.fb.group({
            'firstName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
            'lastName': [null],
            'userName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.pattern('^[a-z0-9_-]{4,15}$')])],
            'password': [null],
            'confirmPassword': [null],
            'homePhone': [null, forms_1.Validators.required],
            'cellPhone': [null],
            'primaryBranch': [null, forms_1.Validators.required],
            'interval': [null],
            'email': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])],
            'restrictBranch': [null],
            'allowDiscount': [null],
            'otherDashboard': '',
            'sendBillingReport': '',
            'useReceptDashboard': '',
            'shift2': '',
            'vacation': '',
            'otherDoctorDashBoard': '',
            'accountExpiry': [null],
            'active': '',
            'dateFrom': [null],
            'dateTo': [null],
            'managePatientInvoices': '',
            'managePatientRecords': '',
            'departmentControl': [null],
            'servicesControl': [null],
            'shift1': [null],
            'nurseDutyWithDoctor': [null],
            'changeUser': [null]
        }, {
            validator: PasswordValidation_1.CustomValidators.Match('password', 'confirmPassword')
        });
    };
    UpdateReceptionistComponent.prototype.patchData = function () {
        var _this = this;
        if (this.id) {
            this.requestService.findByIdAndType(app_constants_1.AppConstants.FETCH_USER_BY_ID + this.id, 'RECEPTIONIST').subscribe(function (receptionist) {
                //  this.id = user.id;
                _this.userForm.patchValue({
                    firstName: receptionist.firstName,
                    lastName: receptionist.lastName,
                    email: receptionist.email,
                    homePhone: receptionist.homePhone,
                    cellPhone: receptionist.cellPhone,
                    userName: receptionist.userName,
                    active: receptionist.active,
                    accountExpiry: receptionist.expiryDate,
                    primaryBranch: receptionist.primaryBranchId,
                });
                _this.staffBranches = receptionist.staffBranches;
                for (var key in _this.branchesList) {
                    for (var k in _this.staffBranches) {
                        if (_this.staffBranches[k].id == _this.branchesList[key].id) {
                            _this.branchesList[key].checked = true;
                            _this.selectedVisitBranches.push(_this.staffBranches[k].id);
                            break;
                        }
                    }
                }
            }, function (error) {
                //console.log(error.json());
                _this.error = error.error.error_description;
            });
        }
    };
    UpdateReceptionistComponent.prototype.removeBranch = function () {
        var _this = this;
        this.branchesList.forEach(function (item, index) {
            if (item === _this.defaultBranch)
                _this.branchesList.splice(index, 1);
        });
    };
    UpdateReceptionistComponent.prototype.addCashier = function (data) {
        console.log('i am invalid');
        if (this.userForm.valid) {
            console.log('i am cashier submit' + data);
            var cashier = new User_1.User({
                userType: 'receptionist',
                firstName: data.firstName,
                lastName: data.lastName,
                userName: data.userName,
                password: data.password,
                homePhone: data.homePhone,
                cellPhone: data.cellPhone,
                sendBillingReport: data.sendBillingReport,
                useReceptDashboard: data.useReceptDashboard,
                otherDashboard: data.otherDashboard,
                accountExpiry: data.accountExpiry,
                primaryBranch: data.primaryBranch,
                email: data.email,
                selectedVisitBranches: this.selectedVisitBranches,
                otherDoctorDashBoard: data.otherDoctorDashBoard,
                active: data.active,
                allowDiscount: data.allowDiscount,
            });
            this.makeService(cashier);
        }
        else {
            console.log('i am else');
            this.validateAllFormFields(this.userForm);
        }
    };
    UpdateReceptionistComponent.prototype.makeService = function (user) {
        var _this = this;
        this.requestService.putRequest('/user/edit/' + this.userId, user).subscribe(function (response) {
            if (response['responseStatus'] === 'SUCCESS') {
                console.log('saved00');
                _this.responseUser = response['responseData'];
                _this.notificationService.success('User has been updated Successfully');
                _this.router.navigate(['/dashboard/setting/staff']);
            }
        }, function (error) {
            //console.log(error.json());
            _this.error = error.error.error_description;
            _this.notificationService.error('ERROR', 'User is not Updated');
        });
    };
    UpdateReceptionistComponent.prototype.isFieldValid = function (field) {
        return !this.userForm.get(field).valid && this.userForm.get(field).touched;
    };
    UpdateReceptionistComponent.prototype.displayFieldCss = function (field) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    };
    UpdateReceptionistComponent.prototype.getBranch = function (value) {
        if (value) {
            this.userForm.controls['primaryBranch'].setValue(value);
        }
    };
    UpdateReceptionistComponent.prototype.validateAllFormFields = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (field) {
            //console.log(field);
            var control = formGroup.get(field);
            if (control instanceof forms_1.FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            else if (control instanceof forms_1.FormGroup) {
                _this.validateAllFormFields(control);
            }
        });
    };
    UpdateReceptionistComponent.prototype.selectVisitBranches = function (event, item) {
        if (event.target.checked) {
            this.selectedVisitBranches.push(item.id);
        }
        else {
            var updateItem = this.selectedVisitBranches.find(this.findIndexToUpdate, item.id);
            var index = this.selectedVisitBranches.indexOf(updateItem);
            this.selectedVisitBranches.splice(index, 1);
        }
        console.log(this.selectedVisitBranches);
    };
    UpdateReceptionistComponent.prototype.findIndexToUpdate = function (type) {
        return type.name === this;
    };
    UpdateReceptionistComponent.prototype.getSelectedDashboard = function (value) {
        if (value) {
            this.userForm.controls['otherDashboard'].setValue(value);
        }
    };
    UpdateReceptionistComponent.prototype.cancel = function () {
        this.router.navigate(['/dashboard/setting/staff']);
    };
    UpdateReceptionistComponent.prototype.getSelectedBranch = function (value) {
        console.log(value);
        if (value === undefined) {
            console.log('i am esss');
            this.userForm.controls['primaryBranch'].setValue('primaryBranch');
        }
        else {
            console.log('i am too' + value);
            this.userForm.controls['primaryBranch'].setValue(value);
        }
    };
    UpdateReceptionistComponent = __decorate([
        core_1.Component({
            selector: 'addcashier-component',
            templateUrl: '../../../templates/dashboard/setting/update-receptionist.template.html',
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, requests_service_1.RequestsService, DataService_1.DataService,
            his_util_service_1.HISUtilService, forms_1.FormBuilder, notification_service_1.NotificationService])
    ], UpdateReceptionistComponent);
    return UpdateReceptionistComponent;
}());
exports.UpdateReceptionistComponent = UpdateReceptionistComponent;
//# sourceMappingURL=update-receptionist.component.js.map