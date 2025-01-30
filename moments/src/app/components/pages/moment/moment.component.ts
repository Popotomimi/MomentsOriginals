import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { MomentService } from '../../../services/moment.service';
import { MessagesService } from '../../../services/messages.service';

import { Moment } from '../../../Moment';

import { environment } from '../../../../environments/environment.development';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})
export class MomentComponent {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes
  faEdit = faEdit

  constructor(private momentService: MomentService, private route: ActivatedRoute, private messagesService: MessagesService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"))

    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data))
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.add("Momento Excluido com sucesso!");

    this.router.navigate(['/'])
  }
}
