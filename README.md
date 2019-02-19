# check-it

API for a slack app to handle resources, leting users add/remove, check out/in resources in a team.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
Nodejs 10.x.x
MongoDB 4.x.x
```

### Installing

A step by step series of examples that tell you how to get a development env running

clone the repository:

```
git clone https://github.com/plk3000/checkit.git
```

Install the dependencies, from within the folder run:

```
npm install
```

Set the mongodb url (for Windows 8+):

```
setx MONGO_URL mongodb://localhost:27017/checkit
```

And run it:

```
npm run start
```
## Built With

* [NodeJS](https://nodejs.org/dist/latest-v10.x/docs/api/) - Asynchronous event driven JavaScript runtime
* [NPM](https://www.npmjs.com/) - Dependency Management
* [MongoDB](https://docs.mongodb.com/manual/) - NoSQL database

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/plk3000/checkit/tags).

## Authors

* **Juan Diego Solis** - *Initial work* - [plk3000](https://github.com/plk3000)

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.