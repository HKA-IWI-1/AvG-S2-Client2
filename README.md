[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)
[![version-1.0.0](https://img.shields.io/badge/version-0.0.1%E2%80%94alpha-blue)](https://github.com/HKA-IWI-1/AvG-S2-Client)

# Client
Git Repository for the Apache ActiveMQ Artemis clients.

# Configure the project

## Apache ActiveMQ Artemis

In the Repository https://github.com/HKA-IWI-1/AvG-S2-Producer one can find the necessary docker-compose file.

Create the folder `docker_tmp` under the _project root_ and inside of this newly created folder create the folder `artemis-instance`.

Password and username can be set in artemis.env (linked repository, default: user _artemis_ and password _p_).

The web management console can be opened at http://localhost:8161.

### You will need the following addresses:

- `stocks.updates` # multicast
- `stocks.newOrder.Stuttgart` # anycast
- `stocks.newOrder.Frankfurt` # anycast
- `stocks.c1.orderStatus.Stuttgart`"` # anycast
- `stocks.c1.orderStatus.Frankfurt` # anycast
- `stocks.c2.orderStatus.Stuttgart`"` # anycast
- `stocks.c2.orderStatus.Frankfurt` # anycast
