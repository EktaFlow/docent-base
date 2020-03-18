describe('registration page accessible', function(){
	it('clicking register shows registration screen', function(){
		cy.visit('localhost:8100')
        cy.get('h6[id="register-link"]').click()
        cy.get('div[id="public-main"]').find('Register')
	})
})