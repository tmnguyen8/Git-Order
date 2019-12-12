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

      // Input box to enter quantity to order
      var $input = `
        <input class="order-quantity" type="number" id="order-quantity menu-id-${menu.id}" name="quantity" min="1" max="10" placeholder="Quantity">
      `;

      // submit button to order
      var $button = `<button class="btn btn-danger order" id="order-item" data-id="${menu.id}" data-cost="${menu.Cost}" data-name="${menu.Name}">Order</button>`;
      

      var $p = `
      <div class="row menu-item">
        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
          <img src='${menu.URL}' class="menu-image">
        </div>
        <div class="col-xs-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
          <p class="menu-item">Menu Item: ${menu.Name}</p>
          <p class="menu-ingredients">Ingredients: ${menu.Ingredients}</p>
          <p class="menu-cost">Cost: ${menu.Cost}</p>
        </div>
        <div class='col-xs-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 order-form'>
          ${$input}
          <br />
          ${$button}
        </div>
      </div>`;
      
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
    Status: "Order Received"
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
  var idToOrder = $(this).attr("data-id");

  var menuNameToOrder = $(this).attr("data-name")

  var costItemToOrder = $(this).attr("data-cost");

  var quantityToOrder = $(this).parent().find('input').val();
  
  var order = {
    Cost: costItemToOrder * quantityToOrder,
    Quantity: quantityToOrder,
    Status: "Order Received",
    Menu_Id: idToOrder,
    Menu_Name: menuNameToOrder
  };
  console.log(order)

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
