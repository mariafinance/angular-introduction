## Βήμα 9: Component Output

- Δημιουργία του `ComponentOutputExampleComponent` και ενημέρωση του μενού της εφαρμογής μας (στο `app.routes.ts` και στο `list-group-menu.component.ts`).
- Ενημέρωση του `SimpleDataTableComponent` ώστε να περνάει σαν έξοδο τη γραμμή του πίνακα που επιλέγεται με διπλό κλικ.
  - Χρήση του decorator `@Output()` στο χαρακτηριστικό `personClicked` τύπου `EPerson` στο `SimpleDataTableComponent`.
  - Το output είναι ένα `EventEmitter<T>` που μεταφέρει δεδομένα του συγκεκριμένου τύπου `<Τ>`.
