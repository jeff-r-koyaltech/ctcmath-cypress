import creds from '../creds.json';
describe('template spec', () => {
  creds.accounts.map(({
    username,
    password,
  }) => {
    it(`Grade check - ${username}`, () => {
      cy.visit('https://www.mathsonline.com.au/login?countryId=8')
      cy.get('#username').type(username)
      cy.get('#password').type(password)
      cy.get('input[type=submit]').click()


      // get percentage
      cy.get('div.lesson-list-certificate div.percent').then(($div) => {
        const text = $div.text();
        cy.log(`Percentage: ${text}`);
        expect(parseFloat(text)).greaterThan(0);
      })

      // get PDF report card
      cy.visit('https://www.mathsonline.com.au/students/reports')
      cy.window().document().then(function (doc) {
        doc.addEventListener('click', () => {
          setTimeout(function () { doc.location.reload() }, 5000)
        })
        cy.get('#printToPdf').click()
      })

      // logout
      cy.get('#bs-main-nav > ul > li:nth-child(2) > a').click()
      // cy.pause()
    })
  })
  it('teacher login', () => {
    const {
      username,
      password,
    } = creds.teacher;
    cy.visit('https://www.mathsonline.com.au/login?countryId=8')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('input[type=submit]').click()

    // students are alphabetical. rt click their "view profile" link, and hit copy -> selector
    // from chrome dev tools to get this text
    const student5 = '#students-list > div > div:nth-child(5) > div.media-body > div.pull-right > a';
    const student7 = '#students-list > div > div:nth-child(7) > div.media-body > div.pull-right > a';
    const student9 = '#students-list > div > div:nth-child(9) > div.media-body > div.pull-right > a';

    const processStudent = () => {
      cy.get('#course').select('All courses')
      cy.get('#studentPassGrade').then(($div) => {
        const text = $div.text();
        cy.log(`Percentage: ${text}`);
        expect(parseFloat(text)).greaterThan(0);
      })
      cy.window().document().then(function (doc) {
        doc.addEventListener('click', () => {
          setTimeout(function () { doc.location.reload() }, 5000)
        })
        cy.get('#printToPdf').click()
      })
      // back to home
      cy.get('body > div.container > div.breadcrumb-container > span.breadcrumb-home > a').click()
    }

    cy.get(student5).click()
    processStudent();
    cy.get(student7).click()
    processStudent();
    cy.get(student9).click()
    processStudent();
  })
})