import React from "react";
import StoryWidget from "./StoryWidget";
import StoryProduct from "./StoryProduct";
// import StoryWidgetContainer from "../containers/StoryWidgetContainer";
import styles from "./StoryModal.css";

export default class StoryModal extends React.Component {
  componentDidMount() {
    this.props.getItems(this.props.positionInFeed, this.props.itemIds);
  }
  componentWillUnmount() {
    this.props.clearItems(this.props.positionInFeed);
  }
  render() {
    const items = this.props.feedComponentData.items;

    return (
      <div className={styles.base}>
        <StoryWidget {...this.props}>
          {items &&
            items.map(val => {
              return <StoryProduct {...val} />;
            })}
        </StoryWidget>
      </div>
    );
  }
}
