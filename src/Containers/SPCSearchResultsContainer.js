import React from "react";
import SPCSearchResultsHeader from "./SPCSearchResultsHeader";
import SPCSearchResultsBody from "./SPCSearchResultsBody";


class SPCSearchResultsContainer extends React.Component {
  render() {
    return <div>
      <SPCSearchResultsHeader />
      <SPCSearchResultsBody />
    </div>;
  }
}

export default SPCSearchResultsContainer;
