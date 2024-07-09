import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent {
  public userForm: FormGroup = new FormGroup({});
  public userData: any = {};
  public title: string = 'Create User';

  isValid = false;

  emptyFields = false;
  invalidEmail = false;
  invalidPhone = false;
  invalidZipCode = false;
  invalidChars = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.userData = this.route.snapshot.paramMap.get('user');
    this.userData = JSON.parse(this.userData);
  }

  ngOnInit(): void {
    this.isValid = false;

    this.emptyFields = false;
    this.invalidEmail = false;
    this.invalidPhone = false;
    this.invalidZipCode = false;
    this.invalidChars = false;

    this.userForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]+$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9]+$'),
      ]),
      company: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
    });

    if (this.userData) {
      // rehydrate phone number and remove the special characters
      if (this.userData.phone) {
        this.userData.phone = this.userData.phone.replace(
          /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
          ''
        );
        this.userData.phone = this.userData.phone.substring(1);
      }

      this.userForm.patchValue(this.userData);
      this.title = 'Update User';
    } else {
      this.title = 'Create User';
    }
  }

  resetForm() {
    this.userData = null;
    this.userForm.reset();
    this.ngOnInit();
    this.title = 'Create User';
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get company() {
    return this.userForm.get('company');
  }

  get email() {
    return this.userForm.get('email');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  formatPhoneNumber() {
    if (this.phone) {
      // Ensure phone is not an empty string
      const phoneValue = this.phone.value; // Now it's safe to access value
      const p1 = phoneValue.substring(0, 3);
      const p2 = phoneValue.substring(3, 6);
      const p3 = phoneValue.substring(6);
      // const formattedPhone = `+1 (${p1})-${p2}-${p3}`;
      const formattedPhone = `+1 (${p1})-${p2}-${p3}`;
      // Assuming contactForm is a FormGroup and you want to update its phone field
      this.userForm.patchValue({ phone: formattedPhone });
    }
  }

  checkEmptyFields() {
    if (!this.userForm) {
      return false;
    }
    const formValues: Array<string> = Object.values(this.userForm.value);
    for (const value of formValues) {
      if (value === '') {
        return true;
      }
    }
    return false;
  }

  onSubmit() {
    this.emptyFields = this.checkEmptyFields();

    if (this.userForm.valid && !this.emptyFields) {
      this.isValid = true;

      this.invalidEmail = false;
      this.invalidPhone = false;
      this.invalidZipCode = false;
      this.invalidChars = false;

      this.formatPhoneNumber();
      console.log(`Serialized data`, this.userForm.value);

      this.userForm.reset();
      setTimeout(() => {
        this.router.navigate(['/user/list']);
      }, 2000);
      return;
    }

    this.isValid = false;

    this.invalidEmail = this.email?.errors?.['email'] || false;
    this.invalidPhone =
      this.phone?.errors?.['minlength'] || this.phone?.errors?.['pattern']
        ? true
        : false;
    this.invalidChars =
      this.firstName?.errors?.['pattern'] || this.lastName?.errors?.['pattern']
        ? true
        : false;
  }
}
