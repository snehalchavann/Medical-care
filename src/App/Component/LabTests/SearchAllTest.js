import SearchBar from "material-ui-search-bar";
import React from "react";
import AllTestData from './AllTestData';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class SearchAllTest extends React.Component {
    constructor() {
        super();
        this.state = {
          value: "",
          result: [],
        };
        // Binding method
        this.relatedJobs = this.relatedJobs.bind(this);
      }

    relatedJobs(value){
        console.log(">>>"+value);
        const results = AllTestData.allTest.filter(test =>
            test.item_name.toLowerCase().includes(value)
          );
        this.setState({
            result: results
        })
        console.log("size>>>>",this.state.result);
    }
    
  
    render() {
        console.log("size kitna hai>>>>",this.state.result);
        return (
            <div>
                <div className="search-style">
                <SearchBar
                    value={this.state.value}
                    onChange={(newValue) => this.setState({ value: newValue })} className="search-input"
                />
                <Button variant="contained" color="primary" onClick={() => this.relatedJobs(this.state.value)} className="search-button">
                    Search
                </Button>
                </div>
                <div className="jobMargin">
                    {this.state.result.map(currTest => (
                    <div key = { currTest.item_id} className="job-search">
                        <a href = {`/jobs/${currTest.item_id}`}>
                            <div>{currTest.item_name} holla</div>
                        </a>
                        <div className="contact job info">
                            <div>{currTest.starting_price}</div>
                            <div>{currTest.lab_availability}</div>
                        </div>
                        </div>
                    )) }
                    </div>
            </div>
            
        );
    }
}

export default SearchAllTest;