describe('docent app is serving resources on localhost', function() {
	it('visits localhost', function(){
		cy.visit('localhost:8100')
	})
})