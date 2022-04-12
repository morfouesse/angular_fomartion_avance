import {Injectable} from '@angular/core';
import {IFaceSnap} from "../../models/i-face-snap.model";
import {map, Observable, OperatorFunction, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SnapOrUnsnapEnum} from "../../utils/snap-or-unsnap-enum";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http: HttpClient) {
  }


  getAllFaceSnaps(): Observable<IFaceSnap[]> {
    return this.http.get<IFaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(faceSnapId: number): Observable<IFaceSnap> {
    return this.http.get<IFaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  addOneSnapOrRemoveOneSnap(id: number, snapType: SnapOrUnsnapEnum): Observable<IFaceSnap> {
    return this.getFaceSnapById(id).pipe(
      // avec map je modifie le snap courant
      map(
        (snap) => (
          // dans cette objet, nous mettons tout les attribut du snap(callback) grace à "...snap"
          // et nous modifions l'atributs "snaps"
          {
            ...snap,
            // par rapport à tout les snaps on fait cette opération
            snaps: snap.snaps + (snapType === SnapOrUnsnapEnum.snap ? 1 : -1)
          })
      ),
      //L'Observable extérieur ici est une requête GET.
      // Il va donc émettre une fois et compléter (ou émettre une erreur si le serveur retourne une erreur).
      // On n'aura donc jamais la situation où l'Observable extérieur émet de nouveau
      // alors qu'une souscription à l'Observable intérieur est en cours.
      //On peut donc, dans ce cas, utiliser l'opérateur haut niveau que l'on veut !
      switchMap(updatedSnap => this.http.put<IFaceSnap>(
        `http://localhost:3000/facesnaps/${id}`,
        updatedSnap)
      )
    );
  }

  /* {
      title: string, description: string, location?: string, imageUrl: string, snaps: number
    }
  */
  addFaceSnap(formValue: FormGroup): Observable<IFaceSnap> {

    return this.getAllFaceSnaps().pipe(
      // on met les snaps en ordre croissant
      this.snapAscending(),
      //on récupere le dernier snap ( celui qui a le plus grand id)
      this.getLastSnapWithTheBiggestId(),
      // on ajoute un snap
      this.addSnapWithDataForm(formValue),
      // on ajoute coté serveur le snap
      this.postSnap(),
    );
  }

  public postSnap(): OperatorFunction<IFaceSnap, IFaceSnap> {
    return switchMap((newSnap: IFaceSnap) => this.http.post<IFaceSnap>("http://localhost:3000/facesnaps", newSnap));
  }

  public addSnapWithDataForm(formValue: FormGroup): OperatorFunction<IFaceSnap, IFaceSnap> {
    return map((snapWithBiggestId: IFaceSnap) => (
      // IfaceSnap object
      {
        ...formValue.value,
        snaps: 0,
        createdDate: new Date(),
        // on crée un objet avec + 1 du plus grand id existant
        id: snapWithBiggestId.id + 1
      }
    ));
  }

  public getLastSnapWithTheBiggestId(): OperatorFunction<IFaceSnap[], IFaceSnap> {
    return map((sortedSnap: IFaceSnap[]) => sortedSnap[sortedSnap.length - 1]);
  }

  public snapAscending(): OperatorFunction<IFaceSnap[], IFaceSnap[]> {
    return map((snap: IFaceSnap[]) => [...snap].sort((a, b) => a.id - b.id));
  }
}
