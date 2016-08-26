$(document).ready(function() {
  //ALL CODE GOES IN HERE

var listo = [];  //array to hold all tasks - global variable
var Task = function(task) {  //Constructor function to add tasks
  this.task = task;          //to the array
  this.id ='new';
};

/////// GET SAVED TASKS FROM LOCAL STORAGE \\\\\\\\\\
$
('#new').html(localStorage.getItem('task'));
$('#inProgress').html(localStorage.getItem('task'));
$('#archived').html(localStorage.getItem('task'));

//

var advanceTask = function(task) {
  var modified = task.innerText.trim();
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'currentList') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};

////////////\\\\\\\\\\\\\
// ADD NEW TASK \\--------------------------

var addTask = function(task) {
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
  localStorage.setItem(listo, task.task);
};

$('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
});


//Opens form---------------

  $('#add-todo').on('click', function () {
      $('#newTaskForm').fadeToggle('fast', 'linear');
  });


//closes form---------------

  $('#cancel').on('click', function (e) {
      e.preventDefault();
      $('#newTaskForm').fadeToggle('fast', 'linear');
  });


//moves task from new to in progress---------------

  $(document).on('click', '#item', function(e) {
  	e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });


//moves task from in progress to archived---------------

  $(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });


//moves deletes archived item---------------

$(document).on('click', '#archived', function (e) {
  e.preventDefault();
  var task = this;
  advanceTask(task);
});






  //ALL CODE GOES IN HERE
});
