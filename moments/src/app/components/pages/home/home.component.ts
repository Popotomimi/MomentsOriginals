import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../Moment';
import { environment } from '../../../../environments/environment.development';
import { format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe(
      (items) => {
        const data = items.data;

        data.forEach((item) => {
          if (item.created_at) {
            const parsedDate = parseISO(item.created_at);
            if (isValid(parsedDate)) {
              item.created_at = format(parsedDate, 'dd/MM/yyyy', { locale: ptBR });
            } else {
              item.created_at = 'Data inválida';
            }
          } else {
            item.created_at = 'Data inválida';
          }
        });

        this.allMoments = data;
        this.moments = data;
      },
      (error) => {
        console.error('Erro ao buscar momentos:', error);
      }
    );
  }
}
