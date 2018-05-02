# date-nite
Created for CS-554

## Team 404
- Khushali Dave
- Sayan Mukherjee
- John Saterfiel
- Sravanthi Kanchi

# Getting Started
You need to install docker for mac https://www.docker.com/docker-mac

# Starting App
The app is using containers now for development so you will need to use these commands to start/stop the servers.

Starting the apps
```
docker-compose up --force-recreate
```

Cleaning up after the apps (if needed)
```
docker-compose down
```

Running in daemon mode if you do not want it running in a command line all the time
```
docker-compose up -d --force-recreate
```

## Rebuilding a container image
Whenever you change the packages.json file you will need to rebuild your images locally and so will anybody else.  Make sure to alert the team if you need to do this so they'll know they need to not only pull the latest changes but also rebuild the container image.  Use the command below to rebuild the container image.  Get the container names from ./docker-compose.yml
```
docker-compose build <container-name>
```

## Mongo
Can connect to mongo with any client as long as you specifiy the home address instead of localhost (127.0.0.1) using the normal default mongo port.

You can load the locations data into your database via mongorestore command if you aren't using docker.  The file to use is in /backups/locs.gz
```
mongorestore --gzip -d datenite --archive=backups/locs.gz
```

## Redis
Can connect to redis via the redis-cli client.  All ports are the normal ones.


# Client
This is where the javascript, css and assets are stored for the code run in the user's browser.
Found in the folders:
- public
- src

This was required to keep create-react-app happy as it wasn't very happy being in a sub folder.

## Provider Integration Requirements
Guidelines on the integration requirements for each api/service we are using

### Uber
https://d1a3f4spazzrp4.cloudfront.net/uberex/Uber_API_Design_Guidelines_20160329.pdf

### Open Table
**Linking Requirements**

https://platform.opentable.com/documentation/#linking-guidelines
Has requirements that if you're on a mobile device you must present a link for that device's app if possible

**Branding Requirements**

https://platform.opentable.com/documentation/#brand-assets


### Google Maps
None

### Yelp
If we use this, we cannot cache the content from the calls (except the business ids) for longer than 24 hours.

# API
This is where the client will get all its data from
Found in /api

# Scheduler
This is a worker that will be used to work with scheduling trips with uber when the time is right as uber doesn't expose their scheduling feature through their api.
Found in /scheduler
