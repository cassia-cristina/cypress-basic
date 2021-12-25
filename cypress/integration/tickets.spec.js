describe('Tickets', () => {
    beforeEach(() => {
        cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html')
    });

    it('fills all the texto input fields', () => {
        const firstName = 'Cassia'
        const lastName = 'Souza'

        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type('cassia@gmail.com')
        cy.get('#requests').type('My request')
        cy.get('#signature').type(`${firstName} ${lastName}`)
    });

    it('select two tickets', () => {
        cy.get('#ticket-quantity').select('2')
    });

    it('select "vip" ticket type', () => {
        cy.get('#vip').check()        
    });

    it('selects "social media" checkbox', () => {
        cy.get('#social-media').check()
    });

    it('selects "friend" and "publication" then uncheck "friend"', () => {
        cy.get('#friend').check()
        cy.get('#publication').check()
        cy.get('#friend').uncheck()
    });

    it('has "TICKETBOX" headers heading', () => {
        cy.get('header h1').should('contain','TICKETBOX')
    });

    it('alerts on invalid email', () => {
        cy.get('#email')
          .as('email')
          .type('invalido.com')

        cy.get('#email.invalid')
          .should('exist')

        cy.get('@email')
          .clear()
          .type('cassia@gmail.com')

        cy.get('#email.invalid')
          .should('not.exist')
    });

    it('fills and reset the form', () => {
        const firstName = 'Cassia'
        const lastName = 'Souza'
        const fullName = `${firstName} ${lastName}`

        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type('cassia@gmail.com')
        cy.get('#ticket-quantity').select('2')
        cy.get('#vip').check()
        cy.get('#friend').check()
        cy.get('#requests').type('I love wine')

        cy.get('.agreement p')
          .should('contain',
          `I, ${fullName}, wish to buy 2 VIP tickets.`)

        cy.get('[name=agreement]').click()
        cy.get('#signature').type(fullName)

        cy.get("button[type='submit']")
          .as('submitButton')
          .should('not.be.disabled')

        cy.get("button[type='reset']").click()

        cy.get('@submitButton').should('be.disabled')
        
    });

    it('fills mandatory fields using support command', () => {
      const customer = {
        firstName: "Cassia",
        lastName: "Souza",
        email: "cassia12@gmail.com"
      }

      cy.fillMandatoryFields(customer)

      cy.get("button[type='submit']")
        .as('submitButton')
        .should('not.be.disabled')

      cy.get('[name=agreement]').uncheck()

      cy.get('@submitButton').should('be.disabled')

    });

});