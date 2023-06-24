import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonComponent } from '../person/person.component';
import { Person } from 'src/app/modules/cliente/Models/Person';
import { PersonService } from 'src/app/modules/cliente/Services/PersonService';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html'
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];

  constructor(private dialog: MatDialog, private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getPersons().subscribe(
      data => this.people = data,
      err => console.error(err)
    );
  }

  editPerson(person: Person) {
    console.log(person.id);
    const dialogRef = this.dialog.open(PersonComponent, { data: person });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPeople();
      }
    });
  }

  deletePerson(person: Person) {
    if (window.confirm('Are you sure you want to delete this person?')) {
      this.personService.deletePerson(person.id).subscribe(
        () => {
          console.log('Person deleted successfully');
          this.loadPeople();
        },
        (        err: any) => console.error(err)
      );
    }
  }

}