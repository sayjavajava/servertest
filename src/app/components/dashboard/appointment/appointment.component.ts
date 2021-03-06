import {Component, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {RequestsService} from "../../../services/requests.service";
import {Router} from "@angular/router";
import {AppConstants} from "../../../utils/app.constants";

@Component({
    selector: 'appointment-component',
    templateUrl: '../../../templates/dashboard/appointment/appointment.template.html',
})
export class AppointmentComponent implements OnInit {

    constructor(private requestsService: RequestsService,
                private router: Router,
                private reguestServices:RequestsService,
                private titleService: Title) {
    };


    ngOnInit() {
        ;
        this.titleService.setTitle('HIS | Appointments');

    }

}
