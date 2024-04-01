## Βήμα 7: Fancy App Menu με το [list-group](https://t.ly/vmYc2) του Bootstrap

- Δημιουργία νέου interface `MenuItem` στο αρχείο `shared/interfaces/menu-item.ts`:

  ```typescript
  export interface MenuItem {
    text: string; // Κείμενο που εμφανίζεται στο μενού
    routerLink: string; // Το path που αντιστοιχεί στο component
  }
  ```

- Δημιουργία του component `ListGroupMenuComponent` με την εντολή:

  ```bash
  ng g c components/list-group-menu
  ```

- To μενού της εφαρμογής μας είναι ένας πίνακας αντικειμένων `MenuEntry`:

  ```typescript
  menu: MenuEntry[] = [
    { text: 'Component Input Example', routerLink: 'component-input-example' },
    { text: '@for Directive Example', routerLink: 'for-directive-example' },
    { text: 'Event Bind Example', routerLink: 'event-bind-example' },
  ];
  ```
