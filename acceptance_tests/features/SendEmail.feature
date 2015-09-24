Feature: SendEmail
  The RTM form should send an e-mail on successful completion

  Scenario: Successful completion of the form leads to an e-mail being sent to an SMTP server
    When I submit the RTM form with valid data
    And I confirm the information is correct
    Then I should see e-mails in the mailtrap
