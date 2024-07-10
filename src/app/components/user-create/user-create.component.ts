import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})

/**
 * Represents the UserCreateComponent class.
 */
export class UserCreateComponent {
  public userForm: FormGroup = new FormGroup({});
  public userData: any = {};
  public submitBtnTitle: string = 'Create User';

  isError = false;
  errorMessage = '';

  isValid = false;
  emptyFields = false;
  invalidEmail = false;
  invalidPhone = false;
  invalidZipCode = false;
  invalidChars = false;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userData = this.route.snapshot.paramMap.get('user');
    this.userData = JSON.parse(this.userData);
  }

  /**
   * Initializes the component.
   */
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
      this.rehydratePhoneNumber();
      this.userForm.patchValue(this.userData);
      this.submitBtnTitle = 'Update User';
    }
  }

  /**
   * Rehydrates the phone number by removing special characters and prefixes.
   */
  rehydratePhoneNumber() {
    if (this.userData.phone) {
      this.userData.phone = this.userData.phone.replace(
        /[\s~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g,
        ''
      );

      if (
        this.userData.phone.length === 11 &&
        this.userData.phone.charAt(0) === '1'
      ) {
        this.userData.phone = this.userData.phone.substring(1);
      }
    }
  }

  /**
   * Resets the user form to its initial state.
   */
  resetUserForm() {
    this.userData = null;
    this.userForm.reset();
    this.ngOnInit();
    this.submitBtnTitle = 'Create User';
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

  /**
   * Formats the phone number in the user form.
   */
  formatPhoneNumber() {
    if (this.phone) {
      // Ensure phone is not an empty string
      const phoneValue = this.phone.value; // Now it's safe to access value
      const p1 = phoneValue.substring(0, 3);
      const p2 = phoneValue.substring(3, 6);
      const p3 = phoneValue.substring(6);
      const formattedPhone = `+1 (${p1})-${p2}-${p3}`;
      // Assuming contactForm is a FormGroup and you want to update its phone field
      this.userForm.patchValue({ phone: formattedPhone });
    }
  }

  /**
   * Checks if any fields in the user form are empty.
   *
   * @returns {boolean} True if any field is empty, false otherwise.
   */
  checkForEmptyFields() {
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

  /**
   * Submits the user form.
   * If the form is valid and all fields are filled, it creates a new user or updates an existing user.
   * Otherwise, it displays appropriate error messages.
   */
  onSubmit() {
    this.emptyFields = this.checkForEmptyFields();

    // successful form submission
    if (this.userForm.valid && !this.emptyFields) {
      this.isValid = true;
      this.invalidEmail = false;
      this.invalidPhone = false;
      this.invalidZipCode = false;
      this.invalidChars = false;

      this.formatPhoneNumber();

      const formData = this.createFormData();

      if (this.userData) {
        this.updateUser(formData, this.userData._id);
      } else {
        this.createUser(formData);
      }

      
      setTimeout(() => {
        if (!this.isError) {
          this.userForm.reset();
          this.router.navigate(['/user/list']);
        }
      }, 2000);

      return;
    }

    // errors with the form submission
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

  /**
   * Creates a FormData object from the user form values.
   *
   * @returns {FormData} The FormData object.
   */
  createFormData() {
    const formData = new FormData();
    const firstName = this.firstName ? this.firstName.value : '';
    const lastName = this.lastName ? this.lastName.value : '';
    const email = this.email ? this.email.value : '';
    const company = this.company ? this.company.value : '';
    const phone = this.phone ? this.phone.value : '';

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('company', company);
    formData.append('phone', phone);

    return formData;
  }

  /**
   * Creates a new user using the provided form data.
   *
   * @param {FormData} formData - The form data for the new user.
   */
  createUser(formData: FormData) {
    this.userService.createUser(formData).subscribe({
      next: (res) => console.info(res),
      error: (error) => {
        this.isError = true;
        this.errorMessage = error?.message;
      },
      complete: () => console.info('User successfully created'),
    });
  }

  /**
   * Updates an existing user with the provided form data.
   *
   * @param {FormData} formData - The form data for the updated user.
   * @param {string} id - The ID of the user to update.
   */
  updateUser(formData: FormData, id: string) {
    this.userService.updateUser(formData, id).subscribe({
      next: (res) => console.info(res),
      error: (error) => {
        this.isError = true;
        this.errorMessage = error?.message;
      },
      complete: () => console.info('User successfully updated'),
    });
  }
}
