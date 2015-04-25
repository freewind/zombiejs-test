Feature: my test

  Scenario: ajax-button
    Given visit the /static/ajax-button.html
    When click on 'mybutton' button
    Then see the updated content of '#response'
