// Get references to page elements
var $orderItem = $("#order-item");
var $orderQuantity = $("#order-quantity");
var $submitBtn = $("#submit");
var $itemList = $("#item-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveOrder: function(order) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/orders",
      data: JSON.stringify(order)
    });
  },
  getOrders: function() {
    return $.ajax({
      url: "api/orders",
      type: "GET"
    });
  },
  deleteOrder: function(id) {
    return $.ajax({
      url: "api/orders/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshOrders = function() {
  API.getOrders().then(function(data) {
    var $orders = data.map(function(order) {
      var $p = `<p>Item: ${order.Item}</p><p>Price: ${order.Cost}</p><p>Quantity: ${order.Quantity}</p><p>Status: ${order.Status}</p>`
      
      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": order.id
        })
        .append($p);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $itemList.empty();
    $itemList.append($orders);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var order = {
    Item: $orderItem.val().trim(),
    Quantity: $orderQuantity.val().trim(),
    Status: "Order Received."
  };

  if (!(order.Item && order.Quantity)) {
    alert("You must enter an item and quantity!");
    return;
  }

  API.saveOrder(order).then(function() {
    refreshOrders();
  });

  $orderItem.val("");
  $orderQuantity.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteOrder(idToDelete).then(function() {
    refreshOrders();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$itemList.on("click", ".delete", handleDeleteBtnClick);
