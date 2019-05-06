import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import "../styles/blogview.scss";

class BlogView extends Component {
    state = {
        blog: {}
    }
    componentDidMount(){
        let blogTitle = this.props.match.params.title
        let blog = this.props.blogs.find(
            blog => 
            blog.title.replace(/[|&;$%@"<>()+,.']/g, "").replace(/\s+/g, '-').toLowerCase() == blogTitle
        )
        this.setState({blog})
    }
    render() {
        const blog = this.state.blog
        return (
            this.state.blog && this.state.blog.author?
            <div className='blog-view container'>
                <h1 className='title'>{blog.title}</h1>
                <div className='blog-view-header' style={{backgroundImage: `url(${blog.img})`}}/>
                <div className='blog-view-author'>
                    <span>{blog.author.name}</span>
                    <div style={{backgroundImage: `url(${blog.author.portrait})`}}/>
                    <span>{blog.date}</span>
                </div>
                <div className='blog-view-content'>
                    {documentToReactComponents(blog.content)}
                </div>
             </div>  
          :<div/>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}
const mapStateToProps = state => ({
    blogs: state.site.blogs
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogView);