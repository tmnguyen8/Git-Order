// Get references to page elements
var $orderItem = $("#order-item");
var $orderQuantity = $("#order-quantity");
var $submitBtn = $("#submit");
var $menuList = $("#menu-list");
var $submitOrderBtn = $("#submit-order");

// The API object contains methods for each kind of request we'll make
var API = {
  getMenu: function() {
    return $.ajax({
      url: "api/menu",
      type: "GET"
    });
  },
  getMenuById: function(id) {
    return $.ajax({
      url: "api/menu/"+id,
      type: "GET"
    });
  },
  deleteMenu: function(id) {
    return $.ajax({
      url: "api/menu/" + id,
      type: "DELETE"
    });
  },
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
var refreshMenu = function() {
  API.getMenu().then(function(data) {
    var $menu = data.map(function(menu) {
      console.log(menu);

      var $p = `<div class="row"><p class="col-3">Menu Item: ${menu.Name}</p>
      <p class="col-6">Ingredients: ${menu.Ingredients}</p>
      <p class="col-1">Cost: ${menu.Cost}</p></div>`;
      
      // list of menu items given the data-id from menu_id
      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          id: "order-item",
          "data-id": menu.id,
          "data-cost": menu.Cost,
          "data-name": menu.Name
        })
        .append($p);
      
      // Input box for the order quantity from menu
      var $input = `
        <input class="float-right col-2" type="number" id="order-quantity menu-id-${menu.id}" name="quantity" min="1" max="10" placeholder="Quantity">
      `;
      $li.append($input);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right order")
        .text("Order");

      $li.append($button);

      return $li;
    });


    $menuList.empty();
    $menuList.append($menu);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleOrderSubmit = function(event) {
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
var handleOrderBtnClick = function() {
  var idToOrder = $(this)
    .parent()
    .attr("data-id");

  var menuNameToOrder = $(this).parent().attr("data-name")

  var costItemToOrder = $(this).parent().attr("data-cost");

  var quantityToOrder = $(this).parent().find('input').val();
  
  var order = {
    Cost: costItemToOrder * quantityToOrder,
    Quantity: quantityToOrder,
    Status: "Order Received.",
    Menu_Id: idToOrder,
    Menu_Name: menuNameToOrder
  };

  if (!(order.Menu_Id && order.Quantity)) {
    alert("You must order a valid item and quantity!");
    return;
  };

  API.saveOrder(order).then(function() {
    console.log("saved order successfully")
  });
};


// Add event listeners to the submit order
$menuList.on("click", ".order", handleOrderBtnClick);

// loading menus
refreshMenu();
