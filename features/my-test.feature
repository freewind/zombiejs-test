Feature: my test

Scenario: ajax-button static check
  Given visit the /static/ajax-button.html
  When do nothing
  Then see the updated content of '#test'

Scenario: ajax-button static check
  Given visit the /static/ajax-button.html
  When click on 'mybutton' button
  Then see the updated content of '#response'
