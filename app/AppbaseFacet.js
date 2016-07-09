class FacetItem extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    this.props.handleClick(this.props.value, this.props.count);
  }
  render() {
    var defaultStyle = {
      margin: "5px",
      padding: "3px"
    };
    var selectedStyle = {
      margin: "5px",
      padding: "3px",
      fontWeight: "bold"
    };
    return (
      <div onClick={this.handleClick.bind(this) } style={this.props.value === this.props.selectedItem ? selectedStyle : defaultStyle}>
        <a href="#">{this.props.value} : {this.props.count}</a>
      </div>
    );
  }
}