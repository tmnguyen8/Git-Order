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
    }).then(function() {
        window.location.href = "/";
    });
  },
  updateOrders: function(order) {
    return $.ajax({
        method: "PUT",
        url: "/api/orders",
        data: order
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
    }).then(function() {
        window.location.href = "/";
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshOrders = function() {
  API.getOrders().then(function(data) {
    var $orders = data.map(function(order) {
        console.log(order)

        var $p = `<p>Item: ${order.Menu_Name}</p><p>Price: ${order.Cost}</p><p>Quantity: ${order.Quantity}</p><p>Status: ${order.Status}</p>`
      
        var $statusDropDown = 
        `<select name="order-status">
            <option value="Order Received">Order Received</option>
            <option value="Order Processing">Order Processing</option>
            <option value="Order on the Way">Order on the Way</option>
            <option value="Order Complete">Order Complete</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Ordered Canceled">Ordered Canceled</option>
        </select>`

        var $li = $("<li>")
            .attr({
            class: "list-group-item",
            "data-id": order.id
            })
            .append($p)
            .append($statusDropDown);
        
        var $StatusChangeBtn = $("<button>")
            .addClass("btn btn-danger float-right status-change")
            .text("Change Status");

        // var $button = $("<button>")
        //     .addClass("btn btn-danger float-right delete")
        //     .text("ｘ");
        
        $li.append($StatusChangeBtn);

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
var handleStatusBtnClick = function() {
    event.preventDefault();

    var idStatus = $(this)
        .parent()
        .attr("data-id");
    console.log('idStatus is', idStatus)

    var newStatus = $(this).parent().find('select').val();

    console.log("new status is:", newStatus)

    var order = {
        id: idStatus,
        Status: newStatus
    };

  API.updateOrders(order).then(function() {
    refreshOrders();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$itemList.on("click", ".status-change", handleStatusBtnClick);


// refresh order status

refreshOrders();