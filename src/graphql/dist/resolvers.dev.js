"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = void 0;

var _apolloBoost = require("apollo-boost");

var _cart = require("./cart.utils");

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  {\n    itemCount @client\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  {\n    cartItems @client\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  {\n    cartHidden @client\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  extend type Item {\n    quantity: Int\n  }\n\n  extend type Mutation {\n    ToggleCartHidden: Boolean!\n    AddItemToCart(item: Item!): [Item]!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var typeDefs = (0, _apolloBoost.gql)(_templateObject());
exports.typeDefs = typeDefs;
var GET_CART_HIDDEN = (0, _apolloBoost.gql)(_templateObject2());
var GET_CART_ITEMS = (0, _apolloBoost.gql)(_templateObject3());
var GET_ITEM_COUNT = (0, _apolloBoost.gql)(_templateObject4());
var resolvers = {
  Mutation: {
    toggleCartHidden: function toggleCartHidden(_root, _args, _ref) {
      var cache = _ref.cache;

      var _cache$readQuery = cache.readQuery({
        query: GET_CART_HIDDEN
      }),
          cartHidden = _cache$readQuery.cartHidden;

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: {
          cartHidden: !cartHidden
        }
      });
      return !cartHidden;
    },
    addItemToCart: function addItemToCart(_root, _ref2, _ref3) {
      var item = _ref2.item;
      var cache = _ref3.cache;

      var _cache$readQuery2 = cache.readQuery({
        query: GET_CART_ITEMS
      }),
          cartItems = _cache$readQuery2.cartItems;

      var newCartItems = (0, _cart.addItemToCart)(cartItems, item);
      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: {
          itemCount: (0, _cart.getCartItemCount)(newCartItems)
        }
      });
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: newCartItems
        }
      });
    }
  }
};
exports.resolvers = resolvers;