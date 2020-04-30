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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
require("reflect-metadata");
var decorator_1 = require("../decorator");
var utils_1 = require("../utils/utils");
var crowller_1 = __importDefault(require("../utils/crowller"));
var analyzer_1 = __importDefault(require("../utils/analyzer"));
var checkLogin = function (req, res, next) {
    var isLogin = !!(req.session ? req.session.login : false);
    if (isLogin) {
        next();
    }
    else {
        res.json(utils_1.getResponseData(null, 'please login first'));
    }
};
var crowllerController = /** @class */ (function () {
    function crowllerController() {
    }
    crowllerController.isLogin = function (req) {
        return !!(req.session ? req.session.login : false);
    };
    crowllerController.prototype.getData = function (req, res) {
        var secret = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
        var analyzer = analyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.json(utils_1.getResponseData(true));
    };
    crowllerController.prototype.showData = function (req, res) {
        try {
            var postion = path_1.default.resolve(__dirname, '../../data/course.json');
            var result = fs_1.default.readFileSync(postion, 'utf-8');
            res.json(utils_1.getResponseData(res.json(JSON.parse(result))));
        }
        catch (error) {
            res.json(utils_1.getResponseData(false, 'no data is avaliable'));
        }
    };
    __decorate([
        decorator_1.get('/getData'),
        decorator_1.use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], crowllerController.prototype, "getData", null);
    __decorate([
        decorator_1.get('/showData'),
        decorator_1.use(checkLogin),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], crowllerController.prototype, "showData", null);
    crowllerController = __decorate([
        decorator_1.controller('/')
    ], crowllerController);
    return crowllerController;
}());
exports.crowllerController = crowllerController;
