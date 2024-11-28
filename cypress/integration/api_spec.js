describe('GET /items', () => {
    // Test 1: Sprawdzanie listy przedmiotów
    it('should return a list of items', () => {
      cy.request('/items')
        .its('body') // Otrzymujemy odpowiedź z API
        .should('be.an', 'array') // Powinna być tablicą
        .and('have.length.greaterThan', 0); // Powinna mieć co najmniej 1 element
    });
  
    // Test 2: Filtrowanie przedmiotów po nazwie
    it('should filter items by name', () => {
      // Zastąp 'someItemName' nazwą przedmiotu, którego chcesz szukać
      const itemName = 'boxy-tshirt';
      cy.request(`/items?name=${itemName}`)
        .its('body') // Otrzymujemy odpowiedź z API
        .should('be.an', 'array') // Powinna być tablicą
        .and('have.length.greaterThan', 0); // Powinna zawierać przynajmniej jeden przedmiot
  
      // Sprawdzamy, czy każdy element w tablicy zawiera nazwę przedmiotu
      cy.request(`/items?name=${itemName}`).then((response) => {
        const items = response.body;
        items.forEach((item) => {
          expect(item.name).to.include(itemName); // Każdy przedmiot powinien zawierać nazwę
        });
      });
    });
  
    // Test 3: Filtrowanie przedmiotów po przedziale cenowym
    it('should filter items by price range', () => {
      const minPrice = 10;
      const maxPrice = 50;
  
      cy.request(`/items?minPrice=${minPrice}&maxPrice=${maxPrice}`).then((response) => {
        const items = response.body;
        items.forEach((item) => {
          const price = parseFloat(item.price); // Konwertowanie ceny na liczbę
          expect(price).to.be.within(minPrice, maxPrice); // Sprawdzamy, czy cena mieści się w przedziale
        });
      });
    });

    
  });
  