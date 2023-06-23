import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/Models/Person';
import { PersonService } from 'src/app/Services/PersonService';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  personForm!: FormGroup;
  person: Person | null = null;

  constructor(private fb: FormBuilder, private personService: PersonService) {}

  ngOnInit(): void {
    this.personForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    const person = this.personForm.value as Person;
    if (person.id) {
      this.personService.updatePerson(person.id, person).subscribe(
        () => console.log('Person updated successfully'),
        err => console.error(err)
      );
    } else {
      this.personService.addPerson(person).subscribe(
        () => console.log('Person added successfully'),
        err => console.error(err)
      );
    }
    this.personForm.reset();
  }
}
