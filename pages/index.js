import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import moment from "moment";

import Layout from "components/Layout";
import contract from "ethereum/contract";

class DAppIndex extends Component {
  // modify to make some function call to your deployed contract
  static async getInitialProps() {
    const auctionEndTime = await contract.methods.auctionEndTime().call();
    console.log(auctionEndTime);
    return { auctionEndTime };
  }

  renderAuctionInfo() {
    return (
      <Card
        header="Auction Info"
        description={
          "This auction ends at " +
          moment.unix(this.props.auctionEndTime).format("MM/DD/YYYY, h:mm:ss A")
        }
      />
    );
  }

  render() {
    return (
      <Layout>
        <h3>Auction</h3>
        {this.renderAuctionInfo()}
      </Layout>
    );
  }
}

export default DAppIndex;
