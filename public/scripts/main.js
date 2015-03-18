//React stuff goes here
//make a comment box

var CommentBox = React.createClass({
  render: function(){
    return (
      <div className="commentBox">
        Some Comment Box Here
      </div>
      );
  }
});

React.render(
  <CommentBox />,
  document.getElementById('content')
  )