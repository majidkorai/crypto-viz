import React from "react";
import PropTypes from "prop-types";
import { List } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import ListItemLink from "./ListItemLink";

function Menu({ items }) {
  return (
    <List>
      {items.map((item, index) => (
        <ListItemLink
          key={index}
          to={item.route}
          primary={item.text}
          icon={index % 2 === 0 ? <HomeIcon /> : <MailIcon />}
        />
      ))}
    </List>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Menu;
