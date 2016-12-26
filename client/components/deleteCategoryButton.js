import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import { addButton } from '../style/Buttons';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';
import { deleteItem } from '../actions/deleteItem';

class DeleteItemButtom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }
  componentDidMount () {
    const { item } = this.props;
    this.setState(item);
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(deleteItem(this.state));
    this.setState({ open: false });
  }

  handleChangeText(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleChangeSelect(event, index, value) {
    this.setState({ category: value });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', alignItems: 'flex-end'}}>
        <IconButton
          key={id}
          style={{position: 'relative', top: '1vh', right: '1vh'}}
          tooltip="удалить"
          onClick={() => handleDelete(category)}
        >
          <Clear />
        </IconButton>
        <FlatButton
          key={index}
          label={category.name}
          onClick={() => handleCategorySelect(category.name)}
        />
        <Dialog
          modal={true}
          open={this.state.open}
          contentStyle={{width: '30%'}}
        >
        <IconButton
          style={{ position: 'absolute', top: '1vh', right: '1vh' }}
          tooltip="Закрыть"
          onClick={this.handleRequestClose}
        >
          <Clear />
        </IconButton>
          <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', paddingTop: '25px'}}>
            <form onSubmit={this.handleSubmit}>
              <div style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'center'}}>
                <span> {`Точно удалить товар id ${this.state["_id"]} ?`}</span>
                <div style={{padding: '20px 20px 0 20px', width: '60%', display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around'}}>
                  <RaisedButton onClick={this.handleSubmit} type="submit" label="Да" primary={true} />
                  <RaisedButton onClick={this.handleRequestClose} label="Нет" primary={true} />
                </div>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    categories: state.categories.all || [],
    items: state.items.all || [],
  };
};

export default connect(MapStateToProps)(DeleteItemButtom);
