import {Component} from '@angular/core';
//import { MatTableDataSource } from '@angular/material';
/**
 * @title Radios with ngModel
 */
@Component({
  selector: 'radio-ng-model-example',
  templateUrl: 'radio-ng-model-example.html',
  styleUrls: ['radio-ng-model-example.css'],
})

export class RadioNgModelExample {
  
  displayedColumns = ['position',
                       'question',
                       'reponse',
                       'clarte'
                  ];
  dataSource =  ELEMENT_DATA;
 /** dataSource_two =  ELEMENT_DATA_two;
  dataSource_three =  ELEMENT_DATA_three;
  dataSource_four =  ELEMENT_DATA_four;*/

  favoriteResponse: string;
  panelOpenState: boolean = false;
  reponsepossible = [
    'pas du tout d accord',
    'plutot pas d accord',
    'pas d avis',
    'plutot d accord',
    'tout à fait d accord'
  ];

  listeDesreponses (){
    console.log('dataSource: ', this.dataSource );
  }
 
}


export interface Element {
  question: string;
  position: number;
  reponse: string;
  clarte: string;
}


const ELEMENT_DATA: Element[] = [
  
  {position: 1, question: 'Je connais les objectifs de la formation.', reponse: '', clarte: ''},
  {position: 2, question: 'Je sais identifier ce que je dois apprendre.', reponse: '', clarte: ''},
  {position: 3, question: 'Je connais mes objectifs personnels et professionnels.', reponse: '', clarte: ''},
  {position: 4, question: 'Je sais identifier les ressources pertinentes pour atteindre les objectifs fixés (personnes-ressources, documents officiels, etc.).', reponse: '', clarte: ''},
  {position: 5, question: 'Je sais mettre ensemble des ressources de sources diverses pour trouver des solutions.', reponse: '', clarte: ''},
  {position: 6, question: 'Je sais comment faire pour atteindre mes objectifs.', reponse: '', clarte: ''},
  {position: 7, question: 'On m’aide à définir des stratégies.', reponse: '', clarte: ''},
  {position: 8, question: 'Je sais me situer par rapport aux objectifs d’apprentissage fixés.', reponse: '', clarte: ''},
  {position: 9, question: 'Je prends la responsabilité de mes actions.', reponse: '', clarte: ''},
  {position: 10, question: 'J’évalue seul(e) mes actions.', reponse: '', clarte: ''},
  {position: 11, question: 'J’ai besoin d’un avis extérieur pour valider mes apprentissages.', reponse: '', clarte: ''},
  {position: 12, question: 'J’identifie quelle est ma place au sein de l’organisation.', reponse: '', clarte: ''},
  {position: 13, question: 'Je perçois une différence entre ce que l’organisation attend de et qui je suis /ce dont je suis capable.', reponse: '', clarte: ''},
                     
  {position: 14, question: 'Je peux définir avec précision le contour du métier auquel je me prépare.', reponse: '', clarte: ''},
  {position: 15, question: 'J’identifie les enjeux de mes missions au sein de l’organisation.', reponse: '', clarte: ''},
  {position: 16, question: 'Je me remets souvent en question.', reponse: '', clarte: ''},
  {position: 17, question: 'Je me compare à mes collègues.', reponse: '', clarte: ''},
  {position: 18, question: 'Certains échanges entre collègues m’ont beaucoup fait réfléchir  voire transformé.', reponse: '', clarte: ''},
  {position: 19, question: 'J’ai besoin de la validation de mes collègues avant de poursuivre mes activités.', reponse: '', clarte: ''},
  {position: 20, question: 'Je suis fier de ce que je fais.', reponse: '', clarte: ''},
  {position: 21, question: '’aime parler de mon activité professionnelle à mes proches.', reponse: '', clarte: ''},
  {position: 22, question: 'Je prends fermement position lors des réunions.', reponse: '', clarte: ''},
  {position: 23, question: 'Je sais prendre position de manière argumentée (mise à profit de mon expérience + conceptualisation)', reponse: '' , clarte: ''},
  {position: 24, question: 'J’ai tendance à être en retrait lors des réunions.', reponse: '', clarte: ''},
  {position: 25, question: 'La perspective de me rendre sur mon terrain professionnel me réjouit.', reponse: '', clarte: ''},
  {position: 26, question: 'Je perçois les retours de mes collègues comme des moments  constructifs pour ma pratique.', reponse: '', clarte: ''},
  {position: 27, question: 'Les difficultés rencontrées me semblent revenir en boucle.', reponse: '', clarte: ''},
  {position: 28, question: 'La perspective de me rendre à l’université me réjouit.', reponse: '', clarte: ''},
  {position: 29, question: 'Les difficultés rencontrées me renvoient à d’autres moments difficiles de ma vie', reponse: '', clarte: ''},
  {position: 30, question: 'Les reproches des collègues et de la hiérarchie m’empêchent d’avancer', reponse: '', clarte: ''},
  {position: 31, question: 'Je suis fier de l’organisation qui m’accueille.', reponse: '', clarte: ''},
  {position: 32, question: 'Je repère facilement les ressources nécessaires (matérielles,humaines) à ma pratique professionnelle.', reponse: '', clarte: ''},
  {position: 33, question: 'Je me conforme aux règles implicites de mon activité professionnelle.', reponse: '', clarte: ''},
  {position: 34, question: 'J’identifie les règles et normes affichées de mon organisation.', reponse: '', clarte: ''},
  {position: 35, question: 'J’éprouve le besoin d’échanger avec mes collègues,subordonnés ou supérieurs.', reponse: '', clarte: ''},
  {position: 36, question: 'Je sollicite des collègues pour des questions d’ordre professionnel.', reponse: '', clarte: ''},
  {position: 37, question: 'Je sollicite des collègues pour des questions d’ordre personnel.', reponse: '', clarte: ''},
  {position: 38, question: 'Les collègues viennent vers moi facilement.', reponse: '', clarte: ''},
  {position: 39, question: 'je vais facilement vers les collègues.', reponse: '', clarte: ''},
  {position: 40, question: 'Je me sens intégré dans l’équipe avec laquelle je travaille.', reponse: '', clarte: ''},
  {position: 41, question: 'Je suis convié aux moments d’échanges informels du collectif de travail.', reponse: '', clarte: ''},
  {position: 42, question: 'Je me sens plutôt écarté de mon équipe.', reponse: '', clarte: ''},
  {position: 43, question: 'Je réutilise des savoirs, savoir-faire acquis lors de la formation universitaire.', reponse: '', clarte: ''},
  {position: 44, question: 'Dans le cadre de mon activité professionnelle, j’utilise principalement des savoirs et savoir-faire acquis lors de mon expérience personnelle et professionnelle antérieure.', reponse: '', clarte: ''},
                           
  {position: 45, question: 'Je partage les valeurs de l’organisation.', reponse: '', clarte: ''},
  {position: 46, question: 'Je crois en ce que je fais.', reponse: '', clarte: ''},
  {position: 47, question: 'Les valeurs de l’organisation sont en contradiction avec les miennes.', reponse: '', clarte: ''},
  {position: 48, question: 'J’atteins les objectifs professionnels que je me fixe.', reponse: '', clarte: ''},
  {position: 49, question: 'J’entreprends toutes les actions possibles dans le cadre de mon activité pour devenir ce que l’on attend de moi.', reponse: '', clarte: ''},
  {position: 50, question: 'Je me sens vite dépassé par un imprévu.', reponse: '', clarte: ''},
  {position: 51, question: 'Je connais mes limites.', reponse: '', clarte: ''},
  {position: 52, question: 'Je délègue facilement.', reponse: '', clarte: ''},
  {position: 53, question: 'J’identifie facilement les « bonnes façons de faire » de mon activité professionnelle.', reponse: '', clarte: ''},
  {position: 54, question: 'Face à un accident, incident ou conflit, je réajuste ma pratique rapidement.', reponse: '', clarte: ''},
  {position: 55, question: 'Je vise l’autonomie des personnes avec qui je travaille.', reponse: '', clarte: ''}

 ];
 
/**const ELEMENT_DATA_two: Element[] = [
  {position: 1, question: 'J’atteins les objectifs professionnels que je me fixe', reponse: ''}
];

const ELEMENT_DATA_three: Element[] = [
  {position: 1, question: 'J’entreprends toutes les actions possibles dans le cadre de mon activité pour devenir ce que l’on attend de moi ', reponse: ''},
  {position: 2, question: 'Je me sens vite dépassé par un imprévu', reponse: ''},
  {position: 3, question: 'Je connais mes limites', reponse: ''},
  {position: 4, question: '	Je délègue facilement', reponse: ''}
];

const ELEMENT_DATA_four: Element[] = [
  {position: 2, question: 'Je vise l’autonomie des personnes avec qui je travaille', reponse: ''},
  {position: 1, question: 'J’identifie facilement les « bonnes façons de faire » de mon activité professionnelle. J’estime respecter les normes de mon activité', reponse: ''},
  {position: 2, question: '	Face à un accident, incident ou conflit, je réajuste ma pratique rapidement', reponse: ''}
];*/
