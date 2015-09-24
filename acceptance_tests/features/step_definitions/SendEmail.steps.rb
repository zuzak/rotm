When(/^I confirm the information is correct/) do
  click_button('Submit')
end

Then(/^I should see e-mails in the mailtrap$/) do
  seenEmail = false

  File.foreach(
    File.join(
      File.dirname(__FILE__), "..", "..", "mailtrap.log")) { |line|
    if ( line =~ /^\* Message begins$/)
      seenEmail = true
    end
  }

  expect(seenEmail).to eq true
end
