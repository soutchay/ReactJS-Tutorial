//React stuff goes here

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
    return (
    <div className="commentList">
      This be a Comment List
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



//calls render property to instantiate component and fires function to append CommentBox to id="content"
React.render(
  <CommentBox />,
  document.getElementById('content')
  )