import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {delay, interval, map, Observable, of, Subject, switchMap, take, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.less']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  constructor(private router: Router) {
  }

  redTrainsCalled = 0;
  yellowTrainsCalled = 0;
  // Subject émet à la demande
  private destroy$: Subject<boolean> = new Subject<boolean>();
  interval$: Observable<number> = interval(500);

  ngOnInit() {
    this.interval$.pipe(
      // Cet opérateur dit à l'Observable  interval  de continuer à émettre tant que
      // destroy$  n'a pas émis, mais dès que  destroy$  émet, l'Observable est compléter (finit).
      takeUntil(this.destroy$),
      // on prend les 10 premiers resultats
      take(10),
      // on modifie les valeurs( chiffres) en string: rouge ou jaune
      map(value => value % 2 === 0 ? 'rouge' : 'jaune'),
      // effet secondaire : un texte en log + une couleur CSS
      tap(color => console.log(`La lumière s'allume en %c${color}`, `color: ${this.translateColor(color)}`)),
      // mergeMap : l'observable la plus rapide envoie son flux

      // concatMap : tant qu'une donnée d'une observable interne n'est pas fini alors on attend qu'elle finisse
      // ( ici le train rouge attendra le train jaune)
      // sans empecher le flux de l'observable externe de doubler l'observable interne

      // exhaustMap : ignore toute nouvelle émission de l'Observable extérieur tant qu'il
      // y a une souscription active à un Observable intérieur, si l'observable externe fini avant l'interne alors
      // on n'affichera pas tout le flux de l'interne.

      // switchMap : Quand switchMap reçoit une nouvelle émission de l'Observable extérieur, s'il y a une souscription
      // active(lente) à un Observable intérieur, il l'annule et souscrit au suivant.

      switchMap(color => this.getTrainObservable$(color)),
      // effts secondaire pour les trains arrivées
      tap(train => console.log(` ObIntérieur Train ${train.color} ${train.trainIndex} arrivé !`,
        `font-weight: bold; color: ${this.translateColor(train.color)}`))
    ).subscribe();
  }

  getTrainObservable$(color: 'rouge' | 'jaune') {
    const isRedTrain: boolean = color === 'rouge';
    const trainIndex: number = this.addOneRedOrYellowTrain(isRedTrain);
    console.log(`Train ${color} %c${trainIndex} appelé !`,
      `text-decoration: underline; color: ${this.translateColor(color)}`);
    return of({color, trainIndex}).pipe(
      delay(isRedTrain ? 10 : 5000),
      takeUntil(this.destroy$),
    );
  }

  private addOneRedOrYellowTrain(isRedTrain: boolean) {
    isRedTrain ? this.redTrainsCalled++ : this.yellowTrainsCalled++;
    return isRedTrain ? this.redTrainsCalled : this.yellowTrainsCalled;
  }

  translateColor(color: 'rouge' | 'jaune') {
    return color === 'rouge' ? 'red' : 'yellow';
  }


  onHome(): void {
    this.router.navigateByUrl("facesnaps").then(response => response, error => error);
  }

  logger(text: string): void {
    console.log(`Log: ${text}`);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
