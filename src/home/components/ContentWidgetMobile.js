import React from "react";
import ContentCard from "./ContentCard";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import styles from "./ContentWidgetMobile.css";

export default class ContentWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goLeft: false,
      goRight: false,
      touchStart: null,
      touchEnd: null,
      data: this.props.allData
        ? [
            this.props.allData[this.props.allData.length - 1],
            this.props.allData[1],
            this.props.allData[0]
          ]
        : [],
      length: this.props.allData.length,
      position: 0
    };
    this.head = null;
  }

  handleReadMore(webURL) {
    if (webURL) {
      const urlSuffix = webURL.replace(TATA_CLIQ_ROOT, "$1").trim();
      const urlPath = new URL(webURL).pathname;
      if (urlPath.indexOf("/que") > -1) {
        window.open(urlSuffix, "_blank");
        window.focus();
      } else {
        this.props.history.push(urlSuffix);
      }
    }
    if (this.props.setClickedElementId) {
      this.props.setClickedElementId();
    }
  }

  forward = () => {
    this.goLeft();
  };

  back = () => {
    this.goRight();
  };

  handleSwipeStart(evt) {
    evt.stopPropagation();
    this.setState({ touchStart: evt.touches[0].clientX });
  }

  handleSwipeMove(evt) {
    evt.stopPropagation();
    this.setState({ touchEnd: evt.touches[0].clientX });
  }

  handleSwipeEnd() {
    if (this.state.touchEnd) {
      if (this.state.touchStart - this.state.touchEnd < -30) {
        this.back();
      } else if (this.state.touchStart - this.state.touchEnd > 30) {
        this.forward();
      }
    }
  }

  goLeft() {
    if (!this.state.goLeft || !this.state.goRight) {
      const position = this.state.position + 1;

      this.setState(
        {
          goLeft: true,
          position,
          touchStart: null,
          touchEnd: null
        },
        () => {
          let data = [];

          data[0] = this.head.next.next.value;
          data[1] = this.head.next.value;
          data[2] = this.head.prev.value;

          this.setState({ data });
        }
      );
    }
  }

  goRight() {
    if (!this.state.goLeft || !this.state.goRight) {
      let position = this.state.position - 1;
      if (position < 0) {
        position = this.props.allData.length + position;
      }

      this.setState(
        {
          goRight: true,
          position,
          touchStart: null,
          touchEnd: null
        },
        () => {
          let data = [];

          data[0] = this.head.prev.value;
          data[1] = this.head.prev.prev.value;
          data[2] = this.head.value;

          this.setState({ data });
        }
      );
    }
  }

  animationEnd(evt) {
    evt.stopPropagation();
    this.revert();
  }

  addToHead = value => {
    const newNode = { value };

    if (this.head) {
      newNode.next = this.head;
      newNode.prev = this.head.prev;
      this.head.prev.next = newNode;
      this.head.prev = newNode;
    } else {
      this.head = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    }
  };

  componentDidMount = () => {
    this.registerAnimationELement();
    this.props.allData.forEach(val => {
      this.addToHead(val);
    });
  };

  componentWillReceiveProps(props) {
    if (this.state.position < props.position) {
      this.setState({ position: props.position });
      this.goLeft();
    } else if (this.state.position > props.position) {
      this.setState({ position: props.position });
      this.goRight();
    }
  }

  registerAnimationELement = () => {
    const element = document.getElementById("animation-root");
    element.addEventListener("animationend", () => {
      this.revert();
    });
  };

  revert = () => {
    const currentData = this.state.data;
    let data = [];
    if (this.state.goLeft) {
      data[0] = this.head.prev.value;
      data[1] = this.head.next.next.value;
      data[2] = this.head.next.value;

      this.head = Object.assign({}, this.head.next);
    } else if (this.state.goRight) {
      data[0] = currentData[1];
      data[1] = currentData[2];
      data[2] = currentData[0];

      this.head = Object.assign({}, this.head.prev);
    }

    this.setState({ data, goLeft: false, goRight: false });
  };

  render() {
    let direction = styles.base;
    if (this.state.goLeft) {
      direction = styles.goingLeft;
    } else if (this.state.goRight) {
      direction = styles.goingRight;
    }
    return (
      <div
        className={direction}
        onTouchStart={evt => this.handleSwipeStart(evt)}
        onTouchMove={evt => this.handleSwipeMove(evt)}
        onTouchEnd={evt => this.handleSwipeEnd(evt)}
      >
        {this.state.data.map((val, i) => {
          let className = styles.card;
          if (this.state.goLeft) {
            switch (i) {
              case 0:
                className = styles.leftRight;
                break;
              case 1:
                className = styles.rightCenter;
                break;
              case 2:
                className = styles.centerLeft;
                break;
              default:
                break;
            }
          } else if (this.state.goRight) {
            switch (i) {
              case 0:
                className = styles.leftCenter;
                break;
              case 1:
                className = styles.rightLeft;
                break;
              case 2:
                className = styles.centerRight;
                break;
              default:
                break;
            }
          }

          return (
            <div className={className} id={i === 0 ? "animation-root" : ""} key={i}>
              <ContentCard
                image={val.imageURL}
                header={val.title}
                description={val.description}
                buttonText={val.btnText}
                onClick={() => this.handleReadMore(val.webURL)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
