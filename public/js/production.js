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
      // Determine the status of the order using switch cases
      // Order Received // Order Processing // Order on the Way // Order Complete // Out of Stock// Order Canceled
      switch (order.Status) {
        case ('Order Received'):
          var $statusBar= `<div class="progress-bar" style="width:25%;">${order.Status}</div>`;
          break;
        case ('Order Processing'):
          var $statusBar= `
            <div class="progress-bar " style="width:25%;">Order Received</div>
            <div class="progress-bar bg-success" style="width:25%;">${order.Status}</div>
          `;
          break;
        case ('Order on the Way'):
            var $statusBar= `
              <div class="progress-bar" style="width:25%;">Order Received</div>
              <div class="progress-bar bg-success" style="width:25%;">Order Processing</div>
              <div class="progress-bar bg-warning" style="width:25%;">${order.Status}</div>
            `;
          break;
        case ('Order Complete'):
            var $statusBar= `
              <div class="progress-bar" style="width:25%;">Order Received</div>
              <div class="progress-bar bg-success" style="width:25%;">Order Processing</div>
              <div class="progress-bar bg-warning" style="width:25%;">Order on the Way</div>
              <div class="progress-bar progress-bar-info" style="width:25%;">${order.Status}</div>
            `;
          break;
        case ('Out of Stock'):
            var $statusBar= `<div class="progress-bar bg-danger" style="width:100%;">${order.Status}</div>`;
          break;
        case ('Order Canceled'):
            var $statusBar= `<div class="progress-bar bg-danger" style="width:100%;">${order.Status}</div>`;
          break;
      };

      // displaying orders
      var $p = `
      <div class="row">
        <p class="col-4">Item: ${order.Menu_Name}</p>
        <p class="col-4">Price: ${order.Cost}</p>
        <p class="col-4">Quantity: ${order.Quantity}</p>
      </div>
      <p>Status</p>
      <div class="progress">${$statusBar}</div>
      `;
      
        var $statusDropDown = 
        `<select name="order-status">
            <option value="Order Received">Order Received</option>
            <option value="Order Processing">Order Processing</option>
            <option value="Order on the Way">Order on the Way</option>
            <option value="Order Complete">Order Complete</option>
            <option value="Order Canceled">Order Canceled</option>
            <option value="Out of Stock">Out of Stock</option>
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
    console.log("order status",order)

  API.updateOrders(order).then(function() {
    refreshOrders();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$itemList.on("click", ".status-change", handleStatusBtnClick);


// refresh order status

refreshOrders();