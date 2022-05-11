# Backend Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.1.0-b] - 2022-02-21

### Added

- Posts CRUD (can send with only one image)
  - Did this because of database overload with images
  - Need to see if have the Shell Privilege Attack on the upload thing but probably no
- Added user can now add a profile image
  - Need to see if have the Shell Privilege Attack on the upload thing but probably no

## [v0.0.9-b] - 2022-02-07

### Added

- Change email, password and DoB

### Changes

- Changed the database removed phone and address (cause its a thing with cryptos so yeah phone and address is a nono)

## [v0.0.8-b] - 2022-02-06

### Added

- Api SAFE with bearer token
- Rate limit added (if 60 request, blocked for 1 min)

## [v0.0.7-b] - 2022-01-31

### Added

- Finishing the API

## [v0.0.6-b] - 2021-12-30

### Added

- Improvement in the crud of Users and Roles
- Relationship fixed

## [v0.0.5-b] - 2021-11-25

### Added

- Trying to create users but need to fix some things

## [v0.0.4-b] - 2021-10-31

### Added

- Roles CRUD methods
- Changes to the users table (added "address" as STRING into the table )

## [v0.0.3-b] - 2021-10-16

### Added

- API to get roles and verify if a user id is valid

## [v0.0.2-b] - 2021-10-15

### Added

- Laravel Web Server
- MySQL migrations
- Models and Controllers

## [v0.0.1-b] - 2021-10-15

### Removed

- Node web server

## [v0.0.0-b] - 2021-10-10

<!-- This will be 0.0.0-g if general changelogs or 0.0.0-b if backend changelogs or 0.0.0-f if frontend changelogs -->

### Added

- Working web server with node.js/express
- Using .env file to make some environment variables

[v0.0.0-b]: https://github.com/andresousa23/as-crypto/releases/tag/v0.0.0-b
[v0.0.1-b]: https://github.com/andresousa23/as-crypto/compare/v0.0.0-b...v0.0.1-b
[v0.0.2-b]: https://github.com/andresousa23/as-crypto/compare/v0.0.1-b...v0.0.2-b
[v0.0.3-b]: https://github.com/andresousa23/as-crypto/compare/v0.0.2-b...v0.0.3-b
[v0.0.4-b]: https://github.com/andresousa23/as-crypto/compare/v0.0.3-b...v0.0.4-b
[v0.0.5-b]: https://github.com/andresousa23/as-crypto/compare/v0.0.4-b...v0.0.5-b
[v0.0.6-b]: https://github.com/andresousa23/as-crypto/compare/v0.0.5-b...v0.0.6-b
[v0.0.7-b]: https://github.com/andresousa23/as-crypto/compare/v0.0.6-b...v0.0.7-b
[v0.0.8-b]: https://github.com/andresousa23/as-crypto/compare/v0.0.7-b...v0.0.8-b
[v0.0.9-b]: https://github.com/andresousa23/as-crypto/compare/v0.0.8-b...v0.0.9-b
