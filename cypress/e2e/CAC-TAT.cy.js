//verificação de titulo da tela 
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach (() => {
    //cy.visit('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html') //1- atividade visitar o link que vai ser testado
    cy.visit('./src/index.html') // 1- atividade visitar o link do local da máquina
  })

  it('verifica o título da aplicação', () => {
     cy.title().should('be.equal','Central de Atendimento ao Cliente TAT') //2- 'be.equal' comparação de igualdade 
     //cy.title().should('not.equal','Central de Atendimento ao Cliente TAT') 2 - 'not.equal' comparação de diferença
  })
   // Exercicio 1
  it('preenche os campos obrigatórios e envia o formulário', () => {
    //it.only utilizo quando só quero executar aquele teste em especifico sem executar os outros
    // delay pode ser executado, quando quero que um teste de digitação seja feito bem rápido
    const longText = Cypress._.repeat('Davi e o princeuso da mamãe', 20)
    cy.get('#firstName').type('Jessica')
    cy.get('#lastName').type('Esteves')
    cy.get('#email').type('jessicaestevesmg@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
   })
    // Exercicio 2
   it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Jessica')
    cy.get('#lastName').type('Esteves')
    cy.get('#email').type('jessicaestevesmg@gmail,com')  
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
   })

   // Exercicio 3
   it('campo telefone continua vazio sendo informado um valosr não númerico', () => {
    cy.get('#phone')
      .type('abcdes')
      .should('have.value', '')
   })
    // Exercicio 4
   it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Jessica')
    cy.get('#lastName').type('Esteves')
    cy.get('#email').type('jessicaestevesmg@gmail.com')  
    cy.get('#phone-checkbox').check() //alterado o click para o check, o check e melhor para utilizar do que o click
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
   })
   // Exercicio 5 achei mais rapido e menos trabalhoso 
   it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Jessica').clear()
    cy.get('#lastName').type('Esteves').clear()
    cy.get('#email').type('jessicaestevesmg@gmail.com').clear()
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type('996451914').clear()
    //cy.get('#open-text-area').type('Teste')
    //cy.get('.button[type="submit"]').click()

    //cy.get('.error').should('be.visible')
   })
    //exercicio 5 versão dele 
   it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Jessica')
      .should('have.value', 'Jessica')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Esteves')
      .should('have.value', 'Esteves')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('jessicaestevesmg@gmail.com')
      .should('have.value', 'jessicaestevesmg@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('996451914')
      .should('have.value', '996451914')
      .clear()
      .should('have.value', '') 
   })
    
   //exercicio 6
   it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => { 
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
   }) 
    
   //exercicio 7
   it('envia o formuário com sucesso usando um comando customizado', () => { 
     //const data = {
     //  firstName: 'Jessica',
     //  lastName: 'Esteves', 
     //  email: 'jessicaestevesmg@gmail.com',
     //  text: 'Teste Jess'
     //}

    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
   }) 

   it('seleciona um produto (YouTube) por seu texto', () => {
    
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
   })

   it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
   })
   it('seleciona um produto (Blog) por seu índice', () => {
    
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
   })

   it('marca o tipo de atendimento "Feedback"', () => { 

    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
   })  

     //each pode ser usado como agrupamento, que pode interagir com elementos de array 

   it('marca cada tipo de atendimento', () => { 
    cy.get('input[type="radio"]')
      .each((typeOfService) => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
   
   }) 
    
   it('marca ambos checkboxes, depois desmarca o último', () => { 
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
   
   }) 

     //atividade de incluir arquivo
    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json')
        .should(input => {
          expect (input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'} )
        .should(input => {
          expect (input[0].files[0].name).to.equal('example.json')
        })
    })
         //alias
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('responseArquivo')
      cy.get('#file-upload')
        .selectFile('@responseArquivo', { action: 'drag-drop'} )
        .should(input => {
          expect (input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr','target')
        .click()    
      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })




    
})