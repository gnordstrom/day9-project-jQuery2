$(document).ready(function() {


$('#newTaskForm').hide();                   // Allows newTaskForm to be hidden when the document loads

  // Variables
var listo = [];
var Task = function(task) {
  this.task = task;
  this.id = 'new';
};

                                                                                  ////// Functions
// Function for
var advanceTask = function(task) {
  var modified = task.innerText.trim();
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};

// Function to change the status of an item from 'new' to 'inProgress'.
$(document).on('click', '#item', function(e) {
	e.preventDefault();
  var task = this;
  advanceTask(task);
  this.id = 'inProgress';
});


// Function to move the actual list item.
// We do that by pulling all of the html around the item itself.
$(document).on('click', '#item', function(e) {
	e.preventDefault();
  var task = this;
  advanceTask(task);
  this.id = 'inProgress';
  $('#currentList').append(this.outerHTML);
});

// Function to move the items from 'inProgress' to 'archived'
$(document).on('click', '#inProgress', function(e) {
  e.preventDefault();
  var task = this;
  task.id = "archived";
  var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
  advanceTask(task);
  $('#archivedList').append(changeIcon);
});

// Function to create a way to delete the items on the list
  // All we have to do is pass a task into the advanceTask function without a new id.
  // You can study the advanceTask function we built to understand how it works.
$(document).on('click', '#archived', function(e){
  e.preventDefault();
  var task = this;
  advanceTask(task);
});



///////////////////////////////                               EventListeners

var addTask = function(task) {                          // Task constructor with several functions
  if(task) {
    task = new Task(task);
    listo.push(task);

    $('#newItemInput').val('');
		  $('#newList').append(
                        '<a href="#finish" class="" id="item">' +
                        '<li class="list-group-item">' +
                        '<h3>' + task.task + '</h3>'+
                        '<span class="arrow pull-right">' +
                        '<i class="glyphicon glyphicon-arrow-right">' +
                        '</span>' +
                        '</li>' +
                        '</a>'
                    );
  }
  $('#newTaskForm').slideToggle('fast', 'linear');
  };

  // Call a jQuery event that calls the addTask function when we click the saveNewItem button.
  $('#saveNewItem').on('click', function (e) { // Call the "addTask" function
      e.preventDefault();
      var task = $('#newItemInput').val().trim();
      addTask(task);
  });

  // Opens the form to create new task:
  $('#add-todo').on('click', function() {
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

  // Closes the form to create new task:
  $('#cancel').on('click', function(){
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });

});
