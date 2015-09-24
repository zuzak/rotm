require 'rubygems'
require 'capybara'
require 'capybara/dsl'
require 'rspec'
require 'capybara/poltergeist'
# require 'selenium-webdriver'

require 'yaml'

Capybara.run_server = false
Capybara.default_driver = :poltergeist
Capybara.default_selector = :css

module Helpers
  def without_resynchronize
    page.driver.options[:resynchronize] = false
    yield
    page.driver.options[:resynchronize] = true
  end
end

World(Capybara::DSL, Helpers)

def config
  config_file = "#{File.dirname(__FILE__)}/config_test.yml"
  if  ENV['CONFIG_FILE']
    config_file = "#{File.dirname(__FILE__)}/" + ENV['CONFIG_FILE']
  end
  puts "config_file: " + config_file
  YAML.load_file(config_file)
end

def rest
  sleep config['sleep_time']
end

RSpec.configure do |config|
  config.run_all_when_everything_filtered = true
  config.filter_run :focus

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = 'random'
end

# Adapted from https://gist.github.com/georg/175282
class Mailtrap
  def self.start
    @mailtrap_file = File.expand_path(File.join(File.dirname(__FILE__), '..', '..', 'mailtrap.log'))
    clear_mailtrap_file
    @mailtrap = IO.popen("mailtrap run --file=#{@mailtrap_file}")
  end

  def self.clear_mailtrap_file
    FileUtils.rm_f @mailtrap_file
  end

  def self.stop
    Process.kill('HUP', @mailtrap.pid)
  end

  def self.content
    File.read(@mailtrap_file)
  end
end

Mailtrap.start

at_exit do
  Mailtrap.stop
end

After do |scenario|
  unless scenario.failed?
    Mailtrap.clear_mailtrap_file
  end
end
