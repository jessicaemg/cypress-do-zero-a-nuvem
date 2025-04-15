//visualização da tela de policita de privacidade 
it('testa a página da política de privacidade de forma independente', () => {
      cy.visit('./src/privacy.html') //1- atividade visitar o link que vai ser testado 
      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
      cy.contains('p', 'Talking About Testing').should('be.visible')

    })