import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DxAutocompleteModule, DxButtonModule, DxSelectBoxModule, DxTextBoxModule, DxValidationGroupModule, DxValidatorModule } from 'devextreme-angular';
import { MessageType } from 'src/app/core/constants/app.constants';
import { AlertToastrService } from 'src/app/core/services/alert-toastr.service';
import { BikeService } from 'src/app/core/services/bike.service';
import { bikeBrand, bikeType } from './../../core/models/vehicle.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [DxAutocompleteModule, DxButtonModule, DxSelectBoxModule, NgIf, NgClass, FormsModule, DxValidatorModule, DxValidationGroupModule, DxTextBoxModule, JsonPipe],
})
export class HomeComponent implements OnInit {
  bikeType!: bikeType[] | any;
  bikeBrand: bikeBrand[] | any;
  labelMode!: string;
  isSubmitted = false;
  checkValidation = false;
  selectBoxValue: any;
  private destroyRef = inject(DestroyRef);

  constructor(
    private bikeConfigurationService: BikeService,
    private alertService: AlertToastrService
  ) { }

  ngOnInit() {
    this.getVehicleInfo();
  }

  getVehicleInfo(): void {
    this.bikeType = [
      {
        TypebikeID: 1,
        TypebikeName: 'Standard',
      },
      {
        TypebikeID: 2,
        TypebikeName: 'Cruiser',
      },
      {
        TypebikeID: 3,
        TypebikeName: 'Touring',
      },
    ];

    this.bikeBrand = [
      {
        BikebrandID: 1,
        BikeBrandname: 'Yamaha',
      },
      {
        BikebrandID: 2,
        BikeBrandname: 'Honda',
      },
      {
        BikebrandID: 3,
        BikeBrandname: 'BMW',
      },
    ];
  }

  onSubmit(formValue: any): void {
    if (formValue.invalid) {
      this.alertService.displaySnackBarWithoutTranslation('Please fill required field', MessageType.error)
      return;
    }
    this.isSubmitted = true;
    this.bikeConfigurationService.postBike(formValue.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitted = false;
          this.alertService.displaySnackBarWithoutTranslation('Data getting successfully', MessageType.success)
        },
        error: () => {
          this.isSubmitted = false;
          this.alertService.displaySnackBarWithoutTranslation('Getting error', MessageType.error)
        }
      })
  }
}
