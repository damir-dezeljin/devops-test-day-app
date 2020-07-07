# d.weather API
A weather report and weather control API.

## Stack
* PostgreSQL
* Redis
* Rails 6
* Sidekiq for background processing, uses sidekiq-scheduler for recurring fetching of weather reports.

## Install
* Create Dockerfile and build image.
* Create docker-compose file with container configuration.
* initialize the project (create database, run migrations and seed the database)
* Run the application (http://localhost:3000)
* Add Sidekiq container for bacground jobs

After setup, don't forget to run the seeds. (`rake db:seed`)

## External API
Uses the OpenWeatherMap API [https://openweathermap.org/api](https://openweathermap.org/api)

You will need to set the OPEN_WEATHER_API_KEY environment variable for it to work.

## Endpoints
Fetch reports:
GET /weather_reports?location=Ljubljana

    [
      {
        "id": 1,
        "day": "2020-06-15",
        "hour": 9,
        "location_id": 1,
        "temperature": 16.31,
        "description": "moderate rain",
        "modification_count": 0,
        "created_at": "2020-06-15T08:31:00.636Z",
        "updated_at": "2020-06-15T08:31:00.636Z"
      },
      {
        "id": 2,
        "day": "2020-06-15",
        "hour": 12,
        "location_id": 1,
        "temperature": 16.76,
        "description": "light rain",
        "modification_count": 0,
        "created_at": "2020-06-15T08:31:00.641Z",
        "updated_at": "2020-06-15T08:31:00.641Z"
      },
      ...
      ]

Modify weather:
PATCH /weather_reports/:id
**JSON Payload:**

    {
    "weather_report": {
      "temperature": -13.0,
      "description": "tornados"
    }
  }

**Response:**

    {
      "modification_count": 1,
      "id": 1,
      "temperature": -13.0,
      "description": "tornados",
      "location_id": 1,
      "day": "2020-06-15",
      "hour": 9,
      "created_at": "2020-06-15T08:31:00.636Z",
      "updated_at": "2020-06-15T08:35:56.792Z",
    }

  #### Hints
  * Run `bundle install` to setup application dependencies.
  * Find all rake commands with `rake --tasks` (rake commands will help you initialize the application)
  * Find api endpoints with `rake routes`
  * Find database configuraton in `config/database.yml`
  * Find redis host in sidekiq initializers file
  * Start rails application with `bash -c bundle exec rails server -p 3000 -b '0.0.0.0'`
  * Start sidekiq with `bash -c "bundle exec sidekiq -C config/sidekiq.yml`

## Dockerized app

### Build instructions

1. Run `docker-compose up`;
2. Open a browser and point it to [Sidekiq dashboard](http://localhost:3000/sidekiq).


### REST client

The REST client application is built using NodeJS. In order to use it, you'll need a recent version of `Node`.

1. First install dependent modules:

   ```bash
   npm install
   ```

2. Run the application:

   ```bash
   node rest-client.js
   ```
   &uparrow;&uparrow;&uparrow; <br>
   The header of the file sets the temperature limits.

### Kubernetes deployment yaml files

Check the `k8s/` directory and follow the increasing file numbers :) I used `d-labs` namespace on minicube installed as part of *Docker Desktop for Mac*.
