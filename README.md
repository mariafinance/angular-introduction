## Βήμα 6: Routing

- Σκοπός μας είναι να κάνουμε επιλογές από το μενού στα αριστερά και τα component να εμφανίζονται στο χώρο δεξιά.
- Δημιουργία του Welcome component, αυτό που θα εμφανίζεται πρώτο όταν ξεκινήσει η εφαρμογή (χρησιμοποιεί κι ένα λογότυπο από το `/assets`):

  ```bash
  ng g c welcome
  ```

- Στο αρχείο `app.routes.ts` ο πίνακας `routes` περιέχει αντικείμενα που είναι ο κατάλογος των path που εμφανίζονται στο μενού της εφαρμογής μαζί με το Angular component που αντιστοιχεί στο path.

  ```typescript
  import { Routes } from "@angular/router";
  import { EventBindExampleComponent } from "src/app/components/event-bind-example/event-bind-example.component";
  import { WelcomeComponent } from "./components/welcome/welcome.component";

  export const routes: Routes = [
    { path: "event-bind-example", component: EventBindExampleComponent },
    { path: "welcome", component: WelcomeComponent },
    { path: "", redirectTo: "/welcome", pathMatch: "full" },
  ];
  ```

- Ήδη στο αρχείο `app.config.ts` ο κατάλογος των routes περνάει στο `provideRouter`:

  ```typescript
  import { ApplicationConfig } from "@angular/core";
  import { provideRouter } from "@angular/router";

  import { routes } from "./app.routes";

  export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)],
  };
  ```

- Το ακριβές σημείο στο template που θα εισάγονται τα component δηλώνεται με τη χρήση του tag `<router-outlet>`:

  ```html
  ...
  <span class="flex-grow-1 p-2 text-nowrap">
    <router-outlet></router-outlet>
  </span>
  ...
  ```

- Παράδειγμα ροής για μια επιλογή του χρήστη:

  1. Ο χρήστης επιλέγει κάτι από το μενού που στην HTML το tag που αφορά την επιλογή συμπεριλαμβάνει την οδηγία `routerLink`, π.χ. στο `app.component.html` το tag `<span role="button" routerLink="event-bind-example">Event Bind Example</span>`.
  2. Ο έλεγχος μεταβιβάζεται στο αρχείο `app.routes.ts` όπου γίνεται αναζήτηση στον πίνακα `routes` για την εύρεση του αντικειμένου που έχει τιμή στο χαρακτηριστικό `path` ίδια με την τιμή του `routerLink` στο tag από το βήμα 1.
  3. To URL αλλάζει σε αυτό που αντιστοιχεί στο path του αντικειμένου του βήματος 2.
  4. Στο πλαίσιο του `<router-outlet></router-outlet>` εμφανίζεται το component από το χαρακτηριστικό του αντικειμένου του βήματος 2.

- Δημιουργία των `ComponentInputExampleComponent` και `ForDirectiveExampleComponent` και προσθήκη στο μενού της εφαρμογής:

  1. Ενημέρωση του αρχείου `app.routes.ts`
  2. Ενημέρωση του html μενού με τις κατάλληλες οδηγίες `routerLink`
