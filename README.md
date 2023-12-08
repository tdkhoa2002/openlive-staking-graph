# openlive-staking-graph

This repository contains the source code for a staking graph implemented using The Graph hosted service.

## Getting Started

Follow these instructions to set up and deploy the staking graph using The Graph hosted service.

### Prerequisites

- Node.js (https://nodejs.org/)
- Yarn (https://yarnpkg.com/)

### Join The Graph Hosted Service

1. Visit [The Graph hosted service](https://thegraph.com/hosted-service) and create an account.

### Login to The Graph with GitHub Account

2. Log in to The Graph platform using your GitHub account.

### Create Your Subgraph

3. Navigate to the "My Dashboard" tab on The Graph platform and create a new subgraph for your staking data.

### Copy and Paste Your Access Token

4. Obtain an access token from your subgraph on The Graph.

5. Open your terminal and paste the access token into your source code:

   ```bash
   graph auth --product hosted-service [Access token]
   ```
   
### Generate Build

  ```bash
  yarn codegen
  ```

### Build Subgraph

  ```bash
  yarn build --network [NETWORK]
  ```

### Deploy Subgraph

  ```bash
  yarn deploy --network [NETWORK]
  ```
