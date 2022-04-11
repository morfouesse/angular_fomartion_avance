import {Injectable} from '@angular/core';
import {IFaceSnap} from "../../models/i-face-snap.model";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {
  snapList: IFaceSnap[] = [{
    id: 1,
    title: "truc",
    description: "string",
    createdDate: new Date(),
    snaps: 0,
    rate: 3.7,
    imageUrl: "https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg"
  }, {
    id: 2,
    title: "poisson",
    description: "carré",
    createdDate: new Date(),
    snaps: 6000,
    imageUrl: "https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg"
  },
    {
      id: 3,
      title: "autruche",
      description: "carré",
      createdDate: new Date(),
      snaps: 50,
      rate: 2.2,
      imageUrl: "https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg"
    },
    {
      id: 4,
      title: "zoo",
      description: "carré",
      createdDate: new Date(),
      snaps: 100,
      imageUrl: "https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg"
    },
  ];

  constructor() {
  }


  snapGetSnapById(id: number): IFaceSnap {
    let snap: IFaceSnap | undefined;
    snap = this.snapList.find((snap) => snap.id === id);
    if (!snap) {
      throw new Error("snap not found !");
    } else {
      return snap;
    }
  }

  snapOrUnsnap(faceSnapId: number, snapType: 'snap' | 'unsnap'): void {
    const snap = this.snapGetSnapById(faceSnapId);
    snapType === 'snap' ? snap.snaps++ : snap.snaps--;
  }

  addFaceSnap(formValue:
                {
                  title: string, description: string, location?: string,
                  imageUrl: string, snaps: number
                }): void {
    const snap: IFaceSnap = {
      createdDate: new Date(),
      id: this.snapList[this.snapList.length - 1].id + 1,
      title: formValue.title,
      description: formValue.description,
      location: formValue.location,
      imageUrl: formValue.imageUrl,
      snaps: formValue.snaps
    };
    this.snapList.push(snap);
  }
}
