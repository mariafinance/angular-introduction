## Βήμα 17: CRUD Example Scaffolding
 
- Δημιουργία των component για το CRUD Example:
 
  ```bash
  ng g c components/crud/crud-dashboard
  ng g c components/crud/crud-navbar
  ng g c components/crud/crud-create-example
  ng g c components/crud/crud-read-example
  ng g c components/crud/crud-update-example
  ng g c components/crud/crud-delete-example
  ```
 
- Ενημέρωση του κεντρικού μενού της εφαρμογής για το path `crud-example` προς το `CrudDashboardComponent`
 
- Οι επιλογές του CRUD γίνονται από το μενού του `CrudNavbarComponent`
has context menu


## Βήμα 16: Υλοποίηση της άσκησης Fun-for-nerds
## Βήμα 15: User Authentication
 
- Δημιουργούμε το `RestrictedContentExampleComponent` που θα λειτουργήσει σαν την πρώτη "προστατευμένη" περιοχή της εφαρμογής μας, με την έννοια ότι θα είναι προσβάσιμη μόνο από χρήστες που έχουν εγγραφεί μέσω του registration και έχουν κάνει επιτυχή έλεγχο πρόσβασης. Ενημερώνουμε το `app.routes.ts` και το μενού στο `list-group-menu.component.ts` κατά τα γνωστά και προς το παρόν όλοι οι χρήστες έχουν πρόσβαση.
 
- Δημιουργούμε το `UserLoginComponent` που θα παρουσιάζει τη φόρμα που ζητά τα user credentials (email και password) με σκοπό να τα υποβάλλει σε μέθοδο του `UserService` που θα επικοινωνήσει με το backend για τον έλεγχό τους. Η τιμή της φόρμας μετατρέπεται στο τύπο
 
  ```typescript
  export interface Credentials {
    email: string;
    password: string;
  }
  ```
 
  καθώς αυτού του τύπου δεδομένα αναμένει το endpoint `/user/login/` στο backend. H μέθοδος της υποβολής με POST στο backend βρίσκεται στο `user.service.ts` (σε περίπτωση επιτυχημένου ελέγχου πρόσβασης δημιουργείται στο backend και επιστρέφεται ένα **JWT token** στο χαρακτηριστικό του response `access_token`):
 
  ```typescript
  loginUser(credentials: Credentials) {
      return this.http.post<{ access_token: string }>(
        `${API_URL}/login`,
        credentials,
      );
  }
  ```
 
- Η κλήση στο service γίνεται στο `onSubmit()` του `UserLoginComponent` όπου στο subscription της απάντησης του backend λαμβάνουμε το αποτέλεσμα του επιτυχημένου ελέγχου πρόσβασης στο callback του χαρακτηριστικού `next`. Καθώς αυτό που θα λάβουμε είναι ένα κωδικοποιημένο JWT token υπάρχει ανάγκη να το αποκωδικοποιήσουμε (αφού πρώτα το αποθηκεύσουμε στο `localStorage`):
 
  ```bash
  npm i jwt-decode
  ```
 
- Τα `signals` στο Angular Framework 17+ επιτρέπουν τη δημιουργία μεταβλητών που, μέσω των services, **όλα τα component** έχουν πρόσβαση στην τελευταία τιμή που έχει ανατεθεί σε αυτές τις μεταβλητές. Επιπρόσθετα η δέσμευση ενός signal από κάποιο component δίνει τη δυνατότητα στο component να **αντιδρά αυτόματα!** στις αλλαγές του signal.
- Θα χρησιμοποιήσουμε ένα signal για να υλοποιήσουμε την έννοια του ενεργού αυθεντικοποιημένου (authenticated) χρήστη που για την εφαρμογή μας θα είναι ένα αντικείμενο τύπου (`src/app/shared/interfaces/mongo-backend.ts`):
 
  ```typescript
  export interface LoggedInUser {
    fullname: string;
    email: string;
  }
  ```
 
- Αν κανείς χρήστης δεν έχει κάνει login στην εφαρμογή, όπως όταν η εφαρμογή μόλις ξεκινά, τότε το signal θα περιέχει το `null` αλλιώς τον τύπο `LoggedInUser` (στο `src/app/shared/services/user.service.ts`):
 
  ```typescript
  user = signal<LoggedInUser | null>(null);
  ```
 
- Μπορούμε να παρακολουθούμε τις αλλαγές στα signals αν στο service χρησιμοποιήσουμε το `effect` που το callback που λαμβάνει εκτελείται αυτόματα σε κάθε αλλαγή των signals:
 
  ```typescript
  effect(() => {
    if (this.user()) {
      console.log("User logged in:", this.user().fullname);
    } else {
      console.log("No user logged in");
    }
  });
  ```
 
- Είμαστε σε θέση να ολοκληρώσουμε το callback του subscription στην κλήση του backend για τον έλεγχο πρόσβασης:
 
  ```typescript
  this.userService.loginUser(credentials).subscribe({
    next: (response) => {
      const access_token = response.access_token;
      localStorage.setItem("access_token", access_token);
      const decodedTokenSubject = jwtDecode(access_token).sub as unknown as LoggedInUser;
 
      this.userService.user.set({
        fullname: decodedTokenSubject.fullname,
        email: decodedTokenSubject.email,
      });
      this.router.navigate(["restricted-content-example"]);
    },
    error: (error) => {
      console.error("Login error:", error);
      this.invalidLogin = true;
    },
  });
  ```
 
  Μόλις το JWT token αποκωδικοποιηθεί τότε το payload ανατίθεται στη δομή του signal που αναπαριστά τον τρέχοντα αυθεντικοποιημένο χρήστη με χρήση της μεθόδου `.set(value:T)`. Τότε και μόνο τότε γίνεται αυτόματο redirection προς την προστατευμένη περιοχή της εφαρμογής μας.
 
- Επιπρόσθετα χρειάζεται η δημιουργία ενός route guard που θα επιβλέπει στο `app.routes.ts` πως μόνο οι εξουσιοδοτημένοι χρήστες έχουν πρόσβαση στο συγκεκριμένο component:
 
  ```bash
  ng generate guard shared/guards/auth
  ```
 
  Και στο `auth.guard.ts`:
 
  ```typescript
  export const authGuard: CanActivateFn = (route state)   => {
    const userService = inject(UserService);
    const router = inject(Router);
 
    if (userService.user()) {
      return true;
    }
    return router.navigate(['login']);
  };
  ```
 
  Ένας route guard, ή επιστρέφει true και άρα το component επιτρέπεται να εμφανιστεί στο `router-outlet` ή αλλιώς κάνει redirect στη φόρμα του login για να γίνει η διαδικασία του ελέγχου πρόσβασης.
 
- Με σκοπό να εμφανίζεται το ονοματεπώνυμο του loggedin χρήστη και για καλύτερη τακτοποίηση της εφαρμογής μας δημιουργούμε το `NavbarComponent` και χρησιμοποιούμε το signal του `UserService` για να χειριστούμε δυναμικά το template και να εμφανίζεται υπό συνθήκη το όνομα του χρήστη και επιπρόσθετα σε αυτή την περίπτωση, η προτροπή για αποσύνδεση (logout).
 
- H λογική της αποσύνδεσης βρίσκεται στo `UserService`:
 
  ```typescript
  logoutUser() {
    this.user.set(null);
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
  ```

## Βήμα 14: User Registration Form and Service

- Από το σημείο αυτό και στο εξής είναι απαραίτητο να έχετε εγκαταστήσει τη γλώσσα Python και να χρησιμοποιείτε το Python-Flask backend από το repository [angular-introduction-backend](https://github.com/christodoulos/angular-introduction-python-backend).
 
- Δημιουργία των enviroments με την εντολή:
 
  ```bash
  ng generate environments
  ```
 
- Ενημέρωση των αρχείων `environment.development.ts` και `environment.ts`
 
- Δημιουργία του `User` interface στο αρχείο `shared/interfaces/mongo-backend.ts`:
 
  ```typescript
  export interface User {
    givenName: string;
    surName: string;
    email: string;
    password: string;
  }
  ```
 
- Δημιουργία του `UserService` με την εντολή:
 
  ```bash
  ng generate service shared/services/user
  ```
 
  - Η μέθοδος `registerUser` αποστέλλει στο backend τα πλήρη δεδομένα που αφορούν στην εγγραφή ενός νέου χρήστη
  - Η μέθοδος `check_duplicate_email` ρωτά το backend αν το `email` που λαμβάνει σαν όρισμα χρησιμοποιείται ήδη σε κάποια εγγραφή στη βάση.
 
- Δημιουργία του `UserRegistrationComponent` που υλοποιεί μια reactive form για τη διαδικασία του registration:
 
  - Χρησιμοποιεί το `UserService` με τη χρήση του `inject`,
  - Αρχικοποιεί το `registrationStatus`
  - Ορίζει τη φόρμα του registration με δύο πεδία για το password που θα πρέπει να λάβουν από το χρήστη ακριβώς το ίδιο περιεχόμενο
  - Δεύτερο όρισμα στον ορισμό της φόρμας μέσω του `FormGroup` είναι ο **συνολικός validator** της φόρμας, στην περίπτωσή μας η μέθοδος της κλάσης που εξετάζει αν τα δύο password input συμπίπτουν.
    - Στην περίπτωση εντοπισμού λάθους σε κάποιο input, ο Validator επιστρέφει ένα object με ένα κλειδί ενδεικτικό του λάθους
    - To κλειδί αυτό μπορεί μετά να χρησιμοποιηθεί στο template για να εμφανιστεί κατάλληλο μήνυμα λάθους
 
- Στην υποβολή της φόρμας χρησιμοποιείται το `UserService` για να υποβάλλει στo backend τα δεδομένα της φόρμας. Η εγγραφή στην απάντηση του backend ξεχωρίζει τις περιπτώσεις της απάντησης του backend με τα callbacks στα χαρακτηριστικά `next` και `error`:
 
  - `next`: το callback που καλείται όταν στο backend στείλει HTTP response `20*`.
  - `error`: το callback που καλείται όταν το backend στείλει HTTP reponse `40*` ή `50*`.
  - Ανάλογα θέτουμε το `registrationStatus` για να έχουμε τον αντίστοιχο έλεγχο στο template.
 
- Χρήση του backend για τον έλεγχο ύπαρξης duplicate email στη βάση και χρήση της πληροφορίας κατά το event `blur` για να γίνει το πεδίο email invalid.
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
