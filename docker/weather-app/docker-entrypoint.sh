#!/bin/bash

cd /app

#
# Create, seed and upgrade the DB
bundle exec rake db:migrate
bundle exec rake db:seed

#
# Run the real stuff
bundle exec rails server -p 3000 -b '0.0.0.0'
