import React from 'react';
import styles from './dropdown.module.css';
import classNames from 'classnames';
export default class Option extends React.Component {
  handleOnClick = () => {
    this.props.onSelectItem(this.props.optionObj.id);
    this.props.onToggle();
    this.props.onChangeClassNames(this.props.optionObj.id);
  };

  render() {
    const buttonClass = classNames([
      styles.dropdownInputValue,
      this.props.isClickedState ? styles.dropdownSelectedValue : '',
    ]);

    return (
      <div className={buttonClass} onClick={this.handleOnClick}>
        {this.props.optionObj.label}
      </div>
    );
  }
}
