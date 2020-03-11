import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../shared/global/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCode } from '../../../shared/global/enums/httpError.enum';
import { fade } from '../../../shared/global/animations/fade.animation';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { revealVertically } from '../../../shared/global/animations/reveal-rertically.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fade,
    revealVertically
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly distroy$: Subject<boolean> = new Subject<boolean>();
  public asyncErrorMessage?: string = undefined;
  public formGroup: FormGroup;
  public hide: boolean = true;
  public isLoading: boolean = false;
  public showLanguageSelectionMenu: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });

    this.formGroup.valueChanges.pipe(takeUntil(this.distroy$)).subscribe(() => this.asyncErrorMessage = undefined);
  }

  get password(): FormControl { return this.formGroup.get('password') as FormControl; }
  get email(): FormControl { return this.formGroup.get('email') as FormControl; }
  set passwordValue(value: string) { this.formGroup.get('password').setValue(value); }
  set emailValue(value: string) { this.formGroup.get('email').setValue(value); }

  submit = (): void => {
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    this.authService
      .logIn(this.formGroup.value)
      .subscribe({
        error: (e: HttpErrorResponse) => {
          this.isLoading = false;
          switch (e.status)
          {
            case HttpStatusCode.UNAUTHORIZED: this.asyncErrorMessage = 'אחד מהפרטים אינם נכונים'; break;
            case HttpStatusCode.INTERNAL_SERVER_ERROR: this.asyncErrorMessage = 'שגיאת שרת, נסה שוב בעוד מספר דקות.'; break;
            default: this.asyncErrorMessage = this.asyncErrorMessage = "שגיאה התרחשה, נסה שוב"; break;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.distroy$.next(true);
    this.distroy$.unsubscribe();
  }
}
