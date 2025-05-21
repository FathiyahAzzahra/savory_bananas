/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/stocks/route";
exports.ids = ["app/api/stocks/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                username: {\n                    label: \"Username\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                console.log(\"authorize() called with:\", credentials);\n                if (!credentials?.username || !credentials?.password) {\n                    console.log(\"Missing credentials\");\n                    throw new Error(\"Please provide username and password\");\n                }\n                await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n                console.log(\"Connected to DB\");\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n                    username: credentials.username\n                });\n                console.log(\"User from DB:\", user);\n                if (!user) {\n                    console.log(\"No user found\");\n                    throw new Error(\"Invalid username or password\");\n                }\n                const isPasswordValid = await user.comparePassword(credentials.password);\n                console.log(\"Password valid:\", isPasswordValid);\n                if (!isPasswordValid) {\n                    throw new Error(\"Invalid username or password\");\n                }\n                console.log(\"Login successful, returning user object\");\n                return {\n                    id: user._id.toString(),\n                    name: user.name,\n                    username: user.username,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.username = user.username;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.username = token.username;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUEwRDtBQUNPO0FBQzVCO0FBQ0w7QUFFekIsTUFBTUksY0FBK0I7SUFDMUNDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLFVBQVU7b0JBQUVDLE9BQU87b0JBQVlDLE1BQU07Z0JBQU87Z0JBQzVDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekJNLFFBQVFDLEdBQUcsQ0FBQyw0QkFBNEJQO2dCQUV4QyxJQUFJLENBQUNBLGFBQWFDLFlBQVksQ0FBQ0QsYUFBYUksVUFBVTtvQkFDcERFLFFBQVFDLEdBQUcsQ0FBQztvQkFDWixNQUFNLElBQUlDLE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1iLHdEQUFTQTtnQkFDZlcsUUFBUUMsR0FBRyxDQUFDO2dCQUVaLE1BQU1FLE9BQU8sTUFBTWIsb0RBQUlBLENBQUNjLE9BQU8sQ0FBQztvQkFBRVQsVUFBVUQsWUFBWUMsUUFBUTtnQkFBQztnQkFDakVLLFFBQVFDLEdBQUcsQ0FBQyxpQkFBaUJFO2dCQUU3QixJQUFJLENBQUNBLE1BQU07b0JBQ1RILFFBQVFDLEdBQUcsQ0FBQztvQkFDWixNQUFNLElBQUlDLE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1HLGtCQUFrQixNQUFNRixLQUFLRyxlQUFlLENBQUNaLFlBQVlJLFFBQVE7Z0JBQ3ZFRSxRQUFRQyxHQUFHLENBQUMsbUJBQW1CSTtnQkFFL0IsSUFBSSxDQUFDQSxpQkFBaUI7b0JBQ3BCLE1BQU0sSUFBSUgsTUFBTTtnQkFDbEI7Z0JBRUFGLFFBQVFDLEdBQUcsQ0FBQztnQkFDWixPQUFPO29CQUNMTSxJQUFJSixLQUFLSyxHQUFHLENBQUNDLFFBQVE7b0JBQ3JCaEIsTUFBTVUsS0FBS1YsSUFBSTtvQkFDZkUsVUFBVVEsS0FBS1IsUUFBUTtvQkFDdkJlLE1BQU1QLEtBQUtPLElBQUk7Z0JBQ2pCO1lBQ0Y7UUFFRjtLQUNEO0lBQ0RDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRVYsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JVLE1BQU1OLEVBQUUsR0FBR0osS0FBS0ksRUFBRTtnQkFDbEJNLE1BQU1sQixRQUFRLEdBQUdRLEtBQUtSLFFBQVE7Z0JBQzlCa0IsTUFBTUgsSUFBSSxHQUFHUCxLQUFLTyxJQUFJO1lBQ3hCO1lBQ0EsT0FBT0c7UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsT0FBTztnQkFDVEMsUUFBUVgsSUFBSSxDQUFDSSxFQUFFLEdBQUdNLE1BQU1OLEVBQUU7Z0JBQzFCTyxRQUFRWCxJQUFJLENBQUNSLFFBQVEsR0FBR2tCLE1BQU1sQixRQUFRO2dCQUN0Q21CLFFBQVFYLElBQUksQ0FBQ08sSUFBSSxHQUFHRyxNQUFNSCxJQUFJO1lBQ2hDO1lBQ0EsT0FBT0k7UUFDVDtJQUNGO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FGLFNBQVM7UUFDUEcsVUFBVTtRQUNWQyxRQUFRLEtBQUssS0FBSyxLQUFLO0lBQ3pCO0lBQ0FDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtBQUNyQyxFQUFDO0FBRUQsTUFBTUMsVUFBVXBDLGdEQUFRQSxDQUFDSTtBQUVpQiIsInNvdXJjZXMiOlsiRDpcXEt1bGlhaFxcU2VtZXN0ZXIgNFxcU29mdHdhcmUgRGV2ZWxvcG1lbnRcXHNhdm9yeS1iYW5hbmFzXzRcXGFwcFxcYXBpXFxhdXRoXFxbLi4ubmV4dGF1dGhdXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGgsIHsgdHlwZSBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCJcbmltcG9ydCBkYkNvbm5lY3QgZnJvbSBcIkAvbGliL21vbmdvZGJcIlxuaW1wb3J0IFVzZXIgZnJvbSBcIkAvbW9kZWxzL1VzZXJcIlxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICB1c2VybmFtZTogeyBsYWJlbDogXCJVc2VybmFtZVwiLCB0eXBlOiBcInRleHRcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhdXRob3JpemUoKSBjYWxsZWQgd2l0aDpcIiwgY3JlZGVudGlhbHMpXG5cbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8udXNlcm5hbWUgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWlzc2luZyBjcmVkZW50aWFsc1wiKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBwcm92aWRlIHVzZXJuYW1lIGFuZCBwYXNzd29yZFwiKVxuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZGJDb25uZWN0KClcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gREJcIilcblxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgdXNlcm5hbWU6IGNyZWRlbnRpYWxzLnVzZXJuYW1lIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBmcm9tIERCOlwiLCB1c2VyKVxuXG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gdXNlciBmb3VuZFwiKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmRcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IHVzZXIuY29tcGFyZVBhc3N3b3JkKGNyZWRlbnRpYWxzLnBhc3N3b3JkKVxuICAgICAgICBjb25zb2xlLmxvZyhcIlBhc3N3b3JkIHZhbGlkOlwiLCBpc1Bhc3N3b3JkVmFsaWQpXG5cbiAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkXCIpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2luIHN1Y2Nlc3NmdWwsIHJldHVybmluZyB1c2VyIG9iamVjdFwiKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLl9pZC50b1N0cmluZygpLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkXG4gICAgICAgIHRva2VuLnVzZXJuYW1lID0gdXNlci51c2VybmFtZVxuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlXG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5cbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nXG4gICAgICAgIHNlc3Npb24udXNlci51c2VybmFtZSA9IHRva2VuLnVzZXJuYW1lIGFzIHN0cmluZ1xuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGUgYXMgc3RyaW5nXG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH0sXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiBcIi9sb2dpblwiLFxuICB9LFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgZGF5c1xuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn1cblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKVxuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJkYkNvbm5lY3QiLCJVc2VyIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJ1c2VybmFtZSIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiY29uc29sZSIsImxvZyIsIkVycm9yIiwidXNlciIsImZpbmRPbmUiLCJpc1Bhc3N3b3JkVmFsaWQiLCJjb21wYXJlUGFzc3dvcmQiLCJpZCIsIl9pZCIsInRvU3RyaW5nIiwicm9sZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/stocks/route.ts":
/*!*********************************!*\
  !*** ./app/api/stocks/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_Stock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/Stock */ \"(rsc)/./models/Stock.ts\");\n/* harmony import */ var _auth_nextauth_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n\n// Get all stock items\nasync function GET() {\n    try {\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_4__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n        const stocks = await _models_Stock__WEBPACK_IMPORTED_MODULE_3__[\"default\"].find({}).sort({\n            name: 1\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(stocks);\n    } catch (error) {\n        console.error(\"Error fetching stocks:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Failed to fetch stocks\"\n        }, {\n            status: 500\n        });\n    }\n}\n// Create a new stock item\nasync function POST(req) {\n    try {\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_4__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        if (session.user.role !== \"admin\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Forbidden\"\n            }, {\n                status: 403\n            });\n        }\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n        const { name, quantity, unit, price } = await req.json();\n        // Validate input\n        if (!name || quantity === undefined || !unit || price === undefined) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Please provide all required fields\"\n            }, {\n                status: 400\n            });\n        }\n        // Create stock item\n        const stock = await _models_Stock__WEBPACK_IMPORTED_MODULE_3__[\"default\"].create({\n            name,\n            quantity,\n            unit,\n            price\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(stock, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Error creating stock:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Failed to create stock item\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N0b2Nrcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTREO0FBQ1g7QUFDWjtBQUNIO0FBQ3VCO0FBRXpELHNCQUFzQjtBQUNmLGVBQWVLO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxVQUFVLE1BQU1MLGdFQUFnQkEsQ0FBQ0csNkRBQVdBO1FBRWxELElBQUksQ0FBQ0UsU0FBUztZQUNaLE9BQU9OLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBZSxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDcEU7UUFFQSxNQUFNUCx3REFBU0E7UUFFZixNQUFNUSxTQUFTLE1BQU1QLHFEQUFLQSxDQUFDUSxJQUFJLENBQUMsQ0FBQyxHQUFHQyxJQUFJLENBQUM7WUFBRUMsTUFBTTtRQUFFO1FBRW5ELE9BQU9iLHFEQUFZQSxDQUFDTyxJQUFJLENBQUNHO0lBQzNCLEVBQUUsT0FBT0YsT0FBWTtRQUNuQk0sUUFBUU4sS0FBSyxDQUFDLDBCQUEwQkE7UUFDeEMsT0FBT1IscURBQVlBLENBQUNPLElBQUksQ0FBQztZQUFFQyxPQUFPQSxNQUFNTyxPQUFPLElBQUk7UUFBeUIsR0FBRztZQUFFTixRQUFRO1FBQUk7SUFDL0Y7QUFDRjtBQUVBLDBCQUEwQjtBQUNuQixlQUFlTyxLQUFLQyxHQUFnQjtJQUN6QyxJQUFJO1FBQ0YsTUFBTVgsVUFBVSxNQUFNTCxnRUFBZ0JBLENBQUNHLDZEQUFXQTtRQUVsRCxJQUFJLENBQUNFLFNBQVM7WUFDWixPQUFPTixxREFBWUEsQ0FBQ08sSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQWUsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3BFO1FBRUEsSUFBSUgsUUFBUVksSUFBSSxDQUFDQyxJQUFJLEtBQUssU0FBUztZQUNqQyxPQUFPbkIscURBQVlBLENBQUNPLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFZLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNqRTtRQUVBLE1BQU1QLHdEQUFTQTtRQUVmLE1BQU0sRUFBRVcsSUFBSSxFQUFFTyxRQUFRLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFLEdBQUcsTUFBTUwsSUFBSVYsSUFBSTtRQUV0RCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDTSxRQUFRTyxhQUFhRyxhQUFhLENBQUNGLFFBQVFDLFVBQVVDLFdBQVc7WUFDbkUsT0FBT3ZCLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBcUMsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQzFGO1FBRUEsb0JBQW9CO1FBQ3BCLE1BQU1lLFFBQVEsTUFBTXJCLHFEQUFLQSxDQUFDc0IsTUFBTSxDQUFDO1lBQy9CWjtZQUNBTztZQUNBQztZQUNBQztRQUNGO1FBRUEsT0FBT3RCLHFEQUFZQSxDQUFDTyxJQUFJLENBQUNpQixPQUFPO1lBQUVmLFFBQVE7UUFBSTtJQUNoRCxFQUFFLE9BQU9ELE9BQVk7UUFDbkJNLFFBQVFOLEtBQUssQ0FBQyx5QkFBeUJBO1FBQ3ZDLE9BQU9SLHFEQUFZQSxDQUFDTyxJQUFJLENBQUM7WUFBRUMsT0FBT0EsTUFBTU8sT0FBTyxJQUFJO1FBQThCLEdBQUc7WUFBRU4sUUFBUTtRQUFJO0lBQ3BHO0FBQ0YiLCJzb3VyY2VzIjpbIkQ6XFxLdWxpYWhcXFNlbWVzdGVyIDRcXFNvZnR3YXJlIERldmVsb3BtZW50XFxzYXZvcnktYmFuYW5hc180XFxhcHBcXGFwaVxcc3RvY2tzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0eXBlIE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvbmV4dFwiXG5pbXBvcnQgZGJDb25uZWN0IGZyb20gXCJAL2xpYi9tb25nb2RiXCJcbmltcG9ydCBTdG9jayBmcm9tIFwiQC9tb2RlbHMvU3RvY2tcIlxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiLi4vYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcblxuLy8gR2V0IGFsbCBzdG9jayBpdGVtc1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcblxuICAgIGlmICghc2Vzc2lvbikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiVW5hdXRob3JpemVkXCIgfSwgeyBzdGF0dXM6IDQwMSB9KVxuICAgIH1cblxuICAgIGF3YWl0IGRiQ29ubmVjdCgpXG5cbiAgICBjb25zdCBzdG9ja3MgPSBhd2FpdCBTdG9jay5maW5kKHt9KS5zb3J0KHsgbmFtZTogMSB9KVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHN0b2NrcylcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBzdG9ja3M6XCIsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIGZldGNoIHN0b2Nrc1wiIH0sIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuXG4vLyBDcmVhdGUgYSBuZXcgc3RvY2sgaXRlbVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuXG4gICAgaWYgKCFzZXNzaW9uKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJVbmF1dGhvcml6ZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pXG4gICAgfVxuXG4gICAgaWYgKHNlc3Npb24udXNlci5yb2xlICE9PSBcImFkbWluXCIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZvcmJpZGRlblwiIH0sIHsgc3RhdHVzOiA0MDMgfSlcbiAgICB9XG5cbiAgICBhd2FpdCBkYkNvbm5lY3QoKVxuXG4gICAgY29uc3QgeyBuYW1lLCBxdWFudGl0eSwgdW5pdCwgcHJpY2UgfSA9IGF3YWl0IHJlcS5qc29uKClcblxuICAgIC8vIFZhbGlkYXRlIGlucHV0XG4gICAgaWYgKCFuYW1lIHx8IHF1YW50aXR5ID09PSB1bmRlZmluZWQgfHwgIXVuaXQgfHwgcHJpY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiUGxlYXNlIHByb3ZpZGUgYWxsIHJlcXVpcmVkIGZpZWxkc1wiIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgc3RvY2sgaXRlbVxuICAgIGNvbnN0IHN0b2NrID0gYXdhaXQgU3RvY2suY3JlYXRlKHtcbiAgICAgIG5hbWUsXG4gICAgICBxdWFudGl0eSxcbiAgICAgIHVuaXQsXG4gICAgICBwcmljZSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHN0b2NrLCB7IHN0YXR1czogMjAxIH0pXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgY3JlYXRpbmcgc3RvY2s6XCIsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8IFwiRmFpbGVkIHRvIGNyZWF0ZSBzdG9jayBpdGVtXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImRiQ29ubmVjdCIsIlN0b2NrIiwiYXV0aE9wdGlvbnMiLCJHRVQiLCJzZXNzaW9uIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwic3RvY2tzIiwiZmluZCIsInNvcnQiLCJuYW1lIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJQT1NUIiwicmVxIiwidXNlciIsInJvbGUiLCJxdWFudGl0eSIsInVuaXQiLCJwcmljZSIsInVuZGVmaW5lZCIsInN0b2NrIiwiY3JlYXRlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/stocks/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable in .env.local\");\n}\nlet cached = global.mongooseGlobal;\nif (!cached) {\n    cached = global.mongooseGlobal = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        console.log(\"Connecting to MongoDB...\", MONGODB_URI);\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongooseInstance)=>{\n            console.log(\"Connected to MongoDB!\");\n            return mongooseInstance;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        console.error(\"Failed to connect to MongoDB:\", e);\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsY0FBY0MsUUFBUUMsR0FBRyxDQUFDRixXQUFXO0FBRTNDLElBQUksQ0FBQ0EsYUFBYTtJQUNoQixNQUFNLElBQUlHLE1BQU07QUFDbEI7QUFTQSxJQUFJQyxTQUFTQyxPQUFPQyxjQUFjO0FBRWxDLElBQUksQ0FBQ0YsUUFBUTtJQUNYQSxTQUFTQyxPQUFPQyxjQUFjLEdBQUc7UUFBRUMsTUFBTTtRQUFNQyxTQUFTO0lBQUs7QUFDL0Q7QUFFQSxlQUFlQztJQUNiLElBQUlMLE9BQU9HLElBQUksRUFBRTtRQUNmLE9BQU9ILE9BQU9HLElBQUk7SUFDcEI7SUFFQSxJQUFJLENBQUNILE9BQU9JLE9BQU8sRUFBRTtRQUNuQixNQUFNRSxPQUFPO1lBQ1hDLGdCQUFnQjtRQUNsQjtRQUVBQyxRQUFRQyxHQUFHLENBQUMsNEJBQTRCYjtRQUN4Q0ksT0FBT0ksT0FBTyxHQUFHVCx1REFBZ0IsQ0FBQ0MsYUFBYVUsTUFBTUssSUFBSSxDQUFDLENBQUNDO1lBQ3pESixRQUFRQyxHQUFHLENBQUM7WUFDWixPQUFPRztRQUNUO0lBQ0Y7SUFFQSxJQUFJO1FBQ0ZaLE9BQU9HLElBQUksR0FBRyxNQUFNSCxPQUFPSSxPQUFPO0lBQ3BDLEVBQUUsT0FBT1MsR0FBRztRQUNWYixPQUFPSSxPQUFPLEdBQUc7UUFDakJJLFFBQVFNLEtBQUssQ0FBQyxpQ0FBaUNEO1FBQy9DLE1BQU1BO0lBQ1I7SUFFQSxPQUFPYixPQUFPRyxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIkQ6XFxLdWxpYWhcXFNlbWVzdGVyIDRcXFNvZnR3YXJlIERldmVsb3BtZW50XFxzYXZvcnktYmFuYW5hc180XFxsaWJcXG1vbmdvZGIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuXG5pZiAoIU1PTkdPREJfVVJJKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlIGluIC5lbnYubG9jYWxcIik7XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdmFyIG1vbmdvb3NlR2xvYmFsOiB7XG4gICAgY29ubjogdHlwZW9mIG1vbmdvb3NlIHwgbnVsbDtcbiAgICBwcm9taXNlOiBQcm9taXNlPHR5cGVvZiBtb25nb29zZT4gfCBudWxsO1xuICB9O1xufVxuXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlR2xvYmFsO1xuXG5pZiAoIWNhY2hlZCkge1xuICBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2VHbG9iYWwgPSB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGJDb25uZWN0KCkge1xuICBpZiAoY2FjaGVkLmNvbm4pIHtcbiAgICByZXR1cm4gY2FjaGVkLmNvbm47XG4gIH1cblxuICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coXCJDb25uZWN0aW5nIHRvIE1vbmdvREIuLi5cIiwgTU9OR09EQl9VUkkpO1xuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwgb3B0cykudGhlbigobW9uZ29vc2VJbnN0YW5jZTogYW55KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBNb25nb0RCIVwiKTtcbiAgICAgIHJldHVybiBtb25nb29zZUluc3RhbmNlO1xuICAgIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjYWNoZWQuY29ubiA9IGF3YWl0IGNhY2hlZC5wcm9taXNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xuICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gY29ubmVjdCB0byBNb25nb0RCOlwiLCBlKTtcbiAgICB0aHJvdyBlO1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlZC5jb25uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkYkNvbm5lY3Q7XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsIm1vbmdvb3NlR2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJkYkNvbm5lY3QiLCJvcHRzIiwiYnVmZmVyQ29tbWFuZHMiLCJjb25zb2xlIiwibG9nIiwiY29ubmVjdCIsInRoZW4iLCJtb25nb29zZUluc3RhbmNlIiwiZSIsImVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./models/Stock.ts":
/*!*************************!*\
  !*** ./models/Stock.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst StockSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    name: {\n        type: String,\n        required: [\n            true,\n            \"Please provide item name\"\n        ],\n        trim: true\n    },\n    quantity: {\n        type: Number,\n        required: true,\n        min: 0\n    },\n    unit: {\n        type: String,\n        required: true,\n        trim: true\n    },\n    price: {\n        type: Number,\n        required: true,\n        min: 0\n    }\n}, {\n    timestamps: true\n});\nconst Stock = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Stock || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Stock\", StockSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Stock);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvU3RvY2sudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThEO0FBVzlELE1BQU1DLGNBQWMsSUFBSUQsd0RBQWUsQ0FDckM7SUFDRUcsTUFBTTtRQUNKQyxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUEyQjtRQUM1Q0MsTUFBTTtJQUNSO0lBQ0FDLFVBQVU7UUFDUkosTUFBTUs7UUFDTkgsVUFBVTtRQUNWSSxLQUFLO0lBQ1A7SUFDQUMsTUFBTTtRQUNKUCxNQUFNQztRQUNOQyxVQUFVO1FBQ1ZDLE1BQU07SUFDUjtJQUNBSyxPQUFPO1FBQ0xSLE1BQU1LO1FBQ05ILFVBQVU7UUFDVkksS0FBSztJQUNQO0FBQ0YsR0FDQTtJQUFFRyxZQUFZO0FBQUs7QUFHckIsTUFBTUMsUUFBdUJkLHdEQUFlLENBQUNjLEtBQUssSUFBSWQscURBQWMsQ0FBUyxTQUFTQztBQUV0RixpRUFBZWEsS0FBS0EsRUFBQSIsInNvdXJjZXMiOlsiRDpcXEt1bGlhaFxcU2VtZXN0ZXIgNFxcU29mdHdhcmUgRGV2ZWxvcG1lbnRcXHNhdm9yeS1iYW5hbmFzXzRcXG1vZGVsc1xcU3RvY2sudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IHR5cGUgRG9jdW1lbnQsIHR5cGUgTW9kZWwgfSBmcm9tIFwibW9uZ29vc2VcIlxuXG5leHBvcnQgaW50ZXJmYWNlIElTdG9jayBleHRlbmRzIERvY3VtZW50IHtcbiAgbmFtZTogc3RyaW5nXG4gIHF1YW50aXR5OiBudW1iZXJcbiAgdW5pdDogc3RyaW5nXG4gIHByaWNlOiBudW1iZXJcbiAgY3JlYXRlZEF0OiBEYXRlXG4gIHVwZGF0ZWRBdDogRGF0ZVxufVxuXG5jb25zdCBTdG9ja1NjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoXG4gIHtcbiAgICBuYW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiUGxlYXNlIHByb3ZpZGUgaXRlbSBuYW1lXCJdLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICB9LFxuICAgIHF1YW50aXR5OiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1pbjogMCxcbiAgICB9LFxuICAgIHVuaXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICB9LFxuICAgIHByaWNlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIG1pbjogMCxcbiAgICB9LFxuICB9LFxuICB7IHRpbWVzdGFtcHM6IHRydWUgfSxcbilcblxuY29uc3QgU3RvY2s6IE1vZGVsPElTdG9jaz4gPSBtb25nb29zZS5tb2RlbHMuU3RvY2sgfHwgbW9uZ29vc2UubW9kZWw8SVN0b2NrPihcIlN0b2NrXCIsIFN0b2NrU2NoZW1hKVxuXG5leHBvcnQgZGVmYXVsdCBTdG9ja1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU3RvY2tTY2hlbWEiLCJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidHJpbSIsInF1YW50aXR5IiwiTnVtYmVyIiwibWluIiwidW5pdCIsInByaWNlIiwidGltZXN0YW1wcyIsIlN0b2NrIiwibW9kZWxzIiwibW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/Stock.ts\n");

/***/ }),

/***/ "(rsc)/./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    name: {\n        type: String,\n        required: [\n            true,\n            \"Please provide a name\"\n        ],\n        trim: true\n    },\n    username: {\n        type: String,\n        required: [\n            true,\n            \"Please provide a username\"\n        ],\n        unique: true,\n        trim: true\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            \"Please provide a password\"\n        ],\n        minlength: 6\n    },\n    role: {\n        type: String,\n        enum: [\n            \"admin\",\n            \"owner\"\n        ],\n        default: \"owner\"\n    }\n}, {\n    timestamps: true\n});\n// Hash password before saving\nUserSchema.pre(\"save\", async function(next) {\n    if (!this.isModified(\"password\")) return next();\n    try {\n        const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].genSalt(10);\n        this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hash(this.password, salt);\n        next();\n    } catch (error) {\n        next(error);\n    }\n});\n// Compare password method\nUserSchema.methods.comparePassword = async function(candidatePassword) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].compare(candidatePassword, this.password);\n};\n// Fix for \"Cannot overwrite model once compiled\" error\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQThEO0FBQ2pDO0FBVTdCLE1BQU1FLGFBQWEsSUFBSUYsd0RBQWUsQ0FDcEM7SUFDRUksTUFBTTtRQUNKQyxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUF3QjtRQUN6Q0MsTUFBTTtJQUNSO0lBQ0FDLFVBQVU7UUFDUkosTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBNEI7UUFDN0NHLFFBQVE7UUFDUkYsTUFBTTtJQUNSO0lBQ0FHLFVBQVU7UUFDUk4sTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBNEI7UUFDN0NLLFdBQVc7SUFDYjtJQUNBQyxNQUFNO1FBQ0pSLE1BQU1DO1FBQ05RLE1BQU07WUFBQztZQUFTO1NBQVE7UUFDeEJDLFNBQVM7SUFDWDtBQUNGLEdBQ0E7SUFBRUMsWUFBWTtBQUFLO0FBR3JCLDhCQUE4QjtBQUM5QmQsV0FBV2UsR0FBRyxDQUFDLFFBQVEsZUFBZ0JDLElBQUk7SUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQ0MsVUFBVSxDQUFDLGFBQWEsT0FBT0Q7SUFFekMsSUFBSTtRQUNGLE1BQU1FLE9BQU8sTUFBTW5CLHdEQUFjLENBQUM7UUFDbEMsSUFBSSxDQUFDVSxRQUFRLEdBQUcsTUFBTVYscURBQVcsQ0FBQyxJQUFJLENBQUNVLFFBQVEsRUFBRVM7UUFDakRGO0lBQ0YsRUFBRSxPQUFPSyxPQUFZO1FBQ25CTCxLQUFLSztJQUNQO0FBQ0Y7QUFFQSwwQkFBMEI7QUFDMUJyQixXQUFXc0IsT0FBTyxDQUFDQyxlQUFlLEdBQUcsZUFBZ0JDLGlCQUF5QjtJQUM1RSxPQUFPekIsd0RBQWMsQ0FBQ3lCLG1CQUFtQixJQUFJLENBQUNmLFFBQVE7QUFDeEQ7QUFFQSx1REFBdUQ7QUFDdkQsTUFBTWlCLE9BQXFCNUIsd0RBQWUsQ0FBQzRCLElBQUksSUFBSTVCLHFEQUFjLENBQVEsUUFBUUU7QUFFakYsaUVBQWUwQixJQUFJQSxFQUFBIiwic291cmNlcyI6WyJEOlxcS3VsaWFoXFxTZW1lc3RlciA0XFxTb2Z0d2FyZSBEZXZlbG9wbWVudFxcc2F2b3J5LWJhbmFuYXNfNFxcbW9kZWxzXFxVc2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyB0eXBlIERvY3VtZW50LCB0eXBlIE1vZGVsIH0gZnJvbSBcIm1vbmdvb3NlXCJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCJcblxuZXhwb3J0IGludGVyZmFjZSBJVXNlciBleHRlbmRzIERvY3VtZW50IHtcbiAgbmFtZTogc3RyaW5nXG4gIHVzZXJuYW1lOiBzdHJpbmdcbiAgcGFzc3dvcmQ6IHN0cmluZ1xuICByb2xlOiBcImFkbWluXCIgfCBcIm93bmVyXCJcbiAgY29tcGFyZVBhc3N3b3JkOiAoY2FuZGlkYXRlUGFzc3dvcmQ6IHN0cmluZykgPT4gUHJvbWlzZTxib29sZWFuPlxufVxuXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYTxJVXNlcj4oXG4gIHtcbiAgICBuYW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiUGxlYXNlIHByb3ZpZGUgYSBuYW1lXCJdLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICB9LFxuICAgIHVzZXJuYW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiUGxlYXNlIHByb3ZpZGUgYSB1c2VybmFtZVwiXSxcbiAgICAgIHVuaXF1ZTogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCBcIlBsZWFzZSBwcm92aWRlIGEgcGFzc3dvcmRcIl0sXG4gICAgICBtaW5sZW5ndGg6IDYsXG4gICAgfSxcbiAgICByb2xlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBlbnVtOiBbXCJhZG1pblwiLCBcIm93bmVyXCJdLFxuICAgICAgZGVmYXVsdDogXCJvd25lclwiLFxuICAgIH0sXG4gIH0sXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9LFxuKVxuXG4vLyBIYXNoIHBhc3N3b3JkIGJlZm9yZSBzYXZpbmdcblVzZXJTY2hlbWEucHJlKFwic2F2ZVwiLCBhc3luYyBmdW5jdGlvbiAobmV4dCkge1xuICBpZiAoIXRoaXMuaXNNb2RpZmllZChcInBhc3N3b3JkXCIpKSByZXR1cm4gbmV4dCgpXG5cbiAgdHJ5IHtcbiAgICBjb25zdCBzYWx0ID0gYXdhaXQgYmNyeXB0LmdlblNhbHQoMTApXG4gICAgdGhpcy5wYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHRoaXMucGFzc3dvcmQsIHNhbHQpXG4gICAgbmV4dCgpXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBuZXh0KGVycm9yKVxuICB9XG59KVxuXG4vLyBDb21wYXJlIHBhc3N3b3JkIG1ldGhvZFxuVXNlclNjaGVtYS5tZXRob2RzLmNvbXBhcmVQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChjYW5kaWRhdGVQYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIHJldHVybiBiY3J5cHQuY29tcGFyZShjYW5kaWRhdGVQYXNzd29yZCwgdGhpcy5wYXNzd29yZClcbn1cblxuLy8gRml4IGZvciBcIkNhbm5vdCBvdmVyd3JpdGUgbW9kZWwgb25jZSBjb21waWxlZFwiIGVycm9yXG5jb25zdCBVc2VyOiBNb2RlbDxJVXNlcj4gPSBtb25nb29zZS5tb2RlbHMuVXNlciB8fCBtb25nb29zZS5tb2RlbDxJVXNlcj4oXCJVc2VyXCIsIFVzZXJTY2hlbWEpXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsImJjcnlwdCIsIlVzZXJTY2hlbWEiLCJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidHJpbSIsInVzZXJuYW1lIiwidW5pcXVlIiwicGFzc3dvcmQiLCJtaW5sZW5ndGgiLCJyb2xlIiwiZW51bSIsImRlZmF1bHQiLCJ0aW1lc3RhbXBzIiwicHJlIiwibmV4dCIsImlzTW9kaWZpZWQiLCJzYWx0IiwiZ2VuU2FsdCIsImhhc2giLCJlcnJvciIsIm1ldGhvZHMiLCJjb21wYXJlUGFzc3dvcmQiLCJjYW5kaWRhdGVQYXNzd29yZCIsImNvbXBhcmUiLCJVc2VyIiwibW9kZWxzIiwibW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/User.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstocks%2Froute&page=%2Fapi%2Fstocks%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstocks%2Froute.ts&appDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstocks%2Froute&page=%2Fapi%2Fstocks%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstocks%2Froute.ts&appDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_Kuliah_Semester_4_Software_Development_savory_bananas_4_app_api_stocks_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/stocks/route.ts */ \"(rsc)/./app/api/stocks/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/stocks/route\",\n        pathname: \"/api/stocks\",\n        filename: \"route\",\n        bundlePath: \"app/api/stocks/route\"\n    },\n    resolvedPagePath: \"D:\\\\Kuliah\\\\Semester 4\\\\Software Development\\\\savory-bananas_4\\\\app\\\\api\\\\stocks\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_Kuliah_Semester_4_Software_Development_savory_bananas_4_app_api_stocks_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdG9ja3MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnN0b2NrcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnN0b2NrcyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDS3VsaWFoJTVDU2VtZXN0ZXIlMjA0JTVDU29mdHdhcmUlMjBEZXZlbG9wbWVudCU1Q3Nhdm9yeS1iYW5hbmFzXzQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNLdWxpYWglNUNTZW1lc3RlciUyMDQlNUNTb2Z0d2FyZSUyMERldmVsb3BtZW50JTVDc2F2b3J5LWJhbmFuYXNfNCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDMEM7QUFDdkg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXEt1bGlhaFxcXFxTZW1lc3RlciA0XFxcXFNvZnR3YXJlIERldmVsb3BtZW50XFxcXHNhdm9yeS1iYW5hbmFzXzRcXFxcYXBwXFxcXGFwaVxcXFxzdG9ja3NcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3N0b2Nrcy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3N0b2Nrc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc3RvY2tzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcS3VsaWFoXFxcXFNlbWVzdGVyIDRcXFxcU29mdHdhcmUgRGV2ZWxvcG1lbnRcXFxcc2F2b3J5LWJhbmFuYXNfNFxcXFxhcHBcXFxcYXBpXFxcXHN0b2Nrc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstocks%2Froute&page=%2Fapi%2Fstocks%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstocks%2Froute.ts&appDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstocks%2Froute&page=%2Fapi%2Fstocks%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstocks%2Froute.ts&appDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();