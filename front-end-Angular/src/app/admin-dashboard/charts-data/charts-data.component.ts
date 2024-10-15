import {Component, OnInit} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {forkJoin, Observable} from "rxjs";
import {ModulesService} from "../../services/modules.service";
import {EnseignantesService} from "../../services/enseignantes.service";
import {FilieresService} from "../../services/filieres.service";
import {Filiere} from "../../../shared/models/Filiere";
import {NgForOf} from "@angular/common";
import {InterventionsService} from "../../services/interventions.service";
Chart.register(...registerables);

@Component({
  selector: 'app-charts-data',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './charts-data.component.html',
  styleUrl: './charts-data.component.css'
})
export class ChartsDataComponent implements OnInit {


  protected modulesNumber : any;
  protected enseignantsNumber : any;
  protected fillieresNumber : any;
  protected interventionsNumber: any;
  protected filieres : Filiere[] = [];
  protected selectedFiliereId: number | undefined;
  protected pieChart?: Chart<'pie', number[], unknown>;
  constructor(private modulesService: ModulesService,
              private enseignantService: EnseignantesService,
              private filliereService: FilieresService,
              private interventionService: InterventionsService
  ) {

  }
  ngOnInit(): void {
    forkJoin([
      this.modulesService.countModules(),
      this.enseignantService.countEnseignants(),
      this.filliereService.countFilieres(),
      this.interventionService.countInterventions(),
      this.filliereService.getFilieres()
    ]).subscribe(([modulesData, enseignantsData,fillieresData,interventionsData, fillieres]) => {
      this.modulesNumber = modulesData;
      this.enseignantsNumber = enseignantsData;
      this.fillieresNumber = fillieresData;
      this.interventionsNumber = interventionsData;
      this.filieres = fillieres;
      this.selectedFiliereId = this.filieres[0].id;
      this.updatePieChart(this.filieres[0].id);

      this.initCharts();
    });


  }

  initCharts() {
    const barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Modules', 'Enseignants', 'Interventions', 'Filliéres'],
        datasets: [{
          label: 'Total',
          data: [this.modulesNumber, this.enseignantsNumber, this.interventionsNumber, this.fillieresNumber],
          backgroundColor: [
            'rgba(59, 130, 246, 0.2)',
            'rgba(52, 211, 153, 0.2)',
            'rgba(245, 158, 11, 0.2)',
            'rgba(167, 139, 250, 0.2)'
          ],
          borderColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(52, 211, 153, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(167, 139, 250, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }


  updatePieChart(filiereId: number): void {
      this.filliereService.getModulesTotalHoursByFiliere(filiereId).subscribe(modules => {
        //console.log(modules);
        const labels = modules.map((module: { moduleName: any; }) => module.moduleName);
        const data = modules.map((module: { totalHours: any; }) => module.totalHours);
        //console.log(labels);
        //console.log(data);
        if (this.pieChart) {
          this.pieChart.destroy();
        }
        this.pieChart = new Chart('pieChart', {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Total',
              data: data,
              backgroundColor: [
                'rgba(59, 130, 246, 0.2)',
                'rgba(52, 211, 153, 0.2)',
                'rgba(245, 158, 11, 0.2)',
                'rgba(167, 139, 250, 0.2)'
              ],
              borderColor: [
                'rgba(59, 130, 246, 1)',
                'rgba(52, 211, 153, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(167, 139, 250, 1)'
              ],
              borderWidth: 1,

            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
          }
        });
      });
  }

  onFiliereChange($event: Event): void {
    // @ts-ignore
    let filiereId = $event.target.value as number
    this.selectedFiliereId = filiereId;
    this.updatePieChart(filiereId);
  }
}
