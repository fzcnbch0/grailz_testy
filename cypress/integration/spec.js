describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#productlink').first().click()
  })

  /*Opis:
      Test otwiera stronę główną aplikacji.
      Wybiera pierwszy produkt (element z identyfikatorem #productlink).
      Przekierowuje użytkownika na stronę szczegółów produktu.*/

  // ----------------------------------------------------------------------------------------------

  it('login', () => {
    cy.visit('http://localhost:5173/account')
    cy.get('input[placeholder="Nazwa użytkownika"]').type('Bruno Szwec')
    cy.get('input[placeholder=Hasło]').type('password1')
    cy.get('button[type=submit]').click()
    cy.get('#wback div').contains('Bruno Szwec')
  })

  /*Opis:
      Test otwiera stronę logowania (/account).
      Wypełnia pole "Nazwa użytkownika" tekstem Bruno Szwec.
      Wypełnia pole "Hasło" tekstem password1.
      Kliknięcie przycisku "Zaloguj" (button[type=submit]).
      Sprawdza, czy na stronie pojawia się imię i nazwisko użytkownika (#wback div), co potwierdza pomyślne logowanie.*/

  // ------------------------------------------------------------------------------------------

  it('men category', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#choice').click()
    cy.url().should('include','men')
  })

  /*Opis:
      Test otwiera stronę główną aplikacji.
      Kliknięcie przycisku kategorii (identyfikator #choice).
      Sprawdza, czy URL zawiera frazę men, co potwierdza przejście do kategorii "Men".*/

  //-----------------------------------------------------------------------------
  it('shop item', () => {
    cy.loginViaUi()
    cy.get('.navbar-brand .text').click()
    cy.get('#choice').click()
    cy.url().should('include','men')
    cy.get('#productlink').first().click()
    cy.get('.fa-heart').first().click()
    cy.get('#cart-button').click()
    cy.get('#checkbox').click()
    cy.get('#buttons .cart-buttons:nth-of-type(2)').click()
    cy.get('.order-button').click()
  })
  /*
  * Testuje pełny proces zakupu produktu.
      Kroki testu:
      Wykorzystanie komendy cy.loginViaUi() do zalogowania użytkownika.
      Przejście na stronę główną aplikacji poprzez kliknięcie .navbar-brand .text.
      Przejście do kategorii "Men" (kliknięcie #choice).
      Wybranie pierwszego produktu (#productlink).
      Dodanie produktu do ulubionych (.fa-heart).
      Przejście do koszyka (#cart-button).
      Zaznaczenie zgody na warunki (#checkbox).
      Przejście do podsumowania zamówienia (#buttons .cart-buttons:nth-of-type(2)).
      Finalizacja zamówienia (kliknięcie .order-button).*/

  // ----------------------------------------------------------------------------------

  //http://localhost:5173/account
})