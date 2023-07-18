import React, { Component } from 'react';
import LUXSubHeader from 'luna-rocket/LUXSubHeader';

const title = {
  title: `현재 접속중인 모드는 ${process.env.REACT_APP_DEPLOY_TYPE} 입니다.`,
  url: '#',
};

const menu = [
  {
    title: "기업정보관리",
    subTitle: [
      {
        title: "기업정보관리",
        path: "/bizinfomanage",
        isTitle: true,
        domType: 1
      },
    ]
  },
  {
    title: "depth1",
    subTitle: [
      {
        title: "depth1-1",
      },
      {
        title: "depth1-2",
      },
      {
        title: "depth1-3",
      },
    ],
    notificationCount: 121,
  },
  {
    title: "depth2",
    subTitle: [
      {
        title: "depth2-1"
      },
      {
        title: "depth2-2",
      },
      {
        title: "depth2-3",
      },
    ],
    notificationCount: 3,
  },
  {
    title: "depth3",
    subTitle: [
      {
        title: "dept3-1",
      },
      {
        title: "depth3-2",
      },
      {
        title: "depth3-3",
      },
    ],
  },
  {
    title: "depth4",
    subTitle: [
      {
        title: "depth4-1",
      },
      {
        title: "depth4-2",
      },
      {
        title: "depth4-3",
      },
    ],
  },
];

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isBlockButton: '',
    };
  }

  handleTouchTap = (event, value, object) => {
    console.log(value.title, object, "클릭");
    this.setState({
      isBlockButton: value.title,
      isBlockSubButton: value.subTitle && value.subTitle
    });
  }


  render() {
    return (
      <LUXSubHeader
        title={title}
        menu={menu}
        onTouchTap={this.handleTouchTap}
        isBlockButton={this.state.isBlockButton}
        isBlockSubButton={this.state.isBlockSubButton}
        theme='blue'
      />
    );
  }
}

Header.propTypes = {

};

export default Header;