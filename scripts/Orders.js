import { getOrders, getMetals, getSizes, getStyles } from "./database.js";

const buildOrderListItem = (order) => {
  const costString = buildFormattedTotalCostString(order);

  return `
    <li>
        Order #${order.id} was placed on ${new Date(order.timestamp).toLocaleDateString("en-US")} 
    </li> 
    <li>
        Order #${order.id} cost ${costString}
    </li> `;
};

const buildFormattedTotalCostString = (order) => {
  const metals = getMetals();
  const sizes = getSizes();
  const styles = getStyles();

  //   find the price of the chosen options
  const foundMetal = metals.find((metal) => {
    return metal.id === order.metalId;
  });
  const foundSize = sizes.find((size) => {
    return size.id === order.sizeId;
  });
  const foundStyle = styles.find((style) => {
    return style.id === order.styleId;
  });

  const totalCost = foundMetal.price + foundSize.price + foundStyle.price;

  return totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
};

export const Orders = () => {
  /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
  const orders = getOrders();

  let html = "<ul>";

  const listItems = orders.map(buildOrderListItem);

  html += listItems.join("");
  html += "</ul>";

  return html;
};
