import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../../store/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCode } from '../../../shared/global/enums/httpError.enum';
import { fade } from '../../../shared/global/animations/fade.animation';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { revealVertically } from '../../../shared/global/animations/reveal-rertically.animation';
import { AppState } from '../../../store/reducers';
import { LogInAction, InputChangeAction } from '../../../store/actions/auth.actions';
import { getErrorMessage, getLoading } from '../../../store/selectors/auth.selectors';

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
  public errorMessage$: Observable<string>;
  public isLoading$: Observable<boolean>;
  public formGroup: FormGroup;
  public hide: boolean = true;
  public showLanguageSelectionMenu: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false]
    });

    this.formGroup.valueChanges.pipe(takeUntil(this.distroy$)).subscribe(() => this.store.dispatch(new InputChangeAction()));

    this.errorMessage$ = this.store.pipe(select(getErrorMessage));
    this.isLoading$ = this.store.pipe(select(getLoading));
  }

  get password(): FormControl { return this.formGroup.get('password') as FormControl; }
  get email(): FormControl { return this.formGroup.get('email') as FormControl; }
  set passwordValue(value: string) { this.formGroup.get('password').setValue(value); }
  set emailValue(value: string) { this.formGroup.get('email').setValue(value); }

  submit = (): void => {
    if (this.formGroup.invalid) return;
    this.store.dispatch(new LogInAction(this.formGroup.value));
  }

  ngOnDestroy(): void {
    this.distroy$.next(true);
    this.distroy$.unsubscribe();
  }
}
