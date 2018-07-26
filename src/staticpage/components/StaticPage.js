import React, { Component } from "react";
import SecondaryLoader from "../../general/components/SecondaryLoader.js";
import Feed from "../../home/components/Feed";
import styles from "./StaticPage.css";
import Icon from "../../xelpmoc-core/Icon";
import Image from "../../xelpmoc-core/Image";
import customerCareIcon from "../../account/components/img/callred.svg";
import contactUsIcon from "../../account/components/img/contactred.svg";
import callUsIcon from "../../account/components/img/contactblack.svg";
import aboutUsIcon from "../../account/components/img/aboutusred.svg";
import arrowLeft from "../../cart/components/img/down-arrow.svg";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import {
  SECONDARY_FEED_TYPE,
  NOT_FOUND,
  SUCCESS,
  ERROR,
  ABOUT_US_URL,
  CONTACT_URL
} from "../../lib/constants";
import { Redirect } from "react-router-dom";
import find from "lodash.find";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
export default class StaticPage extends Component {
  constructor(props) {
    super();
    this.componentIsMounted = false;
  }
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.getStaticPage(slug);
    this.componentIsMounted = true;
  }
  onClick = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };
  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.getStaticPage(slug);
    }
  }
  onRedirect = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };
  navigateTo404() {
    return <Redirect to={NOT_FOUND} />;
  }
  render() {
    const data = this.props;
    console.log(data);
    let listMenu = find(
      this.props && this.props.data.length > 0 && this.props.data,
      listMenuDetails => {
        return listMenuDetails.type === "Account Navigation Component";
      }
    );
    let listTitle = find(
      this.props && this.props.data.length > 0 && this.props.data,
      listMenuDetails => {
        return listMenuDetails.type === "Landing Page Title Component";
      }
    );
    let aboutUsImage = find(
      this.props && this.props.data.length > 0 && this.props.data,
      listMenuDetails => {
        return listMenuDetails.type === "Simple Banner Component";
      }
    );
    let aboutUsText = find(
      this.props && this.props.data.length > 0 && this.props.data,
      aboutUsText => {
        return aboutUsText.type === "CMS Paragraph Component";
      }
    );
    console.log(aboutUsText);
    let question = this.props.data && this.props.data[3];
    let linkCall = this.props.data && this.props.data[0];
    let linkChat = this.props.data && this.props.data[1];
    if (this.props.loading || !this.props.data) {
      return <SecondaryLoader />;
    }

    if (
      this.props.feedType === SECONDARY_FEED_TYPE &&
      this.props.data &&
      this.props.data.length === 0 &&
      this.props.status === SUCCESS &&
      this.componentIsMounted
    ) {
      return this.navigateTo404();
    }

    return (
      <div className={styles.base}>
        <MobileOnly>
          <Feed
            feedType={this.props.feedType}
            homeFeedData={this.props.data}
            setHeaderText={this.props.setHeaderText}
          />
        </MobileOnly>
        <DesktopOnly>
          {this.props.location.pathname !== "/aboutus" && (
            <div
              className={styles.pageHolder}
              style={{
                maxWidth:
                  this.props.location.pathname === "/contact" ? "" : "1200px",
                margin:
                  this.props.location.pathname === "/contact" ? "" : "auto",
                paddingTop:
                  this.props.location.pathname === "/contact" ? "0px" : "60px"
              }}
            >
              {this.props.location.pathname !== "/contact" &&
                this.props.location.pathname !== "/aboutus" && (
                  <div className={styles.header}>
                    {" "}
                    {listTitle && listTitle.title}
                  </div>
                )}
              <div
                className={styles.dataHolder}
                style={{
                  paddingBottom:
                    this.props.location.pathname === "/contact" ? "0px" : "80px"
                }}
              >
                {this.props.location.pathname === "/contact" && (
                  <div className={styles.contactUsHolder}>
                    <div className={styles.questionArea}>
                      {question && (
                        <div className={styles.displayQuestion}>
                          <div
                            className={styles.question}
                            dangerouslySetInnerHTML={{
                              __html: question.content
                            }}
                          />
                        </div>
                      )}

                      <div className={styles.chatAndCallOption}>
                        {linkCall && (
                          <div className={styles.linkAndIconHolder}>
                            <div className={styles.linkIconHolder}>
                              <Icon image={callUsIcon} size={20} />
                            </div>
                            <div className={styles.arrowIconHolder}>
                              <Icon image={arrowLeft} size={15} />
                            </div>
                            <div
                              className={styles.chatAndCallLink}
                              dangerouslySetInnerHTML={{
                                __html: linkCall.content
                              }}
                            />
                          </div>
                        )}
                        {linkChat && (
                          <div className={styles.linkAndIconHolder}>
                            <div className={styles.linkIconHolder}>
                              <Icon image={callUsIcon} size={20} />
                            </div>
                            <div className={styles.arrowIconHolder}>
                              <Icon image={arrowLeft} size={15} />
                            </div>
                            <div
                              className={styles.chatAndCallLink}
                              dangerouslySetInnerHTML={{
                                __html: linkChat.content
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {listMenu &&
                  listMenu.nodeList &&
                  listMenu.nodeList.length > 0 && (
                    <div className={styles.listHolder}>
                      <div className={styles.linkNameHolder}>
                        <div className={styles.linkHeaderHolder}>
                          Faq Topics
                        </div>
                        {listMenu.nodeList.map((val, i) => {
                          return (
                            <div className={styles.linkHolder}>
                              <div
                                onClick={() => this.onRedirect(val.url)}
                                className={styles.link}
                              >
                                {val.linkName}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                {this.props.location.pathname !== "/faq" &&
                  this.props.location.pathname !== "/contact" &&
                  this.props.location.pathname !== "/aboutus" && (
                    <div className={styles.contentHolder}>
                      <React.Fragment>
                        <div className={styles.tabHeaderHolder}>
                          {listTitle && listTitle.title}
                        </div>
                        <div className={styles.dropdownHolder}>
                          <Feed
                            background="#fff"
                            feedType={this.props.feedType}
                            homeFeedData={this.props.data}
                            setHeaderText={this.props.setHeaderText}
                          />
                        </div>
                      </React.Fragment>
                    </div>
                  )}
              </div>
              <div
                className={styles.sectionHolder}
                style={{
                  maxWidth:
                    this.props.location.pathname === "/contact" ? "1200px" : "",
                  margin:
                    this.props.location.pathname === "/contact" ? "auto" : "",
                  borderTop:
                    this.props.location.pathname === "/contact"
                      ? "none"
                      : "1px solid #979797;"
                }}
              >
                <div
                  className={styles.sectionPart}
                  onClick={() => this.onClick(CONTACT_URL)}
                >
                  <div className={styles.iconHolder}>
                    <Icon image={contactUsIcon} size={30} />
                  </div>
                  <div className={styles.sectionLabel}>Contact us</div>
                </div>
                <div
                  className={styles.sectionPart}
                  onClick={() => this.onClick(ABOUT_US_URL)}
                >
                  <div className={styles.iconHolder}>
                    <Icon image={aboutUsIcon} size={30} />
                  </div>
                  <div className={styles.sectionLabel}>About us</div>
                </div>
                <div className={styles.sectionPart}>
                  <div className={styles.iconHolder}>
                    <Icon image={customerCareIcon} size={30} />
                  </div>
                  <div className={styles.sectionLabel}>Customer care</div>
                </div>
              </div>
            </div>
          )}
          {this.props.location.pathname === "/aboutus" && (
            <div>
              {aboutUsImage &&
                aboutUsImage.media && (
                  <div className={styles.aboutUsImageHolder}>
                    <div className={styles.aboutUsTextWrap}>
                      <div className={styles.aboutUsTextHolder}>
                        {listTitle && listTitle.title}
                      </div>
                    </div>
                    <div className={styles.abouUsImageContainer}>
                      <Image image={aboutUsImage.media} fit="cover" />
                    </div>
                  </div>
                )}
              {aboutUsText &&
                aboutUsText.content && (
                  <div className={styles.aboutUsDataHolder}>
                    <div
                      className={styles.aboutUsTxtWrp}
                      dangerouslySetInnerHTML={{ __html: aboutUsText.content }}
                    />
                  </div>
                )}
              <div
                className={styles.sectionHolder}
                style={{
                  maxWidth: "1200px",
                  margin: "auto",
                  borderTop: "none"
                }}
              >
                <div
                  className={styles.sectionPart}
                  onClick={() => this.onClick(CONTACT_URL)}
                >
                  <div className={styles.iconHolder}>
                    <Icon image={contactUsIcon} size={30} />
                  </div>
                  <div className={styles.sectionLabel}>Contact us</div>
                </div>
                <div
                  className={styles.sectionPart}
                  onClick={() => this.onClick(ABOUT_US_URL)}
                >
                  <div className={styles.iconHolder}>
                    <Icon image={aboutUsIcon} size={30} />
                  </div>
                  <div className={styles.sectionLabel}>About us</div>
                </div>
                <div className={styles.sectionPart}>
                  <div className={styles.iconHolder}>
                    <Icon image={customerCareIcon} size={30} />
                  </div>
                  <div className={styles.sectionLabel}>Customer care</div>
                </div>
              </div>
            </div>
          )}
        </DesktopOnly>
      </div>
    );
  }
}
