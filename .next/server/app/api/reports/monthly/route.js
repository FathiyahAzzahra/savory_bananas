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
exports.id = "app/api/reports/monthly/route";
exports.ids = ["app/api/reports/monthly/route"];
exports.modules = {

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler),\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                username: {\n                    label: \"Username\",\n                    type: \"text\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                console.log(\"authorize() called with:\", credentials);\n                if (!credentials?.username || !credentials?.password) {\n                    console.log(\"Missing credentials\");\n                    throw new Error(\"Please provide username and password\");\n                }\n                await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n                console.log(\"Connected to DB\");\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n                    username: credentials.username\n                });\n                console.log(\"User from DB:\", user);\n                if (!user) {\n                    console.log(\"No user found\");\n                    throw new Error(\"Invalid username or password\");\n                }\n                const isPasswordValid = await user.comparePassword(credentials.password);\n                console.log(\"Password valid:\", isPasswordValid);\n                if (!isPasswordValid) {\n                    throw new Error(\"Invalid username or password\");\n                }\n                console.log(\"Login successful, returning user object\");\n                return {\n                    id: user._id.toString(),\n                    name: user.name,\n                    username: user.username,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.username = user.username;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.username = token.username;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUEwRDtBQUNPO0FBQzVCO0FBQ0w7QUFFekIsTUFBTUksY0FBK0I7SUFDMUNDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLFVBQVU7b0JBQUVDLE9BQU87b0JBQVlDLE1BQU07Z0JBQU87Z0JBQzVDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekJNLFFBQVFDLEdBQUcsQ0FBQyw0QkFBNEJQO2dCQUV4QyxJQUFJLENBQUNBLGFBQWFDLFlBQVksQ0FBQ0QsYUFBYUksVUFBVTtvQkFDcERFLFFBQVFDLEdBQUcsQ0FBQztvQkFDWixNQUFNLElBQUlDLE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1iLHdEQUFTQTtnQkFDZlcsUUFBUUMsR0FBRyxDQUFDO2dCQUVaLE1BQU1FLE9BQU8sTUFBTWIsb0RBQUlBLENBQUNjLE9BQU8sQ0FBQztvQkFBRVQsVUFBVUQsWUFBWUMsUUFBUTtnQkFBQztnQkFDakVLLFFBQVFDLEdBQUcsQ0FBQyxpQkFBaUJFO2dCQUU3QixJQUFJLENBQUNBLE1BQU07b0JBQ1RILFFBQVFDLEdBQUcsQ0FBQztvQkFDWixNQUFNLElBQUlDLE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1HLGtCQUFrQixNQUFNRixLQUFLRyxlQUFlLENBQUNaLFlBQVlJLFFBQVE7Z0JBQ3ZFRSxRQUFRQyxHQUFHLENBQUMsbUJBQW1CSTtnQkFFL0IsSUFBSSxDQUFDQSxpQkFBaUI7b0JBQ3BCLE1BQU0sSUFBSUgsTUFBTTtnQkFDbEI7Z0JBRUFGLFFBQVFDLEdBQUcsQ0FBQztnQkFDWixPQUFPO29CQUNMTSxJQUFJSixLQUFLSyxHQUFHLENBQUNDLFFBQVE7b0JBQ3JCaEIsTUFBTVUsS0FBS1YsSUFBSTtvQkFDZkUsVUFBVVEsS0FBS1IsUUFBUTtvQkFDdkJlLE1BQU1QLEtBQUtPLElBQUk7Z0JBQ2pCO1lBQ0Y7UUFFRjtLQUNEO0lBQ0RDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRVYsSUFBSSxFQUFFO1lBQ3ZCLElBQUlBLE1BQU07Z0JBQ1JVLE1BQU1OLEVBQUUsR0FBR0osS0FBS0ksRUFBRTtnQkFDbEJNLE1BQU1sQixRQUFRLEdBQUdRLEtBQUtSLFFBQVE7Z0JBQzlCa0IsTUFBTUgsSUFBSSxHQUFHUCxLQUFLTyxJQUFJO1lBQ3hCO1lBQ0EsT0FBT0c7UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsT0FBTztnQkFDVEMsUUFBUVgsSUFBSSxDQUFDSSxFQUFFLEdBQUdNLE1BQU1OLEVBQUU7Z0JBQzFCTyxRQUFRWCxJQUFJLENBQUNSLFFBQVEsR0FBR2tCLE1BQU1sQixRQUFRO2dCQUN0Q21CLFFBQVFYLElBQUksQ0FBQ08sSUFBSSxHQUFHRyxNQUFNSCxJQUFJO1lBQ2hDO1lBQ0EsT0FBT0k7UUFDVDtJQUNGO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FGLFNBQVM7UUFDUEcsVUFBVTtRQUNWQyxRQUFRLEtBQUssS0FBSyxLQUFLO0lBQ3pCO0lBQ0FDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtBQUNyQyxFQUFDO0FBRUQsTUFBTUMsVUFBVXBDLGdEQUFRQSxDQUFDSTtBQUVpQiIsInNvdXJjZXMiOlsiRDpcXEt1bGlhaFxcU2VtZXN0ZXIgNFxcU29mdHdhcmUgRGV2ZWxvcG1lbnRcXHNhdm9yeS1iYW5hbmFzXzRcXGFwcFxcYXBpXFxhdXRoXFxbLi4ubmV4dGF1dGhdXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGgsIHsgdHlwZSBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCJcbmltcG9ydCBkYkNvbm5lY3QgZnJvbSBcIkAvbGliL21vbmdvZGJcIlxuaW1wb3J0IFVzZXIgZnJvbSBcIkAvbW9kZWxzL1VzZXJcIlxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICB1c2VybmFtZTogeyBsYWJlbDogXCJVc2VybmFtZVwiLCB0eXBlOiBcInRleHRcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhdXRob3JpemUoKSBjYWxsZWQgd2l0aDpcIiwgY3JlZGVudGlhbHMpXG5cbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8udXNlcm5hbWUgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWlzc2luZyBjcmVkZW50aWFsc1wiKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBwcm92aWRlIHVzZXJuYW1lIGFuZCBwYXNzd29yZFwiKVxuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgZGJDb25uZWN0KClcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQgdG8gREJcIilcblxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgdXNlcm5hbWU6IGNyZWRlbnRpYWxzLnVzZXJuYW1lIH0pXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBmcm9tIERCOlwiLCB1c2VyKVxuXG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gdXNlciBmb3VuZFwiKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmRcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IHVzZXIuY29tcGFyZVBhc3N3b3JkKGNyZWRlbnRpYWxzLnBhc3N3b3JkKVxuICAgICAgICBjb25zb2xlLmxvZyhcIlBhc3N3b3JkIHZhbGlkOlwiLCBpc1Bhc3N3b3JkVmFsaWQpXG5cbiAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkXCIpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2luIHN1Y2Nlc3NmdWwsIHJldHVybmluZyB1c2VyIG9iamVjdFwiKVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLl9pZC50b1N0cmluZygpLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkXG4gICAgICAgIHRva2VuLnVzZXJuYW1lID0gdXNlci51c2VybmFtZVxuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlXG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5cbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nXG4gICAgICAgIHNlc3Npb24udXNlci51c2VybmFtZSA9IHRva2VuLnVzZXJuYW1lIGFzIHN0cmluZ1xuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGUgYXMgc3RyaW5nXG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH0sXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiBcIi9sb2dpblwiLFxuICB9LFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCwgLy8gMzAgZGF5c1xuICB9LFxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcbn1cblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKVxuXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH1cbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJkYkNvbm5lY3QiLCJVc2VyIiwiYXV0aE9wdGlvbnMiLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJ1c2VybmFtZSIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiY29uc29sZSIsImxvZyIsIkVycm9yIiwidXNlciIsImZpbmRPbmUiLCJpc1Bhc3N3b3JkVmFsaWQiLCJjb21wYXJlUGFzc3dvcmQiLCJpZCIsIl9pZCIsInRvU3RyaW5nIiwicm9sZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInBhZ2VzIiwic2lnbkluIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/api/reports/monthly/route.ts":
/*!******************************************!*\
  !*** ./app/api/reports/monthly/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/next */ \"(rsc)/./node_modules/next-auth/next/index.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n/* harmony import */ var _models_Order__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/models/Order */ \"(rsc)/./models/Order.ts\");\n/* harmony import */ var _auth_nextauth_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../auth/[...nextauth]/route */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth_next__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_auth_nextauth_route__WEBPACK_IMPORTED_MODULE_4__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        // 🔁 Update: Admin & Owner diizinkan\n        const allowedRoles = [\n            \"admin\",\n            \"owner\"\n        ];\n        if (!allowedRoles.includes(session.user.role)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Forbidden\"\n            }, {\n                status: 403\n            });\n        }\n        const { searchParams } = new URL(request.url);\n        const year = searchParams.get(\"year\") || new Date().getFullYear().toString();\n        await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n        const startDate = new Date(`${year}-01-01T00:00:00.000Z`);\n        const endDate = new Date(`${Number.parseInt(year) + 1}-01-01T00:00:00.000Z`);\n        const orders = await _models_Order__WEBPACK_IMPORTED_MODULE_3__[\"default\"].find({\n            createdAt: {\n                $gte: startDate,\n                $lt: endDate\n            }\n        }).sort({\n            createdAt: 1\n        });\n        const monthlyData = {};\n        const months = [\n            \"January\",\n            \"February\",\n            \"March\",\n            \"April\",\n            \"May\",\n            \"June\",\n            \"July\",\n            \"August\",\n            \"September\",\n            \"October\",\n            \"November\",\n            \"December\"\n        ];\n        months.forEach((month)=>{\n            monthlyData[month] = {\n                month,\n                totalSales: 0,\n                totalOrders: 0,\n                averageOrderValue: 0\n            };\n        });\n        orders.forEach((order)=>{\n            const month = months[new Date(order.createdAt).getMonth()];\n            monthlyData[month].totalSales += order.totalPrice;\n            monthlyData[month].totalOrders += 1;\n        });\n        Object.keys(monthlyData).forEach((month)=>{\n            if (monthlyData[month].totalOrders > 0) {\n                monthlyData[month].averageOrderValue = monthlyData[month].totalSales / monthlyData[month].totalOrders;\n            }\n        });\n        const result = Object.values(monthlyData);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result);\n    } catch (error) {\n        console.error(\"Error fetching reports:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Failed to fetch reports\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3JlcG9ydHMvbW9udGhseS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBMEM7QUFDTztBQUNaO0FBQ0g7QUFDMEI7QUFFckQsZUFBZUssSUFBSUMsT0FBZ0I7SUFDeEMsSUFBSTtRQUNGLE1BQU1DLFVBQVUsTUFBTU4sZ0VBQWdCQSxDQUFDRyw2REFBV0E7UUFFbEQsSUFBSSxDQUFDRyxTQUFTO1lBQ1osT0FBT1AscURBQVlBLENBQUNRLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFlLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNwRTtRQUVBLHFDQUFxQztRQUNyQyxNQUFNQyxlQUFlO1lBQUM7WUFBUztTQUFRO1FBQ3ZDLElBQUksQ0FBQ0EsYUFBYUMsUUFBUSxDQUFDTCxRQUFRTSxJQUFJLENBQUNDLElBQUksR0FBRztZQUM3QyxPQUFPZCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQVksR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ2pFO1FBRUEsTUFBTSxFQUFFSyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJVixRQUFRVyxHQUFHO1FBQzVDLE1BQU1DLE9BQU9ILGFBQWFJLEdBQUcsQ0FBQyxXQUFXLElBQUlDLE9BQU9DLFdBQVcsR0FBR0MsUUFBUTtRQUUxRSxNQUFNcEIsd0RBQVNBO1FBRWYsTUFBTXFCLFlBQVksSUFBSUgsS0FBSyxHQUFHRixLQUFLLG9CQUFvQixDQUFDO1FBQ3hELE1BQU1NLFVBQVUsSUFBSUosS0FBSyxHQUFHSyxPQUFPQyxRQUFRLENBQUNSLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQztRQUUzRSxNQUFNUyxTQUFTLE1BQU14QixxREFBS0EsQ0FBQ3lCLElBQUksQ0FBQztZQUM5QkMsV0FBVztnQkFBRUMsTUFBTVA7Z0JBQVdRLEtBQUtQO1lBQVE7UUFDN0MsR0FBR1EsSUFBSSxDQUFDO1lBQUVILFdBQVc7UUFBRTtRQUV2QixNQUFNSSxjQUFtQyxDQUFDO1FBQzFDLE1BQU1DLFNBQVM7WUFDYjtZQUFXO1lBQVk7WUFBUztZQUFTO1lBQU87WUFDaEQ7WUFBUTtZQUFVO1lBQWE7WUFBVztZQUFZO1NBQ3ZEO1FBRURBLE9BQU9DLE9BQU8sQ0FBQyxDQUFDQztZQUNkSCxXQUFXLENBQUNHLE1BQU0sR0FBRztnQkFDbkJBO2dCQUNBQyxZQUFZO2dCQUNaQyxhQUFhO2dCQUNiQyxtQkFBbUI7WUFDckI7UUFDRjtRQUVBWixPQUFPUSxPQUFPLENBQUMsQ0FBQ0s7WUFDZCxNQUFNSixRQUFRRixNQUFNLENBQUMsSUFBSWQsS0FBS29CLE1BQU1YLFNBQVMsRUFBRVksUUFBUSxHQUFHO1lBQzFEUixXQUFXLENBQUNHLE1BQU0sQ0FBQ0MsVUFBVSxJQUFJRyxNQUFNRSxVQUFVO1lBQ2pEVCxXQUFXLENBQUNHLE1BQU0sQ0FBQ0UsV0FBVyxJQUFJO1FBQ3BDO1FBRUFLLE9BQU9DLElBQUksQ0FBQ1gsYUFBYUUsT0FBTyxDQUFDLENBQUNDO1lBQ2hDLElBQUlILFdBQVcsQ0FBQ0csTUFBTSxDQUFDRSxXQUFXLEdBQUcsR0FBRztnQkFDdENMLFdBQVcsQ0FBQ0csTUFBTSxDQUFDRyxpQkFBaUIsR0FDbENOLFdBQVcsQ0FBQ0csTUFBTSxDQUFDQyxVQUFVLEdBQUdKLFdBQVcsQ0FBQ0csTUFBTSxDQUFDRSxXQUFXO1lBQ2xFO1FBQ0Y7UUFFQSxNQUFNTyxTQUFTRixPQUFPRyxNQUFNLENBQUNiO1FBRTdCLE9BQU9qQyxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDcUM7SUFDM0IsRUFBRSxPQUFPcEMsT0FBWTtRQUNuQnNDLFFBQVF0QyxLQUFLLENBQUMsMkJBQTJCQTtRQUN6QyxPQUFPVCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUN0QjtZQUFFQyxPQUFPQSxNQUFNdUMsT0FBTyxJQUFJO1FBQTBCLEdBQ3BEO1lBQUV0QyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiRDpcXEt1bGlhaFxcU2VtZXN0ZXIgNFxcU29mdHdhcmUgRGV2ZWxvcG1lbnRcXHNhdm9yeS1iYW5hbmFzXzRcXGFwcFxcYXBpXFxyZXBvcnRzXFxtb250aGx5XFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIlxuaW1wb3J0IHsgZ2V0U2VydmVyU2Vzc2lvbiB9IGZyb20gXCJuZXh0LWF1dGgvbmV4dFwiXG5pbXBvcnQgZGJDb25uZWN0IGZyb20gXCJAL2xpYi9tb25nb2RiXCJcbmltcG9ydCBPcmRlciBmcm9tIFwiQC9tb2RlbHMvT3JkZXJcIlxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXG5cbiAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSlcbiAgICB9XG5cbiAgICAvLyDwn5SBIFVwZGF0ZTogQWRtaW4gJiBPd25lciBkaWl6aW5rYW5cbiAgICBjb25zdCBhbGxvd2VkUm9sZXMgPSBbXCJhZG1pblwiLCBcIm93bmVyXCJdXG4gICAgaWYgKCFhbGxvd2VkUm9sZXMuaW5jbHVkZXMoc2Vzc2lvbi51c2VyLnJvbGUpKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGb3JiaWRkZW5cIiB9LCB7IHN0YXR1czogNDAzIH0pXG4gICAgfVxuXG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpXG4gICAgY29uc3QgeWVhciA9IHNlYXJjaFBhcmFtcy5nZXQoXCJ5ZWFyXCIpIHx8IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpXG5cbiAgICBhd2FpdCBkYkNvbm5lY3QoKVxuXG4gICAgY29uc3Qgc3RhcnREYXRlID0gbmV3IERhdGUoYCR7eWVhcn0tMDEtMDFUMDA6MDA6MDAuMDAwWmApXG4gICAgY29uc3QgZW5kRGF0ZSA9IG5ldyBEYXRlKGAke051bWJlci5wYXJzZUludCh5ZWFyKSArIDF9LTAxLTAxVDAwOjAwOjAwLjAwMFpgKVxuXG4gICAgY29uc3Qgb3JkZXJzID0gYXdhaXQgT3JkZXIuZmluZCh7XG4gICAgICBjcmVhdGVkQXQ6IHsgJGd0ZTogc3RhcnREYXRlLCAkbHQ6IGVuZERhdGUgfSxcbiAgICB9KS5zb3J0KHsgY3JlYXRlZEF0OiAxIH0pXG5cbiAgICBjb25zdCBtb250aGx5RGF0YTogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9XG4gICAgY29uc3QgbW9udGhzID0gW1xuICAgICAgXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLFxuICAgICAgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIlxuICAgIF1cblxuICAgIG1vbnRocy5mb3JFYWNoKChtb250aCkgPT4ge1xuICAgICAgbW9udGhseURhdGFbbW9udGhdID0ge1xuICAgICAgICBtb250aCxcbiAgICAgICAgdG90YWxTYWxlczogMCxcbiAgICAgICAgdG90YWxPcmRlcnM6IDAsXG4gICAgICAgIGF2ZXJhZ2VPcmRlclZhbHVlOiAwLFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBvcmRlcnMuZm9yRWFjaCgob3JkZXI6IHsgY3JlYXRlZEF0OiBzdHJpbmcgfCBudW1iZXIgfCBEYXRlOyB0b3RhbFByaWNlOiBudW1iZXIgfSkgPT4ge1xuICAgICAgY29uc3QgbW9udGggPSBtb250aHNbbmV3IERhdGUob3JkZXIuY3JlYXRlZEF0KS5nZXRNb250aCgpXVxuICAgICAgbW9udGhseURhdGFbbW9udGhdLnRvdGFsU2FsZXMgKz0gb3JkZXIudG90YWxQcmljZVxuICAgICAgbW9udGhseURhdGFbbW9udGhdLnRvdGFsT3JkZXJzICs9IDFcbiAgICB9KVxuXG4gICAgT2JqZWN0LmtleXMobW9udGhseURhdGEpLmZvckVhY2goKG1vbnRoKSA9PiB7XG4gICAgICBpZiAobW9udGhseURhdGFbbW9udGhdLnRvdGFsT3JkZXJzID4gMCkge1xuICAgICAgICBtb250aGx5RGF0YVttb250aF0uYXZlcmFnZU9yZGVyVmFsdWUgPVxuICAgICAgICAgIG1vbnRobHlEYXRhW21vbnRoXS50b3RhbFNhbGVzIC8gbW9udGhseURhdGFbbW9udGhdLnRvdGFsT3JkZXJzXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlc3VsdCA9IE9iamVjdC52YWx1ZXMobW9udGhseURhdGEpXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocmVzdWx0KVxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHJlcG9ydHM6XCIsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gZmV0Y2ggcmVwb3J0c1wiIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiZGJDb25uZWN0IiwiT3JkZXIiLCJhdXRoT3B0aW9ucyIsIkdFVCIsInJlcXVlc3QiLCJzZXNzaW9uIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiYWxsb3dlZFJvbGVzIiwiaW5jbHVkZXMiLCJ1c2VyIiwicm9sZSIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInllYXIiLCJnZXQiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJOdW1iZXIiLCJwYXJzZUludCIsIm9yZGVycyIsImZpbmQiLCJjcmVhdGVkQXQiLCIkZ3RlIiwiJGx0Iiwic29ydCIsIm1vbnRobHlEYXRhIiwibW9udGhzIiwiZm9yRWFjaCIsIm1vbnRoIiwidG90YWxTYWxlcyIsInRvdGFsT3JkZXJzIiwiYXZlcmFnZU9yZGVyVmFsdWUiLCJvcmRlciIsImdldE1vbnRoIiwidG90YWxQcmljZSIsIk9iamVjdCIsImtleXMiLCJyZXN1bHQiLCJ2YWx1ZXMiLCJjb25zb2xlIiwibWVzc2FnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/reports/monthly/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define the MONGODB_URI environment variable in .env.local\");\n}\nlet cached = global.mongooseGlobal;\nif (!cached) {\n    cached = global.mongooseGlobal = {\n        conn: null,\n        promise: null\n    };\n}\nasync function dbConnect() {\n    if (cached.conn) {\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: false\n        };\n        console.log(\"Connecting to MongoDB...\", MONGODB_URI);\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongooseInstance)=>{\n            console.log(\"Connected to MongoDB!\");\n            return mongooseInstance;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n    } catch (e) {\n        cached.promise = null;\n        console.error(\"Failed to connect to MongoDB:\", e);\n        throw e;\n    }\n    return cached.conn;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dbConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsY0FBY0MsUUFBUUMsR0FBRyxDQUFDRixXQUFXO0FBRTNDLElBQUksQ0FBQ0EsYUFBYTtJQUNoQixNQUFNLElBQUlHLE1BQU07QUFDbEI7QUFTQSxJQUFJQyxTQUFTQyxPQUFPQyxjQUFjO0FBRWxDLElBQUksQ0FBQ0YsUUFBUTtJQUNYQSxTQUFTQyxPQUFPQyxjQUFjLEdBQUc7UUFBRUMsTUFBTTtRQUFNQyxTQUFTO0lBQUs7QUFDL0Q7QUFFQSxlQUFlQztJQUNiLElBQUlMLE9BQU9HLElBQUksRUFBRTtRQUNmLE9BQU9ILE9BQU9HLElBQUk7SUFDcEI7SUFFQSxJQUFJLENBQUNILE9BQU9JLE9BQU8sRUFBRTtRQUNuQixNQUFNRSxPQUFPO1lBQ1hDLGdCQUFnQjtRQUNsQjtRQUVBQyxRQUFRQyxHQUFHLENBQUMsNEJBQTRCYjtRQUN4Q0ksT0FBT0ksT0FBTyxHQUFHVCx1REFBZ0IsQ0FBQ0MsYUFBYVUsTUFBTUssSUFBSSxDQUFDLENBQUNDO1lBQ3pESixRQUFRQyxHQUFHLENBQUM7WUFDWixPQUFPRztRQUNUO0lBQ0Y7SUFFQSxJQUFJO1FBQ0ZaLE9BQU9HLElBQUksR0FBRyxNQUFNSCxPQUFPSSxPQUFPO0lBQ3BDLEVBQUUsT0FBT1MsR0FBRztRQUNWYixPQUFPSSxPQUFPLEdBQUc7UUFDakJJLFFBQVFNLEtBQUssQ0FBQyxpQ0FBaUNEO1FBQy9DLE1BQU1BO0lBQ1I7SUFFQSxPQUFPYixPQUFPRyxJQUFJO0FBQ3BCO0FBRUEsaUVBQWVFLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIkQ6XFxLdWxpYWhcXFNlbWVzdGVyIDRcXFNvZnR3YXJlIERldmVsb3BtZW50XFxzYXZvcnktYmFuYW5hc180XFxsaWJcXG1vbmdvZGIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJO1xuXG5pZiAoIU1PTkdPREJfVVJJKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBkZWZpbmUgdGhlIE1PTkdPREJfVVJJIGVudmlyb25tZW50IHZhcmlhYmxlIGluIC5lbnYubG9jYWxcIik7XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdmFyIG1vbmdvb3NlR2xvYmFsOiB7XG4gICAgY29ubjogdHlwZW9mIG1vbmdvb3NlIHwgbnVsbDtcbiAgICBwcm9taXNlOiBQcm9taXNlPHR5cGVvZiBtb25nb29zZT4gfCBudWxsO1xuICB9O1xufVxuXG5sZXQgY2FjaGVkID0gZ2xvYmFsLm1vbmdvb3NlR2xvYmFsO1xuXG5pZiAoIWNhY2hlZCkge1xuICBjYWNoZWQgPSBnbG9iYWwubW9uZ29vc2VHbG9iYWwgPSB7IGNvbm46IG51bGwsIHByb21pc2U6IG51bGwgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGJDb25uZWN0KCkge1xuICBpZiAoY2FjaGVkLmNvbm4pIHtcbiAgICByZXR1cm4gY2FjaGVkLmNvbm47XG4gIH1cblxuICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGJ1ZmZlckNvbW1hbmRzOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coXCJDb25uZWN0aW5nIHRvIE1vbmdvREIuLi5cIiwgTU9OR09EQl9VUkkpO1xuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwgb3B0cykudGhlbigobW9uZ29vc2VJbnN0YW5jZTogYW55KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3RlZCB0byBNb25nb0RCIVwiKTtcbiAgICAgIHJldHVybiBtb25nb29zZUluc3RhbmNlO1xuICAgIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjYWNoZWQuY29ubiA9IGF3YWl0IGNhY2hlZC5wcm9taXNlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkLnByb21pc2UgPSBudWxsO1xuICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gY29ubmVjdCB0byBNb25nb0RCOlwiLCBlKTtcbiAgICB0aHJvdyBlO1xuICB9XG5cbiAgcmV0dXJuIGNhY2hlZC5jb25uO1xufVxuXG5leHBvcnQgZGVmYXVsdCBkYkNvbm5lY3Q7XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImNhY2hlZCIsImdsb2JhbCIsIm1vbmdvb3NlR2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJkYkNvbm5lY3QiLCJvcHRzIiwiYnVmZmVyQ29tbWFuZHMiLCJjb25zb2xlIiwibG9nIiwiY29ubmVjdCIsInRoZW4iLCJtb25nb29zZUluc3RhbmNlIiwiZSIsImVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./models/Order.ts":
/*!*************************!*\
  !*** ./models/Order.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst OrderProductSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    productId: {\n        type: (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema).Types.ObjectId,\n        ref: \"Stock\",\n        required: true\n    },\n    name: {\n        type: String,\n        required: true\n    },\n    quantity: {\n        type: Number,\n        required: true,\n        min: 1\n    },\n    price: {\n        type: Number,\n        required: true,\n        min: 0\n    }\n});\nconst OrderSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    customerName: {\n        type: String,\n        required: [\n            true,\n            \"Please provide customer name\"\n        ],\n        trim: true\n    },\n    products: {\n        type: [\n            OrderProductSchema\n        ],\n        required: true,\n        validate: {\n            validator: (products)=>products.length > 0,\n            message: \"Order must have at least one product\"\n        }\n    },\n    totalPrice: {\n        type: Number,\n        required: true,\n        min: 0\n    },\n    status: {\n        type: String,\n        enum: [\n            \"Not Yet Processed\",\n            \"Being Sent\",\n            \"Completed\"\n        ],\n        default: \"Not Yet Processed\"\n    },\n    paymentStatus: {\n        type: String,\n        enum: [\n            \"Paid\",\n            \"Not Yet Paid\"\n        ],\n        default: \"Not Yet Paid\"\n    }\n}, {\n    timestamps: true\n});\nconst Order = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Order || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Order\", OrderSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Order);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvT3JkZXIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThEO0FBbUI5RCxNQUFNQyxxQkFBcUIsSUFBSUQsd0RBQWUsQ0FBQztJQUM3Q0csV0FBVztRQUNUQyxNQUFNSix3REFBZSxDQUFDSyxLQUFLLENBQUNDLFFBQVE7UUFDcENDLEtBQUs7UUFDTEMsVUFBVTtJQUNaO0lBQ0FDLE1BQU07UUFDSkwsTUFBTU07UUFDTkYsVUFBVTtJQUNaO0lBQ0FHLFVBQVU7UUFDUlAsTUFBTVE7UUFDTkosVUFBVTtRQUNWSyxLQUFLO0lBQ1A7SUFDQUMsT0FBTztRQUNMVixNQUFNUTtRQUNOSixVQUFVO1FBQ1ZLLEtBQUs7SUFDUDtBQUNGO0FBRUEsTUFBTUUsY0FBYyxJQUFJZix3REFBZSxDQUNyQztJQUNFZ0IsY0FBYztRQUNaWixNQUFNTTtRQUNORixVQUFVO1lBQUM7WUFBTTtTQUErQjtRQUNoRFMsTUFBTTtJQUNSO0lBQ0FDLFVBQVU7UUFDUmQsTUFBTTtZQUFDSDtTQUFtQjtRQUMxQk8sVUFBVTtRQUNWVyxVQUFVO1lBQ1JDLFdBQVcsQ0FBQ0YsV0FBb0JBLFNBQVNHLE1BQU0sR0FBRztZQUNsREMsU0FBUztRQUNYO0lBQ0Y7SUFDQUMsWUFBWTtRQUNWbkIsTUFBTVE7UUFDTkosVUFBVTtRQUNWSyxLQUFLO0lBQ1A7SUFDQVcsUUFBUTtRQUNOcEIsTUFBTU07UUFDTmUsTUFBTTtZQUFDO1lBQXFCO1lBQWM7U0FBWTtRQUN0REMsU0FBUztJQUNYO0lBQ0FDLGVBQWU7UUFDYnZCLE1BQU1NO1FBQ05lLE1BQU07WUFBQztZQUFRO1NBQWU7UUFDOUJDLFNBQVM7SUFDWDtBQUNGLEdBQ0E7SUFBRUUsWUFBWTtBQUFLO0FBR3JCLE1BQU1DLFFBQXVCN0Isd0RBQWUsQ0FBQzZCLEtBQUssSUFBSTdCLHFEQUFjLENBQVMsU0FBU2U7QUFFdEYsaUVBQWVjLEtBQUtBLEVBQUEiLCJzb3VyY2VzIjpbIkQ6XFxLdWxpYWhcXFNlbWVzdGVyIDRcXFNvZnR3YXJlIERldmVsb3BtZW50XFxzYXZvcnktYmFuYW5hc180XFxtb2RlbHNcXE9yZGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyB0eXBlIERvY3VtZW50LCB0eXBlIE1vZGVsIH0gZnJvbSBcIm1vbmdvb3NlXCJcblxuaW50ZXJmYWNlIE9yZGVyUHJvZHVjdCB7XG4gIHByb2R1Y3RJZDogbW9uZ29vc2UuVHlwZXMuT2JqZWN0SWRcbiAgbmFtZTogc3RyaW5nXG4gIHF1YW50aXR5OiBudW1iZXJcbiAgcHJpY2U6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElPcmRlciBleHRlbmRzIERvY3VtZW50IHtcbiAgY3VzdG9tZXJOYW1lOiBzdHJpbmdcbiAgcHJvZHVjdHM6IE9yZGVyUHJvZHVjdFtdXG4gIHRvdGFsUHJpY2U6IG51bWJlclxuICBzdGF0dXM6IFwiTm90IFlldCBQcm9jZXNzZWRcIiB8IFwiQmVpbmcgU2VudFwiIHwgXCJDb21wbGV0ZWRcIlxuICBwYXltZW50U3RhdHVzOiBcIlBhaWRcIiB8IFwiTm90IFlldCBQYWlkXCJcbiAgY3JlYXRlZEF0OiBEYXRlXG4gIHVwZGF0ZWRBdDogRGF0ZVxufVxuXG5jb25zdCBPcmRlclByb2R1Y3RTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcbiAgcHJvZHVjdElkOiB7XG4gICAgdHlwZTogbW9uZ29vc2UuU2NoZW1hLlR5cGVzLk9iamVjdElkLFxuICAgIHJlZjogXCJTdG9ja1wiLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICB9LFxuICBuYW1lOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICB9LFxuICBxdWFudGl0eToge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBtaW46IDEsXG4gIH0sXG4gIHByaWNlOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIG1pbjogMCxcbiAgfSxcbn0pXG5cbmNvbnN0IE9yZGVyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYShcbiAge1xuICAgIGN1c3RvbWVyTmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCBcIlBsZWFzZSBwcm92aWRlIGN1c3RvbWVyIG5hbWVcIl0sXG4gICAgICB0cmltOiB0cnVlLFxuICAgIH0sXG4gICAgcHJvZHVjdHM6IHtcbiAgICAgIHR5cGU6IFtPcmRlclByb2R1Y3RTY2hlbWFdLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICB2YWxpZGF0b3I6IChwcm9kdWN0czogYW55W10pID0+IHByb2R1Y3RzLmxlbmd0aCA+IDAsXG4gICAgICAgIG1lc3NhZ2U6IFwiT3JkZXIgbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBwcm9kdWN0XCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgdG90YWxQcmljZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICBtaW46IDAsXG4gICAgfSxcbiAgICBzdGF0dXM6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGVudW06IFtcIk5vdCBZZXQgUHJvY2Vzc2VkXCIsIFwiQmVpbmcgU2VudFwiLCBcIkNvbXBsZXRlZFwiXSxcbiAgICAgIGRlZmF1bHQ6IFwiTm90IFlldCBQcm9jZXNzZWRcIixcbiAgICB9LFxuICAgIHBheW1lbnRTdGF0dXM6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGVudW06IFtcIlBhaWRcIiwgXCJOb3QgWWV0IFBhaWRcIl0sXG4gICAgICBkZWZhdWx0OiBcIk5vdCBZZXQgUGFpZFwiLFxuICAgIH0sXG4gIH0sXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9LFxuKVxuXG5jb25zdCBPcmRlcjogTW9kZWw8SU9yZGVyPiA9IG1vbmdvb3NlLm1vZGVscy5PcmRlciB8fCBtb25nb29zZS5tb2RlbDxJT3JkZXI+KFwiT3JkZXJcIiwgT3JkZXJTY2hlbWEpXG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyXG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJPcmRlclByb2R1Y3RTY2hlbWEiLCJTY2hlbWEiLCJwcm9kdWN0SWQiLCJ0eXBlIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsInJlcXVpcmVkIiwibmFtZSIsIlN0cmluZyIsInF1YW50aXR5IiwiTnVtYmVyIiwibWluIiwicHJpY2UiLCJPcmRlclNjaGVtYSIsImN1c3RvbWVyTmFtZSIsInRyaW0iLCJwcm9kdWN0cyIsInZhbGlkYXRlIiwidmFsaWRhdG9yIiwibGVuZ3RoIiwibWVzc2FnZSIsInRvdGFsUHJpY2UiLCJzdGF0dXMiLCJlbnVtIiwiZGVmYXVsdCIsInBheW1lbnRTdGF0dXMiLCJ0aW1lc3RhbXBzIiwiT3JkZXIiLCJtb2RlbHMiLCJtb2RlbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./models/Order.ts\n");

/***/ }),

/***/ "(rsc)/./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\nconst UserSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    name: {\n        type: String,\n        required: [\n            true,\n            \"Please provide a name\"\n        ],\n        trim: true\n    },\n    username: {\n        type: String,\n        required: [\n            true,\n            \"Please provide a username\"\n        ],\n        unique: true,\n        trim: true\n    },\n    password: {\n        type: String,\n        required: [\n            true,\n            \"Please provide a password\"\n        ],\n        minlength: 6\n    },\n    role: {\n        type: String,\n        enum: [\n            \"admin\",\n            \"owner\"\n        ],\n        default: \"owner\"\n    }\n}, {\n    timestamps: true\n});\n// Hash password before saving\nUserSchema.pre(\"save\", async function(next) {\n    if (!this.isModified(\"password\")) return next();\n    try {\n        const salt = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].genSalt(10);\n        this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].hash(this.password, salt);\n        next();\n    } catch (error) {\n        next(error);\n    }\n});\n// Compare password method\nUserSchema.methods.comparePassword = async function(candidatePassword) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].compare(candidatePassword, this.password);\n};\n// Fix for \"Cannot overwrite model once compiled\" error\nconst User = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQThEO0FBQ2pDO0FBVTdCLE1BQU1FLGFBQWEsSUFBSUYsd0RBQWUsQ0FDcEM7SUFDRUksTUFBTTtRQUNKQyxNQUFNQztRQUNOQyxVQUFVO1lBQUM7WUFBTTtTQUF3QjtRQUN6Q0MsTUFBTTtJQUNSO0lBQ0FDLFVBQVU7UUFDUkosTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBNEI7UUFDN0NHLFFBQVE7UUFDUkYsTUFBTTtJQUNSO0lBQ0FHLFVBQVU7UUFDUk4sTUFBTUM7UUFDTkMsVUFBVTtZQUFDO1lBQU07U0FBNEI7UUFDN0NLLFdBQVc7SUFDYjtJQUNBQyxNQUFNO1FBQ0pSLE1BQU1DO1FBQ05RLE1BQU07WUFBQztZQUFTO1NBQVE7UUFDeEJDLFNBQVM7SUFDWDtBQUNGLEdBQ0E7SUFBRUMsWUFBWTtBQUFLO0FBR3JCLDhCQUE4QjtBQUM5QmQsV0FBV2UsR0FBRyxDQUFDLFFBQVEsZUFBZ0JDLElBQUk7SUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQ0MsVUFBVSxDQUFDLGFBQWEsT0FBT0Q7SUFFekMsSUFBSTtRQUNGLE1BQU1FLE9BQU8sTUFBTW5CLHdEQUFjLENBQUM7UUFDbEMsSUFBSSxDQUFDVSxRQUFRLEdBQUcsTUFBTVYscURBQVcsQ0FBQyxJQUFJLENBQUNVLFFBQVEsRUFBRVM7UUFDakRGO0lBQ0YsRUFBRSxPQUFPSyxPQUFZO1FBQ25CTCxLQUFLSztJQUNQO0FBQ0Y7QUFFQSwwQkFBMEI7QUFDMUJyQixXQUFXc0IsT0FBTyxDQUFDQyxlQUFlLEdBQUcsZUFBZ0JDLGlCQUF5QjtJQUM1RSxPQUFPekIsd0RBQWMsQ0FBQ3lCLG1CQUFtQixJQUFJLENBQUNmLFFBQVE7QUFDeEQ7QUFFQSx1REFBdUQ7QUFDdkQsTUFBTWlCLE9BQXFCNUIsd0RBQWUsQ0FBQzRCLElBQUksSUFBSTVCLHFEQUFjLENBQVEsUUFBUUU7QUFFakYsaUVBQWUwQixJQUFJQSxFQUFBIiwic291cmNlcyI6WyJEOlxcS3VsaWFoXFxTZW1lc3RlciA0XFxTb2Z0d2FyZSBEZXZlbG9wbWVudFxcc2F2b3J5LWJhbmFuYXNfNFxcbW9kZWxzXFxVc2VyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyB0eXBlIERvY3VtZW50LCB0eXBlIE1vZGVsIH0gZnJvbSBcIm1vbmdvb3NlXCJcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCJcblxuZXhwb3J0IGludGVyZmFjZSBJVXNlciBleHRlbmRzIERvY3VtZW50IHtcbiAgbmFtZTogc3RyaW5nXG4gIHVzZXJuYW1lOiBzdHJpbmdcbiAgcGFzc3dvcmQ6IHN0cmluZ1xuICByb2xlOiBcImFkbWluXCIgfCBcIm93bmVyXCJcbiAgY29tcGFyZVBhc3N3b3JkOiAoY2FuZGlkYXRlUGFzc3dvcmQ6IHN0cmluZykgPT4gUHJvbWlzZTxib29sZWFuPlxufVxuXG5jb25zdCBVc2VyU2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYTxJVXNlcj4oXG4gIHtcbiAgICBuYW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiUGxlYXNlIHByb3ZpZGUgYSBuYW1lXCJdLFxuICAgICAgdHJpbTogdHJ1ZSxcbiAgICB9LFxuICAgIHVzZXJuYW1lOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICByZXF1aXJlZDogW3RydWUsIFwiUGxlYXNlIHByb3ZpZGUgYSB1c2VybmFtZVwiXSxcbiAgICAgIHVuaXF1ZTogdHJ1ZSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgfSxcbiAgICBwYXNzd29yZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IFt0cnVlLCBcIlBsZWFzZSBwcm92aWRlIGEgcGFzc3dvcmRcIl0sXG4gICAgICBtaW5sZW5ndGg6IDYsXG4gICAgfSxcbiAgICByb2xlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBlbnVtOiBbXCJhZG1pblwiLCBcIm93bmVyXCJdLFxuICAgICAgZGVmYXVsdDogXCJvd25lclwiLFxuICAgIH0sXG4gIH0sXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9LFxuKVxuXG4vLyBIYXNoIHBhc3N3b3JkIGJlZm9yZSBzYXZpbmdcblVzZXJTY2hlbWEucHJlKFwic2F2ZVwiLCBhc3luYyBmdW5jdGlvbiAobmV4dCkge1xuICBpZiAoIXRoaXMuaXNNb2RpZmllZChcInBhc3N3b3JkXCIpKSByZXR1cm4gbmV4dCgpXG5cbiAgdHJ5IHtcbiAgICBjb25zdCBzYWx0ID0gYXdhaXQgYmNyeXB0LmdlblNhbHQoMTApXG4gICAgdGhpcy5wYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHRoaXMucGFzc3dvcmQsIHNhbHQpXG4gICAgbmV4dCgpXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBuZXh0KGVycm9yKVxuICB9XG59KVxuXG4vLyBDb21wYXJlIHBhc3N3b3JkIG1ldGhvZFxuVXNlclNjaGVtYS5tZXRob2RzLmNvbXBhcmVQYXNzd29yZCA9IGFzeW5jIGZ1bmN0aW9uIChjYW5kaWRhdGVQYXNzd29yZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIHJldHVybiBiY3J5cHQuY29tcGFyZShjYW5kaWRhdGVQYXNzd29yZCwgdGhpcy5wYXNzd29yZClcbn1cblxuLy8gRml4IGZvciBcIkNhbm5vdCBvdmVyd3JpdGUgbW9kZWwgb25jZSBjb21waWxlZFwiIGVycm9yXG5jb25zdCBVc2VyOiBNb2RlbDxJVXNlcj4gPSBtb25nb29zZS5tb2RlbHMuVXNlciB8fCBtb25nb29zZS5tb2RlbDxJVXNlcj4oXCJVc2VyXCIsIFVzZXJTY2hlbWEpXG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsImJjcnlwdCIsIlVzZXJTY2hlbWEiLCJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidHJpbSIsInVzZXJuYW1lIiwidW5pcXVlIiwicGFzc3dvcmQiLCJtaW5sZW5ndGgiLCJyb2xlIiwiZW51bSIsImRlZmF1bHQiLCJ0aW1lc3RhbXBzIiwicHJlIiwibmV4dCIsImlzTW9kaWZpZWQiLCJzYWx0IiwiZ2VuU2FsdCIsImhhc2giLCJlcnJvciIsIm1ldGhvZHMiLCJjb21wYXJlUGFzc3dvcmQiLCJjYW5kaWRhdGVQYXNzd29yZCIsImNvbXBhcmUiLCJVc2VyIiwibW9kZWxzIiwibW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./models/User.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Fmonthly%2Froute&page=%2Fapi%2Freports%2Fmonthly%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Fmonthly%2Froute.ts&appDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Fmonthly%2Froute&page=%2Fapi%2Freports%2Fmonthly%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Fmonthly%2Froute.ts&appDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_Kuliah_Semester_4_Software_Development_savory_bananas_4_app_api_reports_monthly_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/reports/monthly/route.ts */ \"(rsc)/./app/api/reports/monthly/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/reports/monthly/route\",\n        pathname: \"/api/reports/monthly\",\n        filename: \"route\",\n        bundlePath: \"app/api/reports/monthly/route\"\n    },\n    resolvedPagePath: \"D:\\\\Kuliah\\\\Semester 4\\\\Software Development\\\\savory-bananas_4\\\\app\\\\api\\\\reports\\\\monthly\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_Kuliah_Semester_4_Software_Development_savory_bananas_4_app_api_reports_monthly_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyZXBvcnRzJTJGbW9udGhseSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcmVwb3J0cyUyRm1vbnRobHklMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZyZXBvcnRzJTJGbW9udGhseSUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDS3VsaWFoJTVDU2VtZXN0ZXIlMjA0JTVDU29mdHdhcmUlMjBEZXZlbG9wbWVudCU1Q3Nhdm9yeS1iYW5hbmFzXzQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNLdWxpYWglNUNTZW1lc3RlciUyMDQlNUNTb2Z0d2FyZSUyMERldmVsb3BtZW50JTVDc2F2b3J5LWJhbmFuYXNfNCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDb0Q7QUFDakk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkQ6XFxcXEt1bGlhaFxcXFxTZW1lc3RlciA0XFxcXFNvZnR3YXJlIERldmVsb3BtZW50XFxcXHNhdm9yeS1iYW5hbmFzXzRcXFxcYXBwXFxcXGFwaVxcXFxyZXBvcnRzXFxcXG1vbnRobHlcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3JlcG9ydHMvbW9udGhseS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3JlcG9ydHMvbW9udGhseVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcmVwb3J0cy9tb250aGx5L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcS3VsaWFoXFxcXFNlbWVzdGVyIDRcXFxcU29mdHdhcmUgRGV2ZWxvcG1lbnRcXFxcc2F2b3J5LWJhbmFuYXNfNFxcXFxhcHBcXFxcYXBpXFxcXHJlcG9ydHNcXFxcbW9udGhseVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Fmonthly%2Froute&page=%2Fapi%2Freports%2Fmonthly%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Fmonthly%2Froute.ts&appDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Freports%2Fmonthly%2Froute&page=%2Fapi%2Freports%2Fmonthly%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Freports%2Fmonthly%2Froute.ts&appDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CKuliah%5CSemester%204%5CSoftware%20Development%5Csavory-bananas_4&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();