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
var CommentBox = React.createClass({
  //set up initial state of component
  getInitialState: function(){
    return ({data:[]});
  },
  render: function(){
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
      );
  }
});

//*****Original Comment List
// var CommentList = React.createClass({
//   render: function(){
//     //Add comment to comment list which passes author name
//     return (
//     <div className="commentList">
//       This be a Comment List
//       <Comment author="Jon Jon">This is one comment</Comment>
//       <Comment author="Ryan Ryan">This is another comment</Comment>
//     </div>
//     );
//   }
// });


//**** COMMENLIST ****
//New Comment List using data
var CommentList = React.createClass({
  render: function(){
    //Add comment to comment list which passes author name
    //for each element object in data we get the author
    //we need a key to maintain identity and state of each child!
    var commentNodes = this.props.data.map(function(comment, index){
      return (
        <Comment author={comment.author} key={index}>
          {comment.text}
        </Comment>
      )
    });
    //commentNodes represents each individual object that gets returned
    return (
    <div className="commentList">
      This be a Comment List
      {commentNodes}
    </div>
    );
  }
});


//*****COMMENT FORM******
var CommentForm = React.createClass({
  render: function(){
    return (
    <div className="commentForm">
      Comment Form would go here
    </div>
    );
  }
});

//*****COMMENT******
//Set up props for comment
//Depends on data being passed on from the parent
var Comment = React.createClass({
  render: function(){
    //so we can have an XSS attack, FB says to do add this for Showdown to work
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
    <div className="comment">
      <h2 className="commentAuthor">
        {this.props.author} (This is being passed from the CommentList)
      </h2>
      <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
    </div>
    )
  }
});


//calls render property to instantiate component and fires function to append CommentBox to id="content"
//call on data to be var data defined above
React.render(
  <CommentBox data={data}/>,
  document.getElementById('content')
  )