describe('Create an account', () => {
  it('should fill in the sign-up form', () => {
    cy.visit('https://company-job-portal.netlify.app/sign-up')
    // Fill in the First Name input
    cy.get('input[placeholder="First name"]').type('John');

    // Fill in the Last Name input
    cy.get('input[placeholder="Last name"]').type('Doe');

    // Fill in the Email input
    cy.get('input[placeholder="Enter your email"]').type('john.doe@example.com');

    // Fill in the Password input
    cy.get('input[placeholder="Password"]').type('P@ssw0rd');

    // Click the Sign Up button
    cy.contains('button', 'Sign up').click();

    // You can add assertions here to check if the form submission was successful.
    // For example, check for a success message or a redirection to a new page.
  })
})

describe('Login to account and apply to a job', () => {
  it('should fill in the login form', () => {
    cy.visit('https://company-job-portal.netlify.app/login')
    // Fill in the Email input
    cy.get('input[placeholder="Enter your email"]').type('tonyqiu12345@gmail.com');

    // Fill in the Password input
    cy.get('input[placeholder="Enter your password"]').type('Tonyqiu1@');

    // Click the Sign Up button
    cy.contains('button', 'Login').click();

  })
})

describe('Login to account and apply to a job', () => {
  it('should fill in the login form', () => {
    cy.visit('https://company-job-portal.netlify.app/login')
    // Fill in the Email input
    cy.get('input[placeholder="Enter your email"]').type('tonyqiu12345@gmail.com');

    // Fill in the Password input
    cy.get('input[placeholder="Enter your password"]').type('Tonyqiu1@');

    // Click the Sign Up button
    cy.contains('button', 'Login').click();

    cy.wait(500);
    cy.get('.jobsBody-jobs').find('.job').first().click();

    // Click the apply button
    cy.wait(500);
    cy.contains('button', 'Apply').click();

  })
})

