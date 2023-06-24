import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Person } from 'src/app/modules/cliente/Models/Person';
import { PersonService } from 'src/app/modules/cliente/Services/PersonService';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  personForm!: FormGroup;
  person: Person | null = null;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService, 
    private router: Router, 
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any) {
      if(data){
        this.person=data;
      }
    }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      id: [this.person?.id],
      nombre: [this.person?.nombre, Validators.required],
      age: [this.person?.age, Validators.required],
      email: [this.person?.email, [Validators.required, Validators.email]]
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
    this.router.navigate(['client/person-list']);
    this.personForm.reset();
  }
}
