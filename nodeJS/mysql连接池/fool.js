const mysql = require("mysql");
const express = require("express");
const http = require("http");
let querystring = require("querystring");
let url = require("url");
const fs = require("fs");
const path = require("path");

mysql.createPool()