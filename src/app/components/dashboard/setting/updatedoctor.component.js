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
var router_1 = require("@angular/router");
var requests_service_1 = require("../../../services/requests.service");
var notification_service_1 = require("../../../services/notification.service");
var User_1 = require("../../../model/User");
var amazing_time_picker_1 = require("amazing-time-picker");
var app_constants_1 = require("../../../utils/app.constants");
var DataService_1 = require("../../../services/DataService");
var UpdatedoctorComponent = (function () {
    function UpdatedoctorComponent(route, router, requestService, dataService, fb, notificationService, amazingTimePickerService) {
        this.route = route;
        this.router = router;
        this.requestService = requestService;
        this.dataService = dataService;
        this.fb = fb;
        this.notificationService = notificationService;
        this.amazingTimePickerService = amazingTimePickerService;
        this.selectedDepartment = [];
        this.selectedServices = [];
        this.doctorServices = [];
        this.selectedWorkingDays = [];
        this.selectedVisitBranches = [];
        this.selectedDoctors = [];
        this.departmentList = [];
        this.selectedUser = 'doctor';
        this.userSelected = 'doctor';
        this.defaultBranch = 'primaryBranch';
        this.matches = [];
        this.branchesList = [];
        this.servicesList = [];
        this.primaryDoctor = [];
        this.workingDays = [
            { id: 1, name: 'Monday' },
            { id: 2, name: 'Tuesday' },
            { id: 3, name: 'Wednesday' },
            { id: 4, name: 'Thurseday' },
            { id: 5, name: 'Friday' },
            { id: 6, name: 'Satureday' },
            { id: 7, name: 'Sunday' },
        ];
        this.date = new forms_1.FormControl(new Date());
        this.allBranches();
        this.allServices();
        this.allDepartments();
        this.allDoctors();
    }
    UpdatedoctorComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    UpdatedoctorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createUserForm();
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.subscription = this.dataService.currentStaffServiceId.subscribe(function (x) { _this.userId = x; });
        this.patchData();
    };
    UpdatedoctorComponent.prototype.allBranches = function () {
        var _this = this;
        this.requestService.getRequest(app_constants_1.AppConstants.FETCH_ALL_BRANCHES_URL + 'all')
            .subscribe(function (response) {
            if (response['responseCode'] === 'BR_SUC_01') {
                _this.branchesList = response['responseData'];
                if (_this.branchesList.length > 1) {
                    _this.removeBranch();
                }
            }
        }, function (error) {
            _this.error = error.error.error;
        });
    };
    UpdatedoctorComponent.prototype.allDoctors = function () {
        var _this = this;
        this.requestService.getRequest(app_constants_1.AppConstants.USER_BY_ROLE + '?name=' + this.userSelected)
            .subscribe(function (response) {
            if (response['responseStatus'] === 'SUCCESS') {
                _this.primaryDoctor = response['responseData'];
            }
        }, function (error) {
            _this.error = error.error.error;
        });
    };
    UpdatedoctorComponent.prototype.removeBranch = function () {
        var _this = this;
        this.branchesList.forEach(function (item, index) {
            if (item === _this.defaultBranch)
                _this.branchesList.splice(index, 1);
        });
    };
    UpdatedoctorComponent.prototype.allDepartments = function () {
        var _this = this;
        this.requestService.getRequest(app_constants_1.AppConstants.FETCH_ALL_CLINICAL_DEPARTMENTS_URI)
            .subscribe(function (response) {
            if (response['responseCode'] === 'CLI_DPT_SUC_01') {
                _this.departmentList = response['responseData'];
            }
        }, function (error) {
            _this.error = error.error.error;
        });
    };
    UpdatedoctorComponent.prototype.allServices = function () {
        var _this = this;
        this.requestService.getRequest(app_constants_1.AppConstants.FETCH_ALL_MEDICAL_SERVICES_URL)
            .subscribe(function (response) {
            if (response['responseCode'] === 'MED_SER_SUC_01') {
                _this.servicesList = response['responseData'];
            }
        }, function (error) {
            _this.error = error.error.error;
        });
    };
    UpdatedoctorComponent.prototype.createUserForm = function () {
        this.userForm = this.fb.group({
            'firstName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4)])],
            'lastName': [null],
            'userName': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.pattern('^[a-z0-9_-]{4,15}$')])],
            'homePhone': [null, forms_1.Validators.required],
            'cellPhone': [null],
            'primaryBranch': [null, forms_1.Validators.required],
            'interval': [null, forms_1.Validators.required],
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
            'departmentControl': [null],
            'servicesControl': [null],
            'shift1': [null],
            'secondShiftFromTimeControl': [null],
            workingDaysContorl: new forms_1.FormGroup({
                //  new FormControl(''),
                sunday: new forms_1.FormControl(''),
                monday: new forms_1.FormControl(''),
                tuesday: new forms_1.FormControl(''),
                thurseday: new forms_1.FormControl(''),
                friday: new forms_1.FormControl(''),
                satureday: new forms_1.FormControl(''),
                wednesday: new forms_1.FormControl(''),
            })
        });
    };
    Object.defineProperty(UpdatedoctorComponent.prototype, "workingDaysContorl", {
        get: function () {
            return this.userForm.get('workingDaysContorl');
        },
        enumerable: true,
        configurable: true
    });
    UpdatedoctorComponent.prototype.patchData = function () {
        var _this = this;
        if (this.id) {
            this.requestService.findByIdAndType(app_constants_1.AppConstants.FETCH_USER_BY_ID + this.id, 'DOCTOR').subscribe(function (user) {
                //  this.id = user.id;
                _this.userForm.patchValue({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    homePhone: user.homePhone,
                    cellPhone: user.cellPhone,
                    sendBillingReport: user.sendBillingReport,
                    userName: user.userName,
                    active: user.active,
                    otherDashboard: user.otherDashboard,
                    useReceptDashboard: user.useReceptDashBoard,
                    otherDoctorDashBoard: user.otherDoctorDashBoard,
                    primaryBranch: user.primaryBranchId,
                    interval: user.checkUpInterval,
                    // shift1: user.dutyShift.dutyTimmingShift1,
                    // shift2: user.dutyShift.dutyTimmingShift2,
                    //  secondShiftFromTimeControl: user.dutyShift.secondShiftFromTime,
                    vacation: user.vacation,
                });
                if (user.expiryDate != null) {
                    _this.userForm.controls['accountExpiry'].setValue(new Date(user.expiryDate));
                }
                //let shifts: any [] = user.dutyShifts;
                for (var s in user.dutyShifts) {
                    if (user.dutyShifts[s].shiftName === 'SHIFT1') {
                        _this.userForm.controls['shift1'].setValue(true);
                        _this.firstShiftFromTime = user.dutyShifts[s].startTime;
                        _this.firstShiftToTime = user.dutyShifts[s].endTime;
                    }
                    else if (user.dutyShifts[s].shiftName === 'SHIFT2') {
                        _this.userForm.controls['shift2'].setValue(true);
                        _this.secondShiftFromTime = user.dutyShifts[s].startTime;
                        _this.secondShiftToTime = user.dutyShifts[s].endTime;
                    }
                }
                if (user.dutyShifts[0].shiftName == 'MORNING') {
                    // console.log('doneee'+user.dutyShifts[0].shiftName);
                    _this.userForm.controls['shift1'].setValue(true);
                }
                if (user.dutyShifts.length > 1 && user.dutyShifts[1].shiftName == 'EVENING') {
                    // console.log('doneee'+user.dutyShifts[0].shiftName);
                    _this.userForm.controls['shift2'].setValue(true);
                }
                var docDeptId = user.docDepartmentId;
                for (var k in _this.departmentList) {
                    if (_this.departmentList[k].id == docDeptId) {
                        _this.departmentList[k].selected = true;
                        _this.selectedDepartment[0] = docDeptId;
                        break;
                    }
                }
                _this.staffBranches = user.staffBranches;
                for (var key in _this.branchesList) {
                    for (var k in _this.staffBranches) {
                        if (_this.staffBranches[k].id == _this.branchesList[key].id) {
                            _this.branchesList[key].checked = true;
                            _this.selectedVisitBranches.push(_this.staffBranches[k].id);
                            break;
                        }
                    }
                }
                _this.doctorServices = user.doctorMedicalSrvcList;
                for (var key in _this.servicesList) {
                    for (var k in _this.doctorServices) {
                        if (_this.doctorServices[k].id == _this.servicesList[key].id) {
                            _this.servicesList[key].checked = true;
                            _this.selectedServices.push(_this.doctorServices[k].id);
                            break;
                        }
                    }
                }
                if (user.vacation) {
                    _this.userForm.controls['dateFrom'].setValue(new Date(user.vacationFrom));
                    _this.userForm.controls['dateTo'].setValue(new Date(user.vacationTo));
                }
                _this.userForm.controls['workingDaysContorl'].patchValue({
                    sunday: _this.checkAvailabilty('sunday', user.workingDays),
                    monday: _this.checkAvailabilty('monday', user.workingDays),
                    tuesday: _this.checkAvailabilty('tuesday', user.workingDays),
                    thurseday: _this.checkAvailabilty('thurseday', user.workingDays),
                    friday: _this.checkAvailabilty('friday', user.workingDays),
                    satureday: _this.checkAvailabilty('satureday', user.workingDays),
                    wednesday: _this.checkAvailabilty('wednesday', user.workingDays)
                });
                /*this.secondShiftFromTime = user.dutyShifts[0].startTime,
                this.secondShiftToTime = user.dutyShifts[0].endTime,
                this.firstShiftFromTime = user.dutyShifts[1].startTime,
                this.firstShiftToTime = user.dutyShifts[1].endTime*/
            }, function (error) {
                //console.log(error.json());
                _this.error = error.error.error_description;
            });
        }
    };
    UpdatedoctorComponent.prototype.getShiftFromTime = function (time) {
        var timeArray = time.split(':');
        var shift = Number(timeArray[0]) <= 12 ? 'first' : 'second';
    };
    UpdatedoctorComponent.prototype.checkAvailabilty = function (value, array) {
        return array.indexOf(value) > -1;
    };
    UpdatedoctorComponent.prototype.setPreset = function () {
        this.workingDaysContorl.patchValue(['LA', 'MTV']);
    };
    UpdatedoctorComponent.prototype.addUser = function (data) {
        console.log('i am invalid');
        var days = this.userForm.get('workingDaysContorl');
        var daysOfDoctor = [];
        daysOfDoctor.push({ key: 'sunday', value: days.get('sunday').value });
        daysOfDoctor.push({ key: 'monday', value: days.get('monday').value });
        daysOfDoctor.push({ key: 'tuesday', value: days.get('tuesday').value });
        daysOfDoctor.push({ key: 'thurseday', value: days.get('thurseday').value });
        daysOfDoctor.push({ key: 'friday', value: days.get('friday').value });
        daysOfDoctor.push({ key: 'satureday', value: days.get('satureday').value });
        if (this.userForm.valid) {
            var result = daysOfDoctor.filter(function (obj) {
                return obj.value == true;
            });
            console.log('res :' + result);
            for (var key in result) {
                this.selectedWorkingDays.push(result[key].key);
            }
            var doctor = new User_1.User({
                firstName: data.firstName,
                lastName: data.lastName,
                userName: data.userName,
                password: data.password,
                homePhone: data.homePhone,
                cellPhone: data.cellPhone,
                sendBillingReport: data.sendBillingReport,
                useReceptDashboard: data.useReceptDashboard,
                otherDashboard: data.otherDashboard,
                otherDoctorDashBoard: data.otherDoctorDashBoard,
                accountExpiry: data.accountExpiry,
                primaryBranch: data.primaryBranch,
                email: data.email,
                active: data.active,
                selectedDoctors: this.selectedDoctors,
                selectedDepartment: this.selectedDepartment,
                selectedServices: this.selectedServices,
                interval: data.interval,
                selectedVisitBranches: this.selectedVisitBranches,
                shift1: data.shift1,
                shift2: data.shift2,
                secondShiftToTime: this.secondShiftToTime,
                secondShiftFromTime: this.secondShiftFromTime,
                firstShiftToTime: this.firstShiftToTime,
                firstShiftFromTime: this.firstShiftFromTime,
                vacation: data.vacation,
                dateTo: data.dateTo,
                dateFrom: data.dateFrom,
                selectedWorkingDays: this.selectedWorkingDays,
                userType: this.selectedUser
            });
            this.makeService(doctor);
            this.workingDays.length = 0;
        }
        else {
            this.validateAllFormFields(this.userForm);
        }
    };
    UpdatedoctorComponent.prototype.selectDoctorDepartment = function (itemId) {
        if (itemId) {
            this.selectedDepartment[0] = itemId;
        }
    };
    UpdatedoctorComponent.prototype.makeService = function (user) {
        var _this = this;
        this.requestService.putRequest('/user/edit/' + this.userId, user).subscribe(function (response) {
            if (response['responseStatus'] === 'SUCCESS') {
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
    UpdatedoctorComponent.prototype.isFieldValid = function (field) {
        return !this.userForm.get(field).valid && this.userForm.get(field).touched;
    };
    UpdatedoctorComponent.prototype.displayFieldCss = function (field) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    };
    UpdatedoctorComponent.prototype.getBranch = function (value) {
        if (value) {
            this.userForm.controls['primaryBranch'].setValue(value);
        }
    };
    UpdatedoctorComponent.prototype.validateAllFormFields = function (formGroup) {
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
    UpdatedoctorComponent.prototype.secondShiftFrom = function () {
        var _this = this;
        console.log('time from');
        var amazingTimePicker = this.amazingTimePickerService.open();
        amazingTimePicker.afterClose().subscribe(function (time) {
            _this.secondShiftFromTime = time;
        });
    };
    UpdatedoctorComponent.prototype.firstShiftFrom = function () {
        var _this = this;
        var amazingTimePicker = this.amazingTimePickerService.open({
            time: this.firstShiftFromTime,
            theme: 'dark',
            arrowStyle: {
                background: 'red',
                color: 'white'
            }
        });
        amazingTimePicker.afterClose().subscribe(function (time) {
            _this.firstShiftFromTime = time;
        });
    };
    UpdatedoctorComponent.prototype.firstShiftTo = function () {
        var _this = this;
        var amazingTimePicker = this.amazingTimePickerService.open({
            time: this.firstShiftToTime,
            theme: 'dark',
            arrowStyle: {
                background: 'red',
                color: 'white'
            }
        });
        amazingTimePicker.afterClose().subscribe(function (time) {
            _this.firstShiftToTime = time;
        });
    };
    UpdatedoctorComponent.prototype.secondShiftTo = function () {
        var _this = this;
        var amazingTimePicker = this.amazingTimePickerService.open();
        amazingTimePicker.afterClose().subscribe(function (time) {
            _this.secondShiftToTime = time;
        });
    };
    UpdatedoctorComponent.prototype.checkupIntervalMethod = function (value) {
        if (value) {
            this.userForm.controls['interval'].setValue(value);
        }
    };
    UpdatedoctorComponent.prototype.selectDepartment = function (event, item) {
        console.log(event.checked);
        if (event.target.checked) {
            this.selectedDepartment.push(item.id);
        }
        else {
            var updateItem = this.selectedDepartment.find(this.findIndexToUpdate, item.id);
            var index = this.selectedDepartment.indexOf(updateItem);
            this.selectedDepartment.splice(index, 1);
        }
        console.log(this.selectedDepartment);
    };
    UpdatedoctorComponent.prototype.selectWorkingDays = function (event, item) {
        console.log(event.checked);
        if (event.target.checked) {
            this.selectedWorkingDays.push(item.name);
        }
        else {
            var updateItem = this.selectedWorkingDays.find(this.findIndexToUpdate, item.name);
            var index = this.selectedWorkingDays.indexOf(updateItem);
            this.selectedWorkingDays.splice(index, 1);
        }
        console.log(this.selectedWorkingDays);
    };
    UpdatedoctorComponent.prototype.selectRestrictBranch = function (event, item) {
        console.log(item);
        if (event.target.checked) {
            this.selectedVisitBranches.push(item.id);
        }
        else {
            var updateItem = this.selectedVisitBranches.find(this.findIndexToUpdate, item.id);
            var index = this.selectedVisitBranches.indexOf(updateItem);
            this.selectedVisitBranches.splice(index, 1);
        }
    };
    UpdatedoctorComponent.prototype.findIndexToUpdate = function (type) {
        return type.name === this;
    };
    UpdatedoctorComponent.prototype.selectServices = function (event, item) {
        if (event.target.checked) {
            this.selectedServices.push(item.id);
        }
        else {
            var updateItem = this.selectedServices.find(this.findIndexToUpdate, item.id);
            var index = this.selectedServices.indexOf(updateItem);
            this.selectedServices.splice(index, 1);
        }
    };
    UpdatedoctorComponent.prototype.getSelectedDashboard = function (value) {
        if (value) {
            this.userForm.controls['otherDashboard'].setValue(value);
        }
    };
    UpdatedoctorComponent.prototype.getSelectedBranch = function (value) {
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
    UpdatedoctorComponent.prototype.selectVisitBranches = function (event, item) {
        console.log(item);
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
    UpdatedoctorComponent.prototype.cancel = function () {
        this.router.navigate(['/dashboard/setting/staff']);
    };
    UpdatedoctorComponent = __decorate([
        core_1.Component({
            selector: 'adddoctor-component',
            templateUrl: '../../../templates/dashboard/setting/updatedoctor.template.html',
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, requests_service_1.RequestsService, DataService_1.DataService,
            forms_1.FormBuilder, notification_service_1.NotificationService,
            amazing_time_picker_1.AmazingTimePickerService])
    ], UpdatedoctorComponent);
    return UpdatedoctorComponent;
}());
exports.UpdatedoctorComponent = UpdatedoctorComponent;
//# sourceMappingURL=updatedoctor.component.js.map