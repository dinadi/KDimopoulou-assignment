describe('Booking Flow', () => {
    it('should store the personal and contact details of the passenger and the price is the same throughout the booking flow ', () => {
        // open the Ferryhopper website
        cy.visit('https://www.ferryhopper.com/');
        cy.get('.CybotCookiebotDialogBodyButton').contains('Allow all').click();

        // perform a search for the trip Piraeus - Heraklion at 25/11/2023
        cy.get('[data-test="portInputText"]').eq(0).type('Piraeus').type('{enter}');
        cy.get('[data-test="portInputText"]').eq(1).click();
        cy.get('.location-selection-list__item').contains('Heraklion').click();
        cy.get('[data-test="searchDate0"]').click();
        cy.get('.dp__calendar_item').contains(25).click()
        cy.get('[data-test="searchBtn"]').click();

        // select the first available itinerary
        cy.get('[data-test="itineraryAvailable"]').first().click();
        cy.get('[data-test="fhCta"]').contains('Continue').click();

        // 1 passenger should be selected
        cy.get('.travelers-control__number-wrapper').eq(0).should('contain', '1');

        // select standard seat as accommodation
        cy.get('[data-test="seatsDropdown"]').click();
        cy.get('[data-test="seatsDropdownOptionDesc"]').contains('standard seat').click();
        cy.get('[data-test="fhCta"]').contains('Verify').click();

        // continue to the booking step with passenger’s details
        cy.get('[data-test="seatingCartCta"]').click();

        // fill-up all the required fields and check the price
        cy.get('.fh-radio').eq(1).click();
        cy.get('[data-test="fhInput"]').eq(0).type('Konstantina');
        cy.get('[data-test="fhInput"]').eq(1).type('Dimopoulou');
        cy.get('#birthDate-passenger1').type('01/01/1990')
        cy.get('#nationality-passenger1').type('Gr');
        cy.get('.fh-dropdown-option-0').contains('Greece').click();
        cy.get('#passport-passenger1').type('AB1234');
        cy.get('#reservationEmail').type('konsdim@gmail.com');
        cy.get('.contact-details__phone-country-code').type('30');
        cy.get('[data-test="fhDropdownOption"]').contains('Greece').click();
        cy.get('#reservationPhone').type('12345678');

        //check the price at this step
        cy.get('.price').eq(1).should('have.text', ' € 40.00');

        // go to payment page
        cy.scrollTo('bottom');
        cy.get('.checkbox').contains('I have read and agree to the ').click();
        cy.get('[data-test="fhCta"]').contains('Book and pay').click();

        // check that the price displayed continues to be the same
        cy.get('.payment-widget__order-amount').should('have.text', '40.00 €');

        // click to return to the previous step
        cy.get('.payment-widget__back-button').click();

        // check that all the previously filled data are properly shown
        cy.get('.fh-radio__input').eq(1).should('be.checked')
        cy.get('#name-passenger1 input').should('have.value', 'KONSTANTINA');
        cy.get('#last-name-passenger1 input').should('have.value', 'DIMOPOULOU');
        cy.get('#birthDate-passenger1 input').should('have.value', '01/01/1990')
        cy.get('#nationality-passenger1').should('have.text', 'Greece');
        cy.get('#passport-passenger1 input').should('have.value', 'AB1234');
        cy.get('#reservationEmail input').should('have.value', 'konsdim@gmail.com');
        cy.get('.contact-details__phone-country-code').should('have.text', '+30');
        cy.get('#reservationPhone input').should('have.value', '12345678');
        cy.get('.price').eq(1).should('have.text', ' € 40.00');
    });

});
