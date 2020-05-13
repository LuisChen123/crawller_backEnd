"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var decorator_1 = require("../decorator");
var utils_1 = require("../utils/utils");
var Login = /** @class */ (function () {
    function Login() {
    }
    Login_1 = Login;
    Login.isLogin = function (req) {
        return !!(req.session ? req.session.login : false);
    };
    Login.prototype.isLogin = function (req, res) {
        var isLogin = Login_1.isLogin(req);
        res.json(utils_1.getResponseData(isLogin));
    };
    Login.prototype.login = function (req, res) {
        var password = req.body.password;
        var isLogin = Login_1.isLogin(req);
        if (isLogin) {
            res.json(utils_1.getResponseData(true));
        }
        else {
            if (password === '123' && req.session) {
                req.session.login = true;
                res.json(utils_1.getResponseData(true));
            }
            else {
                res.json(utils_1.getResponseData(false, 'password is not correct'));
            }
        }
    };
    Login.prototype.logout = function (req, res) {
        if (req.session) {
            req.session.login = false;
        }
        res.json(utils_1.getResponseData(true));
    };
    var Login_1;
    __decorate([
        decorator_1.get('/isLogin'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], Login.prototype, "isLogin", null);
    __decorate([
        decorator_1.post('/login'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], Login.prototype, "login", null);
    __decorate([
        decorator_1.get('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], Login.prototype, "logout", null);
    Login = Login_1 = __decorate([
        decorator_1.controller('/api')
    ], Login);
    return Login;
}());
exports.Login = Login;
