describe('switch to Booking.com', () => {

    it('should open a new tab with the search execution and at the initial tab open Booking.com and perform a search', () => {
        // open the Ferryhopper website
        cy.visit('https://www.ferryhopper.com/');

        //stub opening new tab
        cy.window().then(win => {
            cy.stub(win, 'open').as('open');
        });
        cy.get('.CybotCookiebotDialogBodyButton').contains('Allow all').click();

        // perform a search for the trip Piraeus - Heraklion at 25/11/2023
        cy.get('[data-test="portInputText"]').eq(0).type('Piraeus').type('{enter}');
        cy.get('[data-test="portInputText"]').eq(1).click();
        cy.get('.location-selection-list__item').contains('Heraklion').click();
        cy.get('[data-test="searchDate0"]').click();
        cy.get('.dp__calendar_item').contains(25).click()
        cy.get('[data-test="toggleSwitch"]').eq(0).click();
        cy.get('[data-test="searchBtn"]').click();

        // check that the search is executed on a newly opened tab
        cy.get('@open').should('have.been.calledOnceWithExactly', 'https://www.ferryhopper.com/en/?itinerary=PIR%2CHER&dates=20231125&passengers=1&vehicles=0&pets=0', '_blank');

        // check that on the initial tab, a search on Booking.com is performed
        cy.origin('https://www.booking.com', () => {
            cy.url().should('include', 'www.booking.com/searchresults.en');
            //check that the results are for Heraklio on 25th of November for one adult
            cy.get('[data-testid="destination-container"] input').should('have.value', 'Heraklio Town');
            cy.get('[data-testid="date-display-field-start"]').should('contain.text', 'Saturday 25 November 2023');
            cy.get('[data-testid="occupancy-config"]').should('contain.text', '1 adult · 0 children · 1 room');
        });
    });

});
