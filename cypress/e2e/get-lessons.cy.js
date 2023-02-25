
import creds from '../creds.json';
describe('CTCMath spec', () => {
  it(`Lesson download`, () => {
    const lessonNumbers = [
      // todo - plug in numbers here
      '4193',
      '4237',
      '4238',
      '4239',
    ];
    const section = 'Part 4';
    const {
      username,
      password,
    } = creds.teacher;
    cy.visit('https://www.mathsonline.com.au/login?countryId=8')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('input[type=submit]').click()

    // get PDF files
    cy.visit('https://www.mathsonline.com.au/teachers/tools')

    cy.get('#courses_filter').select('Algebra I')

    cy.get('#streams_filter').select(section)

    lessonNumbers.map((lNum) => {
      cy.get('#select-lessons-grid > div.k-grid-content > table > tbody > tr > td > span').contains(lNum).click();

      cy.window().document().then(function (doc) {
        doc.addEventListener('click', () => {
          setTimeout(function () { doc.location.reload() }, 5000)
        });
        cy.get('#summary-container > a').click();
        cy.get('#solutions-container > a').click();
        cy.get('#worksheet-container > a').click();
      })
    })

    // cy.pause()
    // logout
    cy.get('#bs-main-nav > ul > li:nth-child(2) > a').click()
    // cy.pause()
  })
})