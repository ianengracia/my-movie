const WebResponse = function (statusCode, arg2 = null, arg3 = null) {
  let defaultMessage = "Something went wrong.";

  let data = null;

  if (typeof arg2 === "string" && !arg3) {
    defaultMessage = arg2;
  } else if (typeof arg2 === "object" || typeof arg2 === "boolean") {
    defaultMessage = arg3;
    data = arg2;
  }

  this.status = statusCode;
  this.message = defaultMessage;
  this.data = data;
};

module.exports = WebResponse;
