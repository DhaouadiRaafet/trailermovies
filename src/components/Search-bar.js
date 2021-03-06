import React, { Component } from 'react'


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = { searchText: "", placeHolder: "Tapez votre film", intervalBeforeRequest: 1000, lockRequest: false }

    }

    render() {
        return (
            <div className="row">
                <div className="col-md-8 input-group" >
                    <input type="text" className="form-control input-lg" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder} />
                    <span className="input-group-btn">

                    </span>
                </div>

            </div>

        )
    }

    handleOnClick(event) {
        this.search()


    }
    handleChange(event) {
        if (!this.state.lockRequest) {
            this.setState({ lockRequest: true })
            setTimeout(function () { this.search() }.bind(this), this.state.intervalBeforeRequest)
        }
        this.setState({ searchText: event.target.value })

    }
    search() {
        this.props.callback(this.state.searchText)
        this.setState({ lockRequest: false })
    }


}

export default SearchBar