import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonComponent } from '../person/person.component';
import { Person } from 'src/app/modules/cliente/Models/Person';
import { PersonService } from 'src/app/modules/cliente/Services/PersonService';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Confirmar eliminación',
      text: '¿Estás seguro de que quieres eliminar esta persona?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personService.deletePerson(person.id).subscribe(
          () => {
            Swal.fire('success','Eliminado exitosamente', 'success');
            this.loadPeople();
          },
          (err: any) => Swal.fire('Error', err, 'error')
        );
      }
    });
  
  }

}