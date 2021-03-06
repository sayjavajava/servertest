import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {ConfirmationdialogComponent} from '../components/dashboard/confirmationdialog.component';

@Injectable()
export class ConformationDialogService {

    constructor(private matdialog: MatDialog) {
    }

    confirm(title: string, message: string): Observable<boolean> {

        let dialogref: MatDialogRef<ConfirmationdialogComponent>;

        dialogref = this.matdialog.open(ConfirmationdialogComponent, {
            panelClass: 'my-panel'
        });
        dialogref.componentInstance.title = title;
        dialogref.componentInstance.message = message;

        return dialogref.afterClosed();
    }
}