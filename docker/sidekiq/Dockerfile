#
# -- Ruby 2.6.3 -> app sidekiq component --
#
FROM ruby:2.6.3
WORKDIR /app

#
# Copy sources
COPY . /app

#
# Copy helper scripts to the Docker image
COPY docker/sidekiq/docker-entrypoint.sh /app/
RUN chmod 755 /app/docker-entrypoint.sh

#
# Install Rails and Bundle
RUN gem install rails
RUN bundle install

#
# Run entrypoint script
ENTRYPOINT [ "/app/docker-entrypoint.sh" ]
