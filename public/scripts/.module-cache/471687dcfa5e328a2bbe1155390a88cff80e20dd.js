//React stuff goes here

//allow use of ShowdownJS
var converter = new Showdown.converter();

//test comment data for now without backend
var data = [
  {author: "Jon Jon", text: "Blah blah first comment"},
  {author: "Ryan Ryan", text: "2nd comment something something"}
];

//*****COMMENT BOX *****

// data={this.props.data} allows CommentList to have access to data
//this.prop are immutable but this.state is mutable which can be changed by calling this.setState()
var CommentBox = React.createClass({displayName: "CommentBox",
  //Set up polling
  loadCommentsFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment){
    console.log(comment);
    //submit to server and refresh comment list
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        console.log("submitting ", data);
        //don't need to be setting state twice, not needed
        //this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  //set up initial state of component
  getInitialState: function(){
    return ({data:[]});
  },
  //Method is called when React component rendered
  componentDidMount: function(){
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function(){
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.state.data}), 
        React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
      )
      );
  }
});


//**** COMMENLIST ****
//New Comment List using data
var CommentList = React.createClass({displayName: "CommentList",
  render: function(){
    //Add comment to comment list which passes author name
    //for each element object in data we get the author
    //we need a key to maintain identity and state of each child!
    var commentNodes = this.props.data.map(function(comment, index){
      //comment.comment is the child! which gets passed to comment and gets converted
      return (
        React.createElement(Comment, {author: comment.author, key: index}, 
          comment.comment
        )
      )
    });
    //commentNodes represents each individual object that gets returned
    return (
    React.createElement("div", {className: "commentList"}, 
      "This be a Comment List", 
      commentNodes
    )
    );
  }
});


//*****COMMENT FORM******
var CommentForm = React.createClass({displayName: "CommentForm",
  handleSubmit: function(e){
    e.preventDefault();
    console.log(this.refs);
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author){
      return;
    }
    this.props.onCommentSubmit({author: author, comment: text});
    //send request to server
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function(){
    return (
    React.createElement("div", {className: "commentForm"}, 
      "Comment Form would go here", 
      React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
        React.createElement("input", {type: "text", ref: "author", placeholder: "Author"}), 
        React.createElement("input", {type: "text", ref: "text", placeholder: "Make a comment"}), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    )
    );
  }
});

//*****COMMENT******
//Set up props for comment
//Depends on data being passed on from the parent
var Comment = React.createClass({displayName: "Comment",
  render: function(){
    //so we can have an XSS attack, FB says to do add this for Showdown to work
    //.children is the text
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    //this.props.author is being passed from CommentList
    return (
    React.createElement("div", {className: "comment"}, 
      React.createElement("h3", {className: "commentAuthor"}, 
        this.props.author
      ), 
      React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
    )
    )
  }
});


//calls render property to instantiate component and fires function to append CommentBox to id="content"
//call on data to be var data defined above
React.render(
  React.createElement(CommentBox, {data: data, url: "/api", pollInterval: 2000}),
  document.getElementById('content')
  )