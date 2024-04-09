## Βήμα 13: ΗTTP Client Service

- Για να μπορέσουμε να χρησιμοποιήσουμε τον HTTP Client είναι απαραίτητη η επέμβαση στο `app.config.ts` :

  ```typescript
  import { ApplicationConfig } from "@angular/core";
  import { provideRouter } from "@angular/router";

  import { routes } from "./app.routes";
  import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

  import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

  export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withInterceptorsFromDi())],
  };
  ```

- Δημιουργία του `JokesService` με την εντολή:

  ```bash
  ng generate service shared/services/jokes
  ```

  - Συνηθίζουμε να ορίζουμε με `const` το URL του API που θα χρησιμοποιήσουμε:

    ```typescript
    const DAD_JOKES_API_URL = "https://icanhazdadjoke.com/";
    const JACK_NORRIS_JOKES_API_URL = "https://api.chucknorris.io/jokes/random";
    ```

  - Το service είναι μια κλάση της Typescript με τον decorator `@Injectable({providedIn: 'root'})` που επιτρέπει την ενσωμάτωση του service σε όλα τα Angular components με χρήση του `inject`.
  - Ο `HttpClient` είναι ένα έτοιμο Angular service που παρέχει τη δυνατότητα αποστολής HTTP requests και λήψης HTTP responses. Τα service της εφαρμογής μας ενσωματώνουν άμεσα τον `HttpClient` με τη χρήση του `inject`.

- Δημιουργία του `HttpClientExampleComponent` για την επίδειξη της λειτουργίας του `HttpClient` μέσω του `JokesService`:

```bash
ng g c components/http-client-example
```

- Έλεγχος του τύπου των δεδομένων που επιστρέφουν οι κλήσεις των API με το `console.log`.

```typescript
import { Component, inject } from "@angular/core";
import { JokesService } from "src/app/shared/services/jokes.service";

@Component({
  selector: "app-http-client-example",
  standalone: true,
  imports: [],
  templateUrl: "./http-client-example.component.html",
  styleUrl: "./http-client-example.component.css",
})
export class HttpClientExampleComponent {
  jokesService = inject(JokesService);

  ngOnInit(): void {
    this.jokesService.getDadJoke().subscribe((data) => {
      console.log(data);
    });
    this.jokesService.getChuckNorrisJoke().subscribe((data) => {
      console.log(data);
    });
  }
}
```

- Δημιουργία των Interfaces `DadJoke` και `ChuckNorrisJoke` στο αρχείο `shared/interfaces/jokes.ts`:

```typescript
export interface DadJoke {
  joke: string;
}

export interface ChuckNorrisJoke {
  value: string;
}
```

- Χρήση των interfaces για casting στον HttpClient:

```typescript
getDadJoke() {
    return this.http.get<DadJoke>(DAD_JOKES_API_URL, {
      headers: {
        Accept: 'application/json',
      },
    });
  }

  getChuckNorrisJoke() {
    return this.http.get<ChuckNorrisJoke>(JACK_NORRIS_JOKES_API_URL, {
      headers: {
        Accept: 'application/json',
      },
    });
  }
```

- Ενημέρωση του μενού της εφαρμογής μας

## Βήμα 12: Reactive Forms

- Ξεκινάμε με τα αντίστοιχα βήματα όπως στο βήμα 11.

Η φόρμα ορίζεται στο component και συνδέεται με τα input του template. Ένας click handler μεταφέρει τα δεδομένα στο component και στη συνέχεια ένα EventEmitter μεταφέρει τα δεδομένα στο component γονέα.

- Χρήση του `ReactiveFormsModule` στον πίνακα imports του component (εμπλουτίζει τα templates με επιπλέον HTML markup ώστε να μπορούν να συσχετιστούν με τα χαρακτηριστικά του component).
- Χρήση των κλάσεων `FormGroup` και `FormControl` για τη δόμηση του αντικειμένου που παράγεται από τη φόρμα. Χρήση των `Validators`.
- Δέσμευση του χαρακτηριστικού `form` του component με χρήση του `<form [formGroup]="form">...</form>`.
- Σύνδεση του input με το `FormControl` με χρήση του `formControlName`.
- Άμεση πρόσβαση στο πεδίο της φόρμας με το `form.get('όνομα πεδίου')`
- Κατά το Submit το χαρακτηριστικό `form` έχει ήδη τιμή στο component.

## Βήμα 11: Template Driven Forms

- Δημιουργία των `EpersonTemplateDrivenFormComponent` και `TemplateDrivenFormExampleComponent`.
- Ενημέρωση του μενού της εφαρμογής μας (στο `app.routes.ts` και στο `list-group-menu.component.ts`).
- Επέμβαση στο `SimpleDatatableComponent` για την περίπτωση του κενού πίνακα.
- Χρήση του Angular Forms Module.

Η φόρμα ορίζεται στο template και μεταφέρει δεδομένα στο component κατά την υποβολή της. Συνήθως τότε, ένα EventEmitter μεταφέρει τα δεδομένα στο component γονέα.

- Χρήση του `FormsModule` στον πίνακα imports του component (εμπλουτίζει τα templates με επιπλέον HTML markup ώστε να δημιουργούνται objects από τις φόρμες).
- `<form #form="ngForm">...</form>` ορίζει πως η HTML φόρμα δημιουργεί ένα αντικείμενο που είναι διαχειρίσιμο στα πλαίσια του template με τη μεταβλητή (template variable) `form`.
- Το αντικείμενο `form` περνά σαν όρισμα στο `onSubmit(form)` όταν συμβεί το event `onSubmit` (ελέγχεται από το κουμπί Submit που μπορεί να πατηθεί μόνο όταν η φόρμα είναι ορθά συμπληρωμένη (valid)).
- Δίνουμε στο name του input το όνομα του χαρακτηριστικού του αντικειμένου που παράγει η φόρμα και σχετίζεται (το χαρακτηριστικό) με το συγκεκριμένο input. Το συγκεκριμένο χαρακτηριστικό συμμετέχει στο αντικείμενο μόνο αν συμπεριλάβουμε την οδηγία `ngModel`.
- Με το `#givenName="ngModel"` δηλώνουμε τη μεταβλητή template με όνομα `givenName` που είναι αντικείμενο που μπορεί να εξεταστεί για την ορθότητά του με το `givenName.errors` και να χρησιμοποιηθεί για την υπο συνθήκη εμφάνιση επεξηγηματικού κειμένου για το ενδεχόμενο λάθος ορθότητας.

## Βήμα 10: Angular Material

- Εγκατάσταση του Angular Material και του Angular CDK:

  ```bash
  ❯ ng add @angular/material
  ℹ Using package manager: npm
  ✔ Found compatible package version: @angular/material@17.3.2.
  ✔ Package information loaded.

  The package @angular/material@17.3.2 will be installed and executed.
  Would you like to proceed? Yes
  ✔ Packages successfully installed.
  ? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink        [ Preview:
  https://material.angular.io?theme=indigo-pink ]
  ? Set up global Angular Material typography styles? No
  ? Include the Angular animations module? Include and enable animations
  UPDATE package.json (1396 bytes)
  ✔ Packages installed successfully.
  UPDATE src/app/app.config.ts (338 bytes)
  UPDATE angular.json (3652 bytes)
  UPDATE src/index.html (516 bytes)
  UPDATE src/styles.css (181 bytes)
  ```

- Επέμβαση στο `PersonTableComponent` για να χειρίζεται δεδομένα είτε `Person` είτε `EPerson`.
- Επέμβαση στο `ComponentOutputExampleComponent` και αντικατάσταση του `alert` με το `dialog` του Angular Material (https://t.ly/JLFka).
