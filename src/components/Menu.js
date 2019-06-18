import React, {Component} from "react";
import {Link} from "react-router-dom";
import '../styles/menu.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateSiteLocation} from '../actions/siteActions'
import {ReactComponent as MAILICON} from '../assets/mail.svg';
import {ReactComponent as LOGO} from '../assets/logo.svg';
import DARK_LOGO from '../assets/logo_dark.png';
import LIGHT_LOGO from '../assets/logo_light.png';

const routes = [
  {
    path: "/",
    name: "Home"
  },
  {
    path: "/explore",
    name: "Explore"
  },
  {
    path: "/projects",
    name: "Projects"
  },
  {
    path: "/about",
    name: "About"
  },
  {
    path: "/team",
    name: "Team"
  },
  {
    path: "/blog",
    name: "Blog"
  },
];

class Menu extends Component {
  componentDidMount(){
    this.props.updateSiteLocation(window.location.pathname)
  }
  updateLoc = path => {
    this.props.updateSiteLocation(path)
  }
  render(){
        return(
          <div className={this.props.siteLoc === '/' ? "menu menu_home" : "menu menu_reg"}>
            <div className="logo">
                  {
                    this.props.siteLoc === '/' ?
                    <img src={LIGHT_LOGO}/>:
                    <img src={DARK_LOGO}/>
                  }
            </div>
            <div className="links">
                {
                  routes.map((r, key) => 
                    <Link 
                      replace
                      key={key} 
                      to={r.path}
                      onClick={() => this.updateLoc(r.path)}
                      className={this.props.siteLoc === r.path && this.props.siteLoc === '/' ? "active links_home" :
                                 this.props.siteLoc === '/' ? "links_home" :
                                 this.props.siteLoc === r.path ? "active links_reg":
                                 "links_reg"
                                }
                    >
                      {r.name}
                    </Link>
                  )
                }
            </div>
            <div className="icon">
                <a href='mailto: unarchived.org@gmail.com'>
                  <MAILICON
                    className={this.props.siteLoc === '/' ? "icon_home" : "icon_reg"}
                  />
                </a>
            </div>
          </div>
        )
    }
}

const mapStateToProps = state => ({
  siteLoc: state.site.siteLoc
})

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    updateSiteLocation
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
  