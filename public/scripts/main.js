//React stuff goes here

//allow use of ShowdownJS
var converter = new Showdown.converter();

//make a comment box

var CommentBox = React.createClass({
  render: function(){
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
      );
  }
});

var CommentList = React.createClass({
  render: function(){
    //Add comment to comment list which passes author name
    return (
    <div className="commentList">
      This be a Comment List
      <Comment author="Jon Jon">This is one comment</Comment>
      <Comment author="Ryan Ryan">This is another comment</Comment>
    </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function(){
    return (
    <div className="commentForm">
      Comment Form would go here
    </div>
    );
  }
});

//Set up props for comment
//Depends on data being passed on from the parent
var Comment = React.createClass({
  render: function(){
    return (
    <div className="comment">
      <h2 className="commentAuthor">
        {this.props.author} (This is being passed from the CommentList)
      </h2>
      {converter.makeHtml(this.props.children.toString())}
    </div>
    )
  }
});


//calls render property to instantiate component and fires function to append CommentBox to id="content"
React.render(
  <CommentBox />,
  document.getElementById('content')
  )