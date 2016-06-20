var React = require('react');
var ReactDOM = require('react-dom');
var GoogleMap = require('google-map-react');
var greatPlaceStyle = require("./my_great_place_styles.jsx");

class MyGreatPlace extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
       <div style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}
module.exports = MyGreatPlace;
