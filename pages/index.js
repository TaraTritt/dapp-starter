import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";

import Layout from "../components/Layout";
import contract from "../ethereum/contract";

class CampaignIndex extends Component {
  // modify to make some function call to your deployed contract
  static async getInitialProps() {
    const campaigns = await contract.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const campaigns = this.props.campaigns.map(address => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true
      };
    });

    return <Card.Group items={campaigns} />;
  }

  render() {
    return (
      <Layout>
        <h3>Open Campaigns</h3>
        {this.renderCampaigns()}
      </Layout>
    );
  }
}

export default CampaignIndex;
