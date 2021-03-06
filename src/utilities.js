export const match = (value, collection) =>
  collection.some(target => value.toUpperCase() === target.toUpperCase());

export const matchStart = (value, collection) =>
  collection.some(target =>
    value.toUpperCase().startsWith(target.toUpperCase())
  );

export const wildcards = url => {
  const urlUnreservedPattern = "[A-Za-z0-9-._~]";
  const wildcardPattern = urlUnreservedPattern + "*";
  const parts = url.split("*");
  const escapeRegex = str => str.replace(/([.?*+^$(){}|[\-\]\\])/g, "\\$1");
  const escaped = parts.map(escapeRegex);
  return new RegExp("^" + escaped.join(wildcardPattern) + "$");
};

import { DEFAULT_ALLOWED_HEADERS, DEFAULT_ALLOWED_METHODS } from "./constants";

export class Method {
  constructor(verb) {
    this.verb = verb.toLowerCase();
    this.VERB = verb.toUpperCase();
  }
  get get() {
    return match("get", [this.verb, this.VERB]);
  }
  get head() {
    return match("head", [this.verb, this.VERB]);
  }
  get post() {
    return match("post", [this.verb, this.VERB]);
  }
  get put() {
    return match("put", [this.verb, this.VERB]);
  }
  get delete() {
    return match("delete", [this.verb, this.VERB]);
  }
  get connect() {
    return match("connect", [this.verb, this.VERB]);
  }
  get options() {
    return match("options", [this.verb, this.VERB]);
  }
  get trace() {
    return match("trace", [this.verb, this.VERB]);
  }
  get patch() {
    return match("patch", [this.verb, this.VERB]);
  }
  get GET() {
    return match("GET", [this.verb, this.VERB]);
  }
  get HEAD() {
    return match("HEAD", [this.verb, this.VERB]);
  }
  get POST() {
    return match("POST", [this.verb, this.VERB]);
  }
  get PUT() {
    return match("PUT", [this.verb, this.VERB]);
  }
  get DELETE() {
    return match("DELETE", [this.verb, this.VERB]);
  }
  get CONNECT() {
    return match("CONNECT", [this.verb, this.VERB]);
  }
  get OPTIONS() {
    return match("OPTIONS", [this.verb, this.VERB]);
  }
  get TRACE() {
    return match("TRACE", [this.verb, this.VERB]);
  }
  get PATCH() {
    return match("PATCH", [this.verb, this.VERB]);
  }
  is(val) {
    return this.verb === val.toLowerCase();
  }
  not(val) {
    return this.verb !== val.toLowerCase();
  }
  IS(val) {
    return this.VERB === val.toUpperCase();
  }
  NOT(val) {
    return this.VERB !== val.toUpperCase();
  }
}

export const parseOptions = (opts = {}) => {
  const validKeys = [
    "allowedOrigins",
    "allowedMethods",
    "allowedHeaders",
    "maxAge"
  ];
  for (let key in opts) {
    if (!validKeys.includes(key)) {
      delete opts[key];
    }
  }
  let options = Object.assign(
    {
      allowedOrigins: process.env.CORS_ALLOWED_ORIGINS || "*",
      allowedMethods:
        process.env.CORS_ALLOWED_METHODS || DEFAULT_ALLOWED_METHODS,
      allowedHeaders:
        process.env.CORS_ALLOWED_HEADERS || DEFAULT_ALLOWED_HEADERS,
      maxAge: process.env.CORS_MAX_AGE || "600"
    },
    opts
  );
  if (
    typeof options.allowedOrigins === "string" &&
    options.allowedOrigins !== "*"
  ) {
    options.allowedOrigins = options.allowedOrigins.split(",");
  }
  if (typeof options.allowedMethods === "string") {
    options.allowedMethods = options.allowedMethods.split(",");
  }
  if (typeof options.allowedHeaders === "string") {
    options.allowedHeaders = options.allowedHeaders.split(",");
  }
  return options;
};
